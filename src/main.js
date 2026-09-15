import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.18,
  smoothWheel: true,
  wheelMultiplier: 0.82,
  touchMultiplier: 1.05,
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const worlds = gsap.utils.toArray(".world");
const quotes = gsap.utils.toArray(".quote");
const bird = document.querySelector("#bird");
const birdCanvas = document.querySelector("#bird-canvas");
const birdContext = birdCanvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const birdFrameCount = 33;
const birdCyclesAcrossJourney = 12;
const birdFrames = Array.from({ length: birdFrameCount }, (_, index) => {
  const frame = new Image();
  frame.decoding = "async";
  frame.src = `/assets/generations/goldfinch-flight/goldfinch-flight-${String(index).padStart(2, "0")}.webp`;
  return frame;
});
let activeBirdFrame = -1;

const setBirdFrame = (index) => {
  if (index === activeBirdFrame) return;
  activeBirdFrame = index;

  const frame = birdFrames[index];
  const draw = () => {
    if (activeBirdFrame !== index) return;
    birdContext.clearRect(0, 0, birdCanvas.width, birdCanvas.height);
    birdContext.drawImage(frame, 0, 0, birdCanvas.width, birdCanvas.height);
    bird.classList.add("is-ready");
  };

  if (frame.complete && frame.naturalWidth) {
    draw();
  } else {
    frame.addEventListener("load", draw, { once: true });
  }
};

setBirdFrame(0);

gsap.set(worlds.slice(1), { autoAlpha: 0 });
gsap.set(quotes, { autoAlpha: 0 });
gsap.set(".gallery-track", { autoAlpha: 0 });
gsap.set("#colophon", { autoAlpha: 0 });
gsap.set("#bird", { autoAlpha: 0 });

const tl = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: "#scroll-space",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.75,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (reduceMotion.matches) {
        setBirdFrame(0);
        return;
      }

      const frameIndex = Math.floor(self.progress * birdCyclesAcrossJourney * birdFrameCount) % birdFrameCount;
      setBirdFrame(frameIndex);
    },
  },
});

