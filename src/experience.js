import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLL_UNIT_VH, clamp, mix, progress, ease, visibility, quotations, cover, portalGeometry, samplePath, galleryPosition, departureCamera, entranceGeometry, storyTime } from './score.js';
import { ATLAS_SOURCE, configureBirdCanvas, paintBird } from './bird.js';
import { rainState, paintRain } from './rain.js';
import { shopPassageGeometry, shopFlightOffset, shopPassage } from './shop-passage.js';
import { skyPassage, skyPassageGeometry, skyFlightOffset, paintSkyPassage } from './sky-passage.js';
import { bridgePassage, bridgePassageGeometry, bridgeFlight, paintBridgePassage } from './bridge-passage.js';
import { returnPassage, returnGeometry, apertureMask, perchRegistration, landingPoseTime, returnFlight } from './return-passage.js';
import { READING_END, readingIntervals, readingState, reflectionReveal, mountEditorial } from './editorial.js';
import { createRestartWipe } from './restart-wipe.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);
// Resize is handled as one measured update so both scroll systems keep the
// current narrative position, even when viewport height changes.
ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
mountEditorial();
const $ = (selector) => document.querySelector(selector);
const root = document.documentElement;
root.style.setProperty('--scroll-height', (100 + READING_END * SCROLL_UNIT_VH) + 'vh');
const stage = $('.stage');
const footer = $('#colophon');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const shortViewport = window.matchMedia('(max-height: 520px) and (max-width: 1000px)');
const worlds = Object.fromEntries(['painting', 'entrance', 'met', 'shop', 'woodwork', 'vegas', 'amsterdam', 'gallery'].map(name => [name, $('#world-' + name)]));
const quoteElements = quotations.map(([id, start, end]) => ({ element: $('#' + id), reflection: $('#' + id + ' .reflection'), start, end }));
const pending = new Map();
const closingReadingStart = readingIntervals.find(slot => slot.passage === 'closing').from;
let size, centres, scrollTrigger, lenis, tick, requestedTime = 0;
let cinematic = false;
let failed = false;
let configured = false, refreshing = false;

const alpha = (element, opacity) => {
  element.style.opacity = clamp(opacity).toFixed(4);
  element.style.visibility = opacity > 0.001 ? 'visible' : 'hidden';
};
const move = (element, x, y, scale = 1, rotate = 0) => {
  element.style.transform = 'translate3d(' + x.toFixed(3) + 'px,' + y.toFixed(3) + 'px,0) scale(' + scale.toFixed(5) + ') rotate(' + rotate.toFixed(3) + 'deg)';
};

function loadImage(image) {
  if (pending.has(image)) return pending.get(image);
  const promise = new Promise(resolve => {
    const finish = async () => {
      try { await image.decode(); } catch { /* failed images resolve false */ }
      resolve(image.naturalWidth > 0);
    };
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', () => resolve(false), { once: true });
    if (image.dataset.src) image.src = image.dataset.src;
    if (image.complete && image.naturalWidth) finish();
  });
  pending.set(image, promise);
  return promise;
}

function loadWorld(name) {
  const world = worlds[name];
  if (world.dataset.requested) return;
  world.dataset.requested = 'true';
  Promise.all(Array.from(world.querySelectorAll('img')).map(loadImage)).then(results => {
    if (!results.every(Boolean)) {
      failed = true;
      $('#asset-status').textContent = 'Some images could not load. The complete text is available below.';
      configureMode();
      return;
    }
    world.dataset.loaded = 'true';
    if (name === 'gallery') measure();
    if (cinematic) render(requestedTime);
  });
}

