import { END, clamp, mix, visibility, ease } from './score.js';

// Lucie's approved reflections. Keep these outside the literary blockquotes.
export const reflections = {
  q7: "One of my favorite things about paintings is how they change as you move closer and further away. From a distance, you see the bird. Up close, you see the strokes someone made with a brush. It's almost paradoxical that the image becomes more abstract as you get closer, but the person who painted it feels a little nearer.",
  q3: "There's something extraordinary about standing before a painting someone made centuries ago and having it meet you and make you feel something in the present. Other people have stood here, felt something, and carried it away, whether for minutes, years, or decades after.",
  q1: "I've always recognized something of myself in Theo's mother: the pleasure and ritual of admiring something, and the feeling that a painting could hold my attention for a lifetime.",
  q2: "The things we love can become places where we feel an absence. But love still remains inside grief.",
  q9: "We often feel the pressure to make something new, original, never been done before. But an idea can pass through many hands and still move someone. You can always bring something of yourself to an idea, and make it your own.",
  q4: "We often leave things unsaid, even with people we love. Sometimes the feeling is clear long before we find the courage to say it.",
  q8: "Even when we feel overwhelmed by the vastness of a dark sea, there can still be a spark that helps center us.",
};

export const speakers = {
  q7: 'Horst', q3: 'Theodore Decker', q1: 'Audrey Decker',
  q2: 'Theodore Decker', q9: 'James "Hobie" Hobart', q6: 'Theodore Decker',
  q4: 'Theodore Decker', q8: 'Theodore Decker', q10: 'James "Hobie" Hobart', q12: 'Theodore Decker',
};

export const passages = {
  introduction: [
    "I first read The Goldfinch a few months ago, and after I finished, I couldn't stop thinking about the connections it makes between art, time, and the people who pass through our lives.",
    "I built this experience around some of the passages and scenes that stayed with me, and the ways beautiful things can connect us to people we'll never meet.",
    "Along the way, I've added my own reflections.",
  ],
  invitation: ["Let's follow the goldfinch through the story."],
  gallery: ["The Goldfinch made me think about the art and artists that have moved me, in so many different ways. Each means something particular to me, but something different to everyone else who has seen and loved them."],
  closing: ['One last thought about living deliberately, loving beautiful things, and the connections that can outlast us...'],
};

export const artworks = [
  { title: 'Vase of Flowers in a Window', artist: 'Ambrosius Bosschaert', year: 'c. 1618', credit: 'Mauritshuis, The Hague', url: 'https://www.mauritshuis.nl/en/our-collection/artworks/679-vase-of-flowers-in-a-window' },
  { title: 'Hellelil and Hildebrand, the Meeting on the Turret Stairs', artist: 'Frederic William Burton', year: '1864', credit: 'National Gallery of Ireland', url: 'https://www.nationalgallery.ie/art-and-artists/highlights-collection/hellelil-and-hildebrand-meeting-turret-stairs-frederic' },
  { title: "Cow's Skull with Calico Roses", artist: "Georgia O'Keeffe", year: '1931', credit: 'Art Institute of Chicago, Alfred Stieglitz Collection', url: 'https://access-ok.gokm.org/object/8787/' },
  { title: 'Le Grand Canal', artist: 'Claude Monet', year: '1908', credit: 'Image: Wikimedia Commons, public domain', url: 'https://commons.wikimedia.org/wiki/File:Claude_Monet,_Le_Grand_Canal.jpg' },
  { title: 'Above the Clouds I', artist: "Georgia O'Keeffe", year: '1962–1963', credit: "© Georgia O'Keeffe Museum", url: 'https://access-ok.gokm.org/object/44/' },
];

// Add reading distance around the existing score. Every camera and bird path
// still receives its original travel coordinate, including during reverse scroll.
const intervals = [
  [1.35, 1.35, 3.8, 'introduction'],
  [1.9, 3.3, 2.5], [4.5, 6.8, 2.4],
  [15.3, 17.5, 1.6], [19, 21.5, 1], [26.2, 29, 1.8],
  [34.5, 38, 1], [43.7, 46.4, .8],
  [50.3, 50.3, 3.2, 'gallery'],
  [74.6, 74.6, 2.4, 'closing'],
];
let added = 0;
export const readingIntervals = intervals.map(([start, end, extra, passage]) => {
  const slot = { start, end, extra, passage, from: start + added, to: end + added + extra };
  added += extra;
  return slot;
});
export const READING_END = END + added;

export function readingState(position) {
  let offset = 0;
  for (const slot of readingIntervals) {
    if (position < slot.from) break;
    if (position <= slot.to) {
      const p = clamp((position - slot.from) / (slot.to - slot.from));
      return { travel: mix(slot.start, slot.end, p), passage: slot.passage,
        opacity: slot.passage ? visibility(position, slot.from, slot.to, .45) : 0 };
    }
    offset += slot.extra;
  }
  return { travel: clamp(position - offset, 0, END), passage: undefined, opacity: 0 };
}

// The quote finishes appearing before its note begins. This is scroll distance,
// not a timer: a pause or reverse scroll always preserves the same composition.
export function reflectionReveal(time, quoteStart) {
  return ease(time, quoteStart + .62, quoteStart + .96);
}

function paragraph(text, className) {
  const node = document.createElement('p');
  if (className) node.className = className;
  // Book titles retain their italic treatment without parsing personal prose as HTML.
  const parts = text.split('The Goldfinch');
  parts.forEach((part, index) => {
    if (index) { const title = document.createElement('em'); title.textContent = 'The Goldfinch'; node.append(title); }
    node.append(document.createTextNode(part));
  });
  return node;
}

function reflectionNote(lines, className, framed = true) {
  const note = document.createElement(framed ? 'aside' : 'div');
  note.className = className + (framed ? ' reflection-note' : '');
  if (framed) note.setAttribute('aria-label', 'Personal reflection by Lucie Oken');
  lines.forEach(line => note.append(paragraph(line)));
  return note;
}

export function mountEditorial() {
  for (const [id, speaker] of Object.entries(speakers)) {
    const quote = document.getElementById(id);
    const pair = document.createElement('section');
    pair.className = quote.className + ' passage';
    pair.id = id;
    quote.removeAttribute('id');
    quote.className = 'literary-quote';
    quote.replaceWith(pair);
    const attribution = document.createElement('footer');
    attribution.className = 'quote__speaker';
    attribution.textContent = '- ' + speaker;
    quote.append(attribution);
    pair.append(quote);
    if (reflections[id]) pair.append(reflectionNote([reflections[id]], 'reflection'));
  }
  for (const [name, text] of Object.entries(passages)) {
    const beat = reflectionNote(text, 'reflection-beat reflection-beat--' + name, name !== 'invitation');
    beat.id = 'reflection-' + name;
    document.querySelector('.quotes').append(beat);
  }
  document.querySelectorAll('.artwork').forEach((figure, index) => {
    const art = artworks[index];
    const caption = document.createElement('figcaption');
    const title = document.createElement('span');
    title.className = 'artwork__title';
    title.textContent = art.title;
    const artist = document.createElement('span');
    artist.className = 'artwork__artist';
    artist.textContent = art.artist;
    caption.append(title, artist);
    figure.append(caption);
  });
  const list = document.querySelector('#artwork-credits');
  for (const art of artworks) {
    const item = document.createElement('li');
    const title = document.createElement(art.url ? 'a' : 'span');
    title.textContent = art.title;
    if (art.url) title.href = art.url;
    item.append(title, document.createTextNode('. ' + art.artist + ', ' + art.year + (art.credit ? '. ' + art.credit + '.' : '.')));
    list.append(item);
  }
}