const showQuote = (selector, at, duration = 1.3) => {
  tl.to(selector, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power3.out" }, at)
    .to(selector, { autoAlpha: 1, duration }, at + 0.28)
    .to(selector, { autoAlpha: 0, y: -10, duration: 0.28, ease: "power2.out" }, at + duration + 0.28);
};

const dissolve = (from, to, at, duration = 0.85) => {
  tl.to(from, { autoAlpha: 0, duration }, at)
    .to(to, { autoAlpha: 1, duration }, at);
};

tl.to("#scroll-cue", { autoAlpha: 0, y: 12, duration: 0.35 }, 0.08)
  .to("#opening", { autoAlpha: 0, y: -18, duration: 0.48, ease: "power2.out" }, 0.28)
  .to(".painting-panel", { scale: 1.16, duration: 2.5 }, 0)
  .to(".chain", { scaleY: 0.76, rotation: 4, duration: 1.25, transformOrigin: "top" }, 1.2)
  .to("#bird", { autoAlpha: 1, duration: 0.32, ease: "power2.out" }, 3.48);

showQuote("#q7", 0.65, 1.05);
showQuote("#q3", 2.15, 1.6);

const mm = gsap.matchMedia();

mm.add("(min-width: 721px) and (prefers-reduced-motion: no-preference)", () => {
  tl.to("#bird", { x: "18vw", y: "-16vh", scale: 0.88, rotation: -3, duration: 1.3, ease: "power2.inOut" }, 3.85)
    .to("#bird", { x: "13.5vw", y: "-9vh", scale: 0.82, rotation: 5, duration: 1.6, ease: "sine.inOut" }, 5.25)
    .to("#bird", { x: "3.5vw", y: "-1vh", scale: 0.78, rotation: -3, duration: 1.45, ease: "sine.inOut" }, 8.15)
    .to("#bird", { x: "-27.5vw", y: "-10vh", scale: 0.8, rotation: -5, duration: 1.6, ease: "sine.inOut" }, 10.7)
    .to("#bird", { x: "10.5vw", y: "-16vh", scale: 0.76, rotation: 4, duration: 1.65, ease: "sine.inOut" }, 13.35)
    .to("#bird", { x: "-20.5vw", y: "19vh", scale: 0.74, rotation: -2, duration: 1.45, ease: "sine.inOut" }, 15.5)
    .to("#bird", { x: "-20.5vw", y: "-2vh", scale: 0.47, rotation: -2, duration: 2.1, ease: "sine.inOut" }, 18.05)
    .to("#bird", { x: "-1.5vw", y: "-4vh", scale: 0.8, rotation: -2, duration: 7.2, ease: "sine.inOut" }, 21.75)
    .to("#bird", { x: "-8.5vw", y: 0, scale: 1, rotation: 0, duration: 1.8, ease: "power2.inOut" }, 33.1);
});

mm.add("(max-width: 720px) and (prefers-reduced-motion: no-preference)", () => {
  tl.to("#bird", { x: "-25vw", y: "-13.5vh", scale: 0.86, rotation: -6, duration: 1.3, ease: "power2.inOut" }, 3.85)
    .to("#bird", { x: "15vw", y: "-4.5vh", scale: 0.8, rotation: 5, duration: 1.6, ease: "sine.inOut" }, 5.25)
    .to("#bird", { x: "9vw", y: "6.5vh", scale: 0.75, rotation: -3, duration: 1.45, ease: "sine.inOut" }, 8.15)
    .to("#bird", { x: "-31vw", y: "0.5vh", scale: 0.76, rotation: -5, duration: 1.6, ease: "sine.inOut" }, 10.7)
    .to("#bird", { x: "13vw", y: "4.5vh", scale: 0.7, rotation: 4, duration: 1.65, ease: "sine.inOut" }, 13.35)
    .to("#bird", { x: "-24vw", y: "14.5vh", scale: 0.68, rotation: -2, duration: 1.45, ease: "sine.inOut" }, 15.5)
    .to("#bird", { x: "17vw", y: "6.5vh", scale: 0.38, rotation: 4, duration: 2.1, ease: "sine.inOut" }, 18.05)
    .to("#bird", { x: "-5vw", y: "0.5vh", scale: 0.72, rotation: -2, duration: 7.2, ease: "sine.inOut" }, 21.75)
    .to("#bird", { x: "-9vw", y: 0, scale: 1, rotation: 0, duration: 1.8, ease: "power2.inOut" }, 33.1);
});

dissolve("#world-painting", "#world-met", 4.55);
tl.to("#world-met > img", { scale: 1.12, xPercent: -2, duration: 4.1 }, 4.55);
showQuote("#q1", 5.05, 1.1);
tl.to(".met-light", { opacity: 0.12, duration: 1.3 }, 6.75)
  .to(".met-dust", { opacity: 0.9, yPercent: -3, duration: 1.8 }, 6.8);
showQuote("#q2", 7.0, 1.25);

dissolve("#world-met", "#world-shop", 8.8);
tl.fromTo("#world-shop > img", { scale: 1.12 }, { scale: 1.02, duration: 4.1 }, 8.8)
  .to(".shop-light", { opacity: 0.64, scale: 1.08, duration: 2.2 }, 9.1);
showQuote("#q9", 9.25, 1.25);
showQuote("#q6", 11.15, 1.15);

dissolve("#world-shop", "#world-vegas", 12.9, 0.95);
tl.fromTo(".vegas-day", { scale: 1.08 }, { scale: 1.01, duration: 4.7 }, 12.9)
  .to(".heat", { opacity: 0.72, duration: 1.4 }, 13.0);
showQuote("#q4", 14.3, 2.8);
tl.to(".vegas-night", { opacity: 1, duration: 1.45 }, 15.45)
  .to(".vegas-day", { opacity: 0, duration: 1.45 }, 15.45);

dissolve("#world-vegas", "#world-amsterdam", 17.65, 1.1);
tl.fromTo("#world-amsterdam > img", { scale: 1.1 }, { scale: 1.01, duration: 4.1 }, 17.65);
showQuote("#q8", 18.85, 1.65);
tl.to(".canal-dark", { opacity: 0.82, duration: 1.25 }, 20.35);

tl.set("#world-gallery", { autoAlpha: 1 }, 21.75)
  .to("#world-amsterdam", { autoAlpha: 0, duration: 0.55 }, 21.75)
  .to(".gallery-track", { autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 21.8)
  .to(".gallery-track", {
    x: () => -(document.querySelector(".gallery-track").scrollWidth - window.innerWidth * 0.72),
    duration: 8.0,
    ease: "none",
  }, 22.15);

tl.to(".gallery-track", { opacity: 0.24, duration: 0.45, ease: "power2.out" }, 28.7);
showQuote("#q10", 28.7, 2.65);
tl.to(".gallery-track", { opacity: 1, duration: 0.5, ease: "power2.out" }, 31.8);

tl.to(".empty-frame", { scale: 1.52, duration: 1.7, ease: "power2.in" }, 32.2)
  .to(".gallery-track", { opacity: 0, duration: 0.8 }, 33.0)
  .to("#world-gallery", { autoAlpha: 0, duration: 0.75 }, 33.1)
  .to("#world-painting", { autoAlpha: 1, duration: 0.75 }, 33.1)
  .to(".painting-panel", { scale: 1, duration: 1.4 }, 33.1)
  .to(".chain", { scaleY: 1, rotation: 0, duration: 0.85, ease: "power3.out" }, 33.9);

showQuote("#q12", 34.3, 2.5);

tl.to("#bird", { autoAlpha: 0, duration: 0.5 }, 36.55)
  .to("#world-painting", { autoAlpha: 0.18, duration: 0.9 }, 36.75)
  .to("#colophon", { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 37.0)
  .to({}, { duration: 1.1 });

document.querySelector("#restart").addEventListener("click", () => {
  lenis.scrollTo(0, { duration: 1.6, lock: true });
});

window.addEventListener("load", () => ScrollTrigger.refresh());