function makeReadingView() {
  const article = document.createElement('article');
  article.className = 'reading';
  article.id = 'reading';
  const header = $('#opening').cloneNode(true);
  header.removeAttribute('id');
  header.removeAttribute('class');
  article.append(header);
  function readingReflection(name, parent) {
    const copy = $('#reflection-' + name).cloneNode(true);
    copy.removeAttribute('id');
    copy.className = 'reading-reflection' + (name === 'invitation' ? '' : ' reflection-note');
    parent.append(copy);
  }
  readingReflection('introduction', article);
  const groups = [
    ['painting', ['q7', 'q3']], ['met', ['q1', 'q2']], ['shop', ['q9', 'q6']],
    ['vegas', ['q4']], ['amsterdam', ['q8']], ['gallery', ['q10', 'q12']],
  ];
  const altText = {
    met: 'Morning light in a painted museum gallery.', shop: 'Lamplight in Hobart and Blackwell, an antique shop.',
    vegas: 'A Las Vegas suburb overlooking the desert.', amsterdam: 'A bridge and houseboats on an Amsterdam canal at dusk.',
  };
  for (const [name, ids] of groups) {
    const section = document.createElement('section');
    section.dataset.world = name;
    if (name === 'met') readingReflection('invitation', section);
    if (name === 'gallery') {
      readingReflection('gallery', section);
      for (const figure of worlds.gallery.querySelectorAll('figure')) {
        const copy = figure.cloneNode(true);
        copy.removeAttribute('class');
        section.append(copy);
      }
    } else {
      const originals = name === 'met'
        ? [worlds.entrance.querySelector('img'), worlds.met.querySelector('img')]
        : [worlds[name].querySelector('img')];
      for (const original of originals) {
        const image = document.createElement('img');
        image.dataset.src = original.dataset.src || original.getAttribute('src');
        image.alt = original.alt || altText[name];
        image.width = Number(original.getAttribute('width'));
        image.height = Number(original.getAttribute('height'));
        section.append(image);
      }
    }
    for (const id of ids) {
      if (id === 'q12') readingReflection('closing', section);
      const quote = $('#' + id).cloneNode(true);
      quote.removeAttribute('id');
      quote.className = 'reading-passage';
      quote.dataset.quoteId = id;
      section.append(quote);
    }
    article.append(section);
  }
  article.querySelectorAll('img').forEach(image => {
    image.loading = 'lazy';
    image.decoding = 'async';
    if (image.hasAttribute('src')) {
      image.dataset.src = image.getAttribute('src');
      image.removeAttribute('src');
    }
  });
  stage.setAttribute('aria-hidden', 'true');
  stage.after(article);
  article.after(footer);
}

const canvas = $('#bird-canvas');
const context = configureBirdCanvas(canvas);
const rainCanvas = $('#rain-canvas');
const rainContext = rainCanvas.getContext('2d');
let lastRainTime = null;
const skyCanvas = $('#sky-canvas');
const skyContext = skyCanvas.getContext('2d');
const vegasSkyImage = $('.vegas-night');
const canalSkyImage = $('.amsterdam-plane img');
let lastSkyTime = null;
const bridgeCanvas = $('#bridge-canvas');
const bridgeContext = bridgeCanvas.getContext('2d');
let lastBridgeTime = null;
const birdAtlas = new Image();
const restartWipe = createRestartWipe(birdAtlas);
let birdReady = false;
let birdRequested = false;
function requestFrames() {
  if (birdRequested) return;
  birdRequested = true;
  birdAtlas.decoding = 'async';
  birdAtlas.dataset.src = ATLAS_SOURCE;
  loadImage(birdAtlas).then(loaded => {
    birdReady = loaded;
    if (!loaded) {
      failed = true;
      $('#asset-status').textContent = 'Some images could not load. The complete text is available below.';
      configureMode();
    } else if (cinematic) render(requestedTime);
  });
}

function drawBird(time, home = false) {
  if (!birdReady) return;
  paintBird(context, birdAtlas, time, home ? $('.painting-original') : null);
}

