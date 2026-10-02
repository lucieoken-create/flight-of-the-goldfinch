import test from 'node:test';
import assert from 'node:assert/strict';
import { departureCamera, entranceGeometry } from '../src/score.js';
import { birdPose, birdFrame, BIRD_PADDING, BIRD_CANVAS_SIZE, paintBird } from '../src/bird.js';

test('departure clears the painting before the entrance camera crosses the threshold', () => {
  for (const [width, height] of [[1280, 720], [686, 713], [390, 844]]) {
    const start = departureCamera(width, height, 7.5);
    const end = departureCamera(width, height, 9.6);
    assert.equal(start.scale, 1);
    assert.equal(start.opacity, 1);
    assert.equal(end.opacity, 0);
    const before = departureCamera(width, height, 9.59999);
    assert.ok(Math.abs(before.scale - end.scale) < 1e-6);
    const { aperture } = entranceGeometry(width, height, 14.3);
    assert.ok(aperture.width >= width * 1.1 && aperture.height >= height * 1.1);
    assert.ok(Math.abs(aperture.x - width / 2) + Math.abs(aperture.y - height / 2) < 1e-8);
  }
});

const near = (a,b) => assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const transformed = ([a,b,c,d,tx,ty],[x,y]) => [a*x+c*y+tx,b*x+d*y+ty];
const sourcePoint = (frame,[x,y]) => {
  const [sx,sy,sw]=frame.source,[dx,dy,dw]=frame.destination;
  return [dx+(x-sx)*dw/sw,dy+(y-sy)*dw/sw];
};

test('full-body poses freeze, rewind and repeat the twelve-frame flight cycle', () => {
  const times=Array.from({length:700},(_,i)=>7.35+i/100);
  assert.deepEqual(times.map(t=>birdFrame(t)),times.toReversed().map(t=>birdFrame(t)).reverse());
  assert.deepEqual(times.map(birdPose),times.map(birdPose));
  assert.equal(birdPose(7.4).first,0);
  assert.equal(birdPose(8.56).first,4);
  assert.equal(birdPose(9.56).first,4);
  for(let t=8.565;t<9.55;t+=.013) assert.deepEqual(birdFrame(t),birdFrame(t+1));
});

test('the renderer draws one complete generated pose without separate cutout body or wing layers', () => {
  const atlas={},draws=[];let depth=0;
  const context={clearRect(){},save(){depth++},restore(){depth--},translate(){},transform(){},drawImage(...args){draws.push(args)}};
  for(const t of [7.5,7.8,8.1,8.4,8.6,9.1]) {
    draws.length=0;paintBird(context,atlas,t);
    assert.equal(draws.length,1);assert.equal(draws[0][0],atlas);assert.equal(draws[0].length,9);assert.equal(depth,0);
    assert.equal(birdFrame(t).original,false);
  }
});

test('the first lean keeps its toes planted and its head and tail registered at the pose handoff', () => {
  for(let t=7.35;t<7.95;t+=.001) {
    const point=transformed(birdFrame(t).matrix,[200,292]);near(point[0],200);near(point[1],292);
  }
  const before=birdFrame(7.765-1e-7),after=birdFrame(7.765+1e-7);
  for(const [a,b] of [[[231,120],[576,177]],[[38,327],[325,315]]]) {
    const p=transformed(before.matrix,sourcePoint(before,a)),q=transformed(after.matrix,sourcePoint(after,b));
    assert.ok(Math.hypot(p[0]-q[0],p[1]-q[1])<.001);
  }
});

test('open-wing poses keep uniform proportions and every source crop fits the new atlas', () => {
  for(let t=7.35;t<10.6;t+=.001) {
    const {matrix:[a,b,c,d],source:[x,y,w,h],destination:[dx,dy,dw,dh]}=birdFrame(t);
    assert.ok(x>=0 && y>=0 && x+w<=1254 && y+h<=1254);
    near(dw/w,dh/h);
    if(t>=7.95) {near(Math.hypot(a,b),Math.hypot(c,d));near(a*c+b*d,0);}
  }
});

test('every complete pose stays inside the padded canvas throughout departure and flight', () => {
  for(let t=7.35;t<=10.60;t+=.001) {
    const frame=birdFrame(t),[x,y,w,h]=frame.destination;
    for(const p of [[x,y],[x+w,y],[x,y+h],[x+w,y+h]]) {
      const [cx,cy]=transformed(frame.matrix,p).map(v=>v+BIRD_PADDING);
      assert.ok(cx>=16 && cy>=16 && cx<=BIRD_CANVAS_SIZE-16 && cy<=BIRD_CANVAS_SIZE-16,`clipped at ${t}: ${cx},${cy}`);
    }
  }
});
