import test from 'node:test';
import assert from 'node:assert/strict';
import { storyTime, END, galleryPosition, SCROLL_UNIT_VH, RETURN_REST_UNITS } from '../src/score.js';
import { birdFrame, PERCH_ANCHOR, BIRD_SPACE, BIRD_PADDING, BIRD_CANVAS_SIZE } from '../src/bird.js';
import { PAINTED_REST } from '../src/painted-rest.js';
import { returnPassage, returnGeometry, returnFlight, landingPoseTime } from '../src/return-passage.js';

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
const frameFor = w => {
  const border = w <= 720 ? 11 : 15;
  const width = w <= 720 ? w * .65 : Math.min(w * .33, 390);
  return { width, height: (width - border * 2) * 2500 / 1638 + border * 2, border };
};

test('the return sits between the complete final quotes and keeps longer painting holds', () => {
  near(storyTime(returnPassage.start), 56);
  near(storyTime(returnPassage.end), 58.7);
  near(storyTime(END), 65.5);
  for (let score = 58.7; score <= 65.5; score += .01) near(storyTime(score + 10.6 + returnPassage.added), score);
  const centres = [300, 1000, 1700, 2400, 3100, 3800];
  for (let i = 0; i < centres.length; i++) {
    const centreTime = 40.8 + i * 2.2;
    for (const delta of [-.55, 0, .55]) near(galleryPosition(centres, centreTime + delta), centres[i]);
  }
});

test('the panel fills the actual frame opening and the frame clears before the camera settles', () => {
  for (const [w, h] of [[1920,1080], [1280,720], [1077,865], [686,713], [390,844], [320,568]]) {
    const frame = frameFor(w);
    for (let t = returnPassage.start; t <= returnPassage.threshold; t += .01) {
      const state = returnGeometry(w, h, t, frame);
      near(state.aperture.width, state.panel.width);
      near(state.aperture.height, state.panel.height);
      near(state.aperture.x, state.panel.x);
      near(state.aperture.y, state.panel.y);
    }
    const cross = returnGeometry(w, h, returnPassage.threshold, frame);
    assert.ok(cross.aperture.width >= w * 1.1 && cross.aperture.height >= h * 1.1);
    assert.equal(cross.galleryVisible, false);
    const home = returnGeometry(w, h, returnPassage.cameraSettled, frame);
    assert.ok(home.panel.width < w && home.panel.height < h);
    assert.equal(home.restore, 0);
  }
});

test('landing closes the wings without a frame jump and registers the toes before restoring the original', () => {
  assert.deepEqual(birdFrame(landingPoseTime(returnPassage.foldStart)), birdFrame(8.56));
  assert.deepEqual(birdFrame(landingPoseTime(returnPassage.landed)), birdFrame(7.58));
  for (const [w, h] of [[1280,720], [390,844]]) {
    const state = returnGeometry(w,h,returnPassage.landed,frameFor(w));
    const [x,y,size,angle] = returnFlight(state,returnPassage.landed,w,h,[w*.5,h*.49,100,-3]);
    near(x + (PERCH_ANCHOR[0] - .5) * size, state.perch.footX);
    near(y + (PERCH_ANCHOR[1] - .5) * size, state.perch.footY);
    near(angle,0);
    assert.equal(state.restore,0);
    assert.equal(returnGeometry(w,h,returnPassage.restoreEnd,frameFor(w)).restore,1);
  }
});

test('return camera, bird route and wing fold are pure scroll states in either direction', () => {
  const times = Array.from({length:800},(_,i)=>66 + i/100);
  const sample = t => {
    const state = returnGeometry(1280,720,t,frameFor(1280));
    return [state,returnFlight(state,t,1280,720,[640,360,100,-3]),birdFrame(landingPoseTime(t),true)];
  };
  assert.deepEqual(times.map(sample),times.map(sample));
  assert.deepEqual(times.map(sample),[...times].reverse().map(sample).reverse());
});

test('the original-paint landing maps its head, feet and tail to the untouched panel', () => {
  const pose = birdFrame(landingPoseTime(returnPassage.landed), true);
  assert.equal(pose.original,true);
  for (const [w,h] of [[1920,1080],[1280,720],[686,713],[390,844]]) {
    const state = returnGeometry(w,h,returnPassage.landed,frameFor(w));
    const [x,y,width] = returnFlight(state,returnPassage.landed,w,h,[0,0,100,0]);
    const [sx,sy,sw] = pose.source;
    const [dx,dy,dw] = pose.destination;
    const ratio = dw / sw;
    for (const [px,py] of [PAINTED_REST.head,PAINTED_REST.foot,PAINTED_REST.tail]) {
      const cx = dx + (px - sx) * ratio, cy = dy + (py - sy) * ratio;
      const renderedX = x + (cx / BIRD_SPACE - .5) * width;
      const renderedY = y + (cy / BIRD_SPACE - .5) * width;
      const panelScale = state.panel.height / PAINTED_REST.height;
      near(renderedX, state.panel.x + (px - PAINTED_REST.width / 2) * panelScale);
      near(renderedY, state.panel.y + (py - PAINTED_REST.height / 2) * panelScale);
    }
  }
});

test('landing remains proportional and unclipped, and never fades the painted bird', () => {
  for (let t=returnPassage.foldStart;t<=returnPassage.restoreEnd;t+=.002) {
    const { destination:[x,y,w,h],matrix:[a,b,c,d,tx,ty] } = birdFrame(landingPoseTime(t),true);
    near(Math.hypot(a,b),Math.hypot(c,d));
    near(a*c+b*d,0);
    for (const [px,py] of [[x,y],[x+w,y],[x,y+h],[x+w,y+h]]) {
      const cx=a*px+c*py+tx+BIRD_PADDING, cy=b*px+d*py+ty+BIRD_PADDING;
      assert.ok(cx>=0 && cy>=0 && cx<=BIRD_CANVAS_SIZE && cy<=BIRD_CANVAS_SIZE);
    }
    assert.equal(returnGeometry(1280,720,t,frameFor(1280)).birdVisible,true);
  }
  assert.equal(returnGeometry(1280,720,returnPassage.restoreEnd,frameFor(1280)).birdVisible,false);
  near(RETURN_REST_UNITS*SCROLL_UNIT_VH,100);
  assert.ok((returnPassage.end-returnPassage.restoreEnd)*SCROLL_UNIT_VH>150);
});