function measure() {
  size = { width: window.innerWidth, height: window.innerHeight, mobile: window.innerWidth <= 720 };
  for (const quote of quoteElements) quote.bottom = quote.element.offsetTop + quote.element.offsetHeight;
  const intro = $('#reflection-introduction');
  size.openingTextBottom = Math.max(intro.offsetTop + intro.offsetHeight, quoteElements[0].bottom);
  size.prologueTextBottom = quoteElements[1].bottom;
  size.plane = cover(size.width, size.height);
  for (const plane of document.querySelectorAll('.scene-plane')) {
    plane.style.width = size.plane.width + 'px';
    plane.style.height = size.plane.height + 'px';
  }
  const wood = shopPassageGeometry(size.width, size.height, 0).woodwork;
  $('.shop-woodwork').style.width = wood.width + 'px';
  $('.shop-woodwork').style.height = wood.height + 'px';
  $('.shop-woodwork').style.setProperty('--cabinet-back-left', wood.backingX + 'px');
  $('.shop-woodwork').style.setProperty('--cabinet-back-width', wood.backingWidth + 'px');
  $('.shop-woodwork img').style.width = wood.imageWidth + 'px';
  $('.shop-woodwork img').style.height = wood.imageHeight + 'px';
  $('.shop-woodwork img').style.transform = 'translate(' + wood.imageX + 'px, ' + wood.imageY + 'px)';
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  rainCanvas.width = Math.round(size.width * ratio);
  rainCanvas.height = Math.round(size.height * ratio);
  rainContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  lastRainTime = null;
  skyCanvas.width = Math.round(size.width * ratio);
  skyCanvas.height = Math.round(size.height * ratio);
  skyContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  lastSkyTime = null;
  bridgeCanvas.width = Math.round(size.width * ratio);
  bridgeCanvas.height = Math.round(size.height * ratio);
  bridgeContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  lastBridgeTime = null;
  centres = Array.from($('.gallery-track').children).map(art => art.offsetLeft + art.offsetWidth / 2);
  const frame = $('.empty-frame');
  const frameStyle = getComputedStyle(frame);
  size.returnFrame = { width: parseFloat(frameStyle.width), height: parseFloat(frameStyle.height), border: parseFloat(frameStyle.borderLeftWidth) };
  if (cinematic) render(requestedTime);
}

function requiredWorld(time) {
  if (time < 8.6 || time >= 58.2) return 'painting';
  if (time < 18) return 'met';
  if (time < 29) return 'shop';
  if (time < 35) return 'vegas';
  if (time < 40.2) return 'amsterdam';
  return 'gallery';
}

const path = [
  [8.7, .68, .34, .16, -7], [10.5, .65, .41, .145, -2],
  [14, .62, .39, .14, 2], [17.7, .53, .45, .11, 0],
  [21.3, .50, .45, .09, -1], [23.6, .63, .40, .13, -3],
  [27.7, .61, .48, .12, 2], [30, .68, .48, .13, -4],
  [34, .48, .62, .12, 4], [36.5, .38, .64, .10, 1],
  [40.5, .57, .68, .075, -4], [48, .60, .70, .075, 1],
  [52, .64, .73, .075, -2], [56, .50, .49, .065, -3],
  [58.4, .56, .40, .13, 0], [62, .56, .40, .13, 0],
];

function render(readingTime) {
  requestedTime = readingTime;
  if (!cinematic || !size) return;
  const editorial = readingState(readingTime);
  const travelTime = editorial.travel;
  const time = storyTime(travelTime);
  if (time > 45) restartWipe.preload();
  const required = requiredWorld(time);
  const requiredNames = travelTime >= 7.05 && travelTime < 14.5
    ? ['painting', 'entrance', 'met']
    : time >= shopPassage.start && time <= 30.2 ? ['shop', 'woodwork', 'vegas']
      : travelTime >= skyPassage.start && travelTime <= skyPassage.end ? ['vegas', 'amsterdam']
        : travelTime >= bridgePassage.start && travelTime <= bridgePassage.end ? ['amsterdam', 'gallery']
          : travelTime >= returnPassage.start ? ['gallery', 'painting'] : [required];
  requiredNames.forEach(loadWorld);
  if (travelTime > 3) loadWorld('entrance');
  if (time > 5) loadWorld('met');
  if (time > 12) loadWorld('shop');
  if (time > 24) { loadWorld('vegas'); loadWorld('woodwork'); }
  if (time > 31) loadWorld('amsterdam');
  if (time > 35) loadWorld('gallery');
  if (requiredNames.some(name => !worlds[name].dataset.loaded) || (time > 7.4 && time < 58.5 && !birdReady)) {
    alpha($('#asset-status'), 1);
    return;
  }
  alpha($('#asset-status'), 0);
  root.dataset.scrollTime = travelTime.toFixed(3);
  root.dataset.readingTime = readingTime.toFixed(3);
  root.dataset.storyTime = time.toFixed(3);
  const { width: w, height: h, mobile } = size;
  const departure = departureCamera(w, h, travelTime);
  const entrance = entranceGeometry(w, h, travelTime);
  const shopExit = shopPassageGeometry(w, h, time);
  const sky = skyPassageGeometry(w, h, travelTime);
  const enterAmsterdam = sky.blend;
  const bridge = bridgePassageGeometry(w, h, travelTime);
  const enterGallery = travelTime > bridgePassage.start ? 1 : 0;
  const returning = returnGeometry(w, h, travelTime, size.returnFrame);
  const close = ease(time, 62.2, 63.2);

  alpha(worlds.painting, time < 11 ? departure.opacity : returning.active ? 1 - close * .86 : 0);
  move(worlds.painting, time < 11 ? departure.x : 0, time < 11 ? departure.y : 0, time < 11 ? departure.scale : 1);
  const panel = $('.painting-panel');
  const home = returning.active;
  const panelH = home ? returning.panel.height : Math.min(h * (mobile ? .50 : .76), mobile ? w * 1.05 : w * .85);
  const panelW = panelH * 1638 / 2500;
  const settle = ease(time, 3.7, 4.4);
  const panelX = home ? returning.panel.x : mobile ? w * .5 : mix(w * .66, w * .30, settle);
  const panelY = home ? returning.panel.y : mobile ? mix(h * .61, h * .71, settle) : h * .50;
  const panelScale = home ? 1 : mix(1, 1.16, ease(time, 1.2, 7.2));
  panel.style.width = panelW + 'px';
  panel.style.height = panelH + 'px';
  move(panel, panelX, panelY, panelScale);
  alpha($('.painting-frame'), home ? 0 : 1 - ease(time, .3, 1.25));
  // On phones the opening prose shares the top of the view with a smaller panel.
  const openingReading = mobile ? ease(time, .8, 1.35) * (1 - ease(time, 6.9, 7.3)) : 0;
  if (openingReading > 0) {
    const textBottom = mix(size.openingTextBottom, size.prologueTextBottom, settle);
    const readingHeight = Math.min(panelH * panelScale * .60, Math.max(60, h * .975 - textBottom - 24));
    const fit = readingHeight / (panelH * panelScale);
    panel.style.width = panelW * mix(1, fit, openingReading) + 'px';
    panel.style.height = panelH * mix(1, fit, openingReading) + 'px';
    move(panel, panelX, mix(panelY, h * .975 - readingHeight / 2, openingReading), panelScale);
  }
  const release = ease(time, 7.35, 7.58);
  alpha($('.painting-original'), home ? 1 : 1 - release);
  alpha($('.painting-empty'), home ? 1 - returning.restore : release);
  alpha($('.painting-veil'), home ? ease(readingTime, closingReadingStart, closingReadingStart + .45) * .8 : 0);
  alpha($('#opening'), 1 - ease(time, .4, 1.35));
  alpha($('#scroll-cue'), 1 - ease(time, .15, .8));

  alpha(worlds.entrance, ease(travelTime, 7.5, 8.0) * (1 - ease(travelTime, 14.3, 14.5)));
  move($('.entrance-plane'), entrance.x, entrance.y, entrance.scale);
  alpha($('.entrance-depth'), 1 - ease(travelTime, 10.3, 11.8));
  if (travelTime < 14.5) {
    const a = entrance.aperture;
    const fit = Math.min(1, Math.max(a.width / w, a.height / h));
    move($('.met-arrival-camera'), a.x - w / 2, a.y - h / 2, fit);
  } else move($('.met-arrival-camera'), 0, 0);
  alpha($('.met-arrival-shade'), .60 * (1 - ease(travelTime, 12.3, 15.3)));

  const portal = portalGeometry(w, h, time);
  alpha(worlds.met, time < 8 ? 0 : 1 - ease(time, 21.25, 21.45));
  move($('.met-plane'), portal.x, portal.y, portal.scale);
  alpha($('.met-depth'), 1 - ease(time, 17.8, 18.8));
  alpha($('.met-light'), (1 - ease(time, 14.0, 15.3) * .9) * (1 - ease(time, 18.0, 20.0)));
  alpha($('.met-shadow'), ease(time, 14.0, 15.6) * .42 * (1 - ease(time, 18.0, 20.8)));

  alpha(worlds.shop, ease(time, 17.7, 18.1) * (time < 30.2 ? 1 : 0));
  worlds.shop.style.clipPath = 'inset(0 ' + ((1 - shopExit.boundary / w) * 100).toFixed(4) + '% 0 0)';
  if (time < 21.3) {
    const a = portal.aperture;
    const fit = Math.max(a.width / w, a.height / h);
    const destinationScale = Math.min(1, fit);
    move($('.shop-camera'), a.x - w / 2, a.y - h / 2, destinationScale);
  } else {
    move($('.shop-camera'), shopExit.shop.x, 0, shopExit.shop.scale);
  }

  alpha(worlds.woodwork, time >= shopPassage.start && time <= shopPassage.end ? 1 : 0);
  move($('.shop-woodwork'), shopExit.woodwork.x, shopExit.woodwork.y);
  alpha(worlds.vegas, time >= shopPassage.start && !sky.active ? 1 - enterAmsterdam : 0);
  move($('.vegas-plane'), shopExit.vegas.x, shopExit.vegas.y, shopExit.vegas.scale);
  alpha($('.vegas-arrival-shade'), shopExit.vegas.shade);
  alpha($('.vegas-night'), ease(time, 31.6, 33.5));
  alpha(worlds.amsterdam, sky.active ? 0 : enterAmsterdam * (1 - enterGallery));
  move($('.amsterdam-plane'), 0, 0, mix(1.08, 1, ease(time, 35, 40)));
  alpha(skyCanvas, sky.active ? 1 : 0);
  if (sky.active && lastSkyTime !== travelTime) {
    paintSkyPassage(skyContext, w, h, sky, vegasSkyImage, canalSkyImage);
    lastSkyTime = travelTime;
  }
  alpha(bridgeCanvas, bridge.active ? 1 : 0);
  if (bridge.active && lastBridgeTime !== travelTime) {
    paintBridgePassage(bridgeContext, w, h, bridge, canalSkyImage);
    lastBridgeTime = travelTime;
  }
  alpha(worlds.gallery, enterGallery * (returning.galleryVisible ? 1 : 0));
  worlds.gallery.style.zIndex = home ? '8' : '1';
  $('.gallery-wall').style.clipPath = home ? apertureMask(returning.aperture) : 'none';
  move($('.gallery-arrival-camera'), bridge.gallery.x, bridge.gallery.y, bridge.gallery.scale);
  alpha($('.gallery-arrival-shade'), bridge.gallery.shade);

  const track = $('.gallery-track');
  move(track, w / 2 - galleryPosition(centres, time), 0);
  alpha(track, 1 - visibility(time, 51.9, 56.0, .55) * .90);
  for (const art of track.querySelectorAll('figure')) alpha(art, 1 - ease(time, 51.8, 52.4));
  const empty = $('.empty-frame');
  move(empty, 0, 0, returning.frameScale);
  alpha($('.empty-panel'), 1 - returning.reveal);

  for (const quote of quoteElements) {
    alpha(quote.element, visibility(time, quote.start, quote.end, .5));
    move(quote.element, 0, (1 - progress(time, quote.start, quote.start + .5)) * 12);
    if (quote.reflection) alpha(quote.reflection, reflectionReveal(time, quote.start));
  }
  for (const name of ['introduction', 'gallery', 'closing']) {
    alpha($('#reflection-' + name), editorial.passage === name ? editorial.opacity : 0);
  }
  alpha($('#reflection-invitation'), visibility(travelTime, 8.75, 11.3, .55));
  alpha($('#editorial-shade'), editorial.passage === 'gallery' ? editorial.opacity * .87 : 0);
  alpha(footer, ease(time, 62.6, 63.4));
  footer.inert = time < 62.6;

  let [bx, by, bw, angle] = samplePath(path, time);
  let birdW = clamp(bw * w, mobile ? 90 : 94, mobile ? 170 : 218);
  bx *= w;
  by *= h;
  if (mobile) birdW *= 1.05;
  if (travelTime < 14.5) {
    // Atlas toes map to the painting's upper perch before the body lifts.
    const perch = perchRegistration({ x: panelX, y: panelY, width: panelW * panelScale, height: panelH * panelScale });
    const { x: anchorX, y: anchorY, width: startWidth } = perch;
    const departurePath = [
      [8.16, anchorX, anchorY, startWidth, 0],
      [8.56, anchorX + w * .08, anchorY - h * .10, startWidth * 1.04, -6],
      [9.4, w * (mobile ? .48 : .53), h * .42, clamp(w * .17, 110, 218), -5],
      [10.6, entrance.aperture.x, entrance.aperture.y, clamp(w * .105, 78, 140), -2],
      [12.4, w * .54, h * .48, clamp(w * .115, 90, 155), -1],
      [14.5, bx, by, birdW, angle],
    ];
    [bx, by, birdW, angle] = samplePath(departurePath, travelTime);
  }
  if (time >= 18 && time <= 21.3) {
    const dive = ease(time, 18, 19.5);
    bx = mix(bx, portal.aperture.x, dive);
    by = mix(by, portal.aperture.y, dive);
  }
  const shopFlight = shopFlightOffset(time);
  bx += shopFlight.x * w;
  by += shopFlight.y * h;
  birdW *= shopFlight.scale;
  angle += shopFlight.angle;
  const skyFlight = skyFlightOffset(travelTime);
  bx += skyFlight.x * w;
  by += skyFlight.y * h;
  birdW *= skyFlight.scale;
  angle += skyFlight.angle;
  [bx, by, birdW, angle] = bridgeFlight(bridge, bx, by, birdW, angle);
  [bx, by, birdW, angle] = returnFlight(returning, travelTime, w, h, [bx, by, birdW, angle]);
  if (mobile) {
    // Leave the longer quote/reflection pairs clear without changing portal anchors.
    by += h * (.17 * visibility(time, 10.5, 14.3, .7)
      + .25 * visibility(time, 21.3, 25.8, .7)
      + .13 * visibility(time, 29.8, 34.7, .7));
  }
  // Another 15% above the approved 8% increase, with exact perch registration.
  birdW *= 1 + (1.08 * 1.15 - 1) * ease(travelTime, 8.56, 9.4) * (1 - ease(travelTime, 69.3, 71.7));
  if (mobile) {
    for (const quote of quoteElements.filter(q => ['q1', 'q9', 'q4'].includes(q.element.id))) {
      const noteVisible = visibility(time, quote.start + .5, quote.end, .45);
      by = mix(by, Math.max(by, quote.bottom + birdW * .8 + 20), noteVisible);
    }
  }
  $('#bird').style.width = birdW + 'px';
  $('#bird').style.zIndex = home && travelTime >= returnPassage.start + .9 ? '7' : bridge.flight.behindStone ? '9' : travelTime > 10.6 && travelTime < 14.5 ? '5' : time > 18.8 && time < 21.4 ? '3' : '12';
  move($('#bird'), bx, by, 1, angle);
  alpha($('#bird'), release * Number(returning.birdVisible) * bridge.flight.shade);
  if (time >= 7.35 && travelTime <= returnPassage.restoreEnd) drawBird(landingPoseTime(travelTime), home);
  const rain = rainState(travelTime);
  alpha(rainCanvas, rain.opacity);
  if (rain.opacity > .001 && lastRainTime !== travelTime) {
    paintRain(rainContext, w, h, travelTime);
    lastRainTime = travelTime;
  }
}

function refreshLayout(position = requestedTime) {
  if (!cinematic) return;
  refreshing = true;
  measure();
  lenis?.resize();
  ScrollTrigger.refresh();
  const point = clamp(position, 0, READING_END);
  const target = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * point / READING_END;
  lenis.scrollTo(target, { immediate: true, force: true });
  scrollTrigger.update();
  refreshing = false;
  render(point);
}

function configureMode() {
  const nextCinematic = !reduced.matches && !shortViewport.matches && !failed;
  if (configured && nextCinematic === cinematic) {
    refreshLayout();
    return;
  }
  restartWipe.cancel();
  const position = requestedTime;
  const wasCinematic = cinematic;
  const visibleQuote = quoteElements.find(quote => Number(quote.element.style.opacity) > .5);
  const readingTarget = position >= closingReadingStart ? footer
    : visibleQuote ? $('#reading [data-quote-id="' + visibleQuote.element.id + '"]')
      : $('#reading [data-world="' + requiredWorld(storyTime(readingState(position).travel)) + '"]');
  scrollTrigger?.kill();
  scrollTrigger = undefined;
  if (tick) gsap.ticker.remove(tick);
  tick = undefined;
  lenis?.destroy();
  lenis = undefined;
  cinematic = nextCinematic;
  configured = true;
  root.classList.toggle('is-cinematic', cinematic);
  root.classList.toggle('is-reading', !cinematic);
  footer.inert = false;
  footer.removeAttribute('style');
  if (!cinematic) {
    $('#reading').querySelectorAll('img[data-src]').forEach(image => { image.src = image.dataset.src; });
    if (failed) $('#asset-status').classList.add('has-error');
    if (wasCinematic) readingTarget?.scrollIntoView({ block: 'start', behavior: 'instant' });
    return;
  }
  lenis = new Lenis({ lerp: .16, smoothWheel: true, wheelMultiplier: 1, autoResize: false });
  lenis.on('scroll', ScrollTrigger.update);
  tick = time => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  refreshing = true;
  scrollTrigger = ScrollTrigger.create({
    trigger: '#scroll-space', start: 'top top', end: 'bottom bottom',
    onUpdate: self => { if (!refreshing) render(self.progress * READING_END); },
  });
  refreshLayout(position);
  requestFrames();
  loadWorld('painting');
  loadWorld('entrance');
  loadWorld('met');
}

makeReadingView();
configureMode();
reduced.addEventListener('change', configureMode);
shortViewport.addEventListener('change', configureMode);
let resizeFrame;
window.addEventListener('resize', () => {
  const position = requestedTime;
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => refreshLayout(position));
});
document.fonts.ready.then(() => refreshLayout());
function resetToBeginning() {
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.update();
    if (cinematic) render(0);
    const heading = $('#reading h1');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
}
$('#restart').addEventListener('click', (event) => {
  if (restartWipe.active) return;
  if (!cinematic || reduced.matches || !birdReady || event.detail === 0) {
    resetToBeginning();
    return;
  }
  lenis.stop();
  restartWipe.play(resetToBeginning, () => lenis?.start());
});
