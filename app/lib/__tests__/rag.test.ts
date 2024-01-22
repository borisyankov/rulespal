import { splitText, cosineSimilarity } from "../rag";

const wingspanExcept = `# Wingspan Rulebook

You are bird enthusiasts — researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves. Each bird extends a chain of powerful combinations in one of your habitats.

Each habitat focuses on a key aspect of the growth of your preserves:

* Gain food tokens via custom dice in a birdfeeder dice tower
* Lay eggs using marbled egg miniatures in a variety of colors
* Expand your bird collection, drawing from hundreds of unique bird cards
  
The winner is the player with the most points accumulated from birds, bonus cards, end-of-round goals, eggs, cached food,
and tucked birds.`

describe("splitText", () => {
  test("empty strings results in an empty list", () => {
    const chunks = splitText("", 10);
    expect(chunks).toEqual([]);
  });

  test("if chunk size is too large return the whole string", () => {
    const chunks = splitText("Word", 10);
    expect(chunks).toEqual(["Word"]);
  });

  test("split at each space", () => {
    const chunks = splitText("One Two Three", 5);
    expect(chunks).toEqual(["One", "Two", "Three"]);
  });

  test("use different delimiters", () => {
    const chunks = splitText("One\n\nTwo\nThree.Four Five", 5);
    expect(chunks).toEqual(["One", "Two", "Three", "Four", "Five"]);
  });

  test("lots of delimiters", () => {
    const chunks = splitText("One\n\n    Two  \n     Three   .\nFour. . . . . .Five", 5);
    expect(chunks).toEqual(["One", "Two", "Three", "Four", "Five"]);
  });

  test("include delimiters in result", () => {
    const chunks = splitText("One Two Three Four Five", 10);
    expect(chunks).toEqual(["One Two", "Three Four", "Five"]);
  });

  test("split at chunk size if no delimiters", () => {
    const chunks = splitText("Splitatchunksizenodelimiters", 10);
    expect(chunks).toEqual(["Splitatchu", "nksizenode", "limiters"]);
  });

  test("Wingspan rulebook excerpt", () => {
    const chunks = splitText(wingspanExcept, 100);
    expect(chunks.length).toEqual(10);
  });

  test("simple with overlap", () => {
    const chunks = splitText("One Two Three", 10, 5);
    expect(chunks).toEqual(["One Two", "Two Three"]);
  });

  test("simple with overlap", () => {
    const chunks = splitText("One Two Three", 10, 5);
    expect(chunks).toEqual(["One Two", "Two Three"]);
  });

  test("ignore multiple delimiters", () => {
    const chunks = splitText("One\n\nTwo\n\n  \n\nThree", 10, 5);
    expect(chunks).toEqual(["One\nTwo", "Two\nThree"]);
  });

  test("Wingspan rulebook excerpt with overlap", () => {
    const chunks = splitText(wingspanExcept, 100, 20);
    expect(chunks.length).toEqual(10);
  });
});


describe("cosineSimilarity", () => {
  test("same vectors have similarity of 1", () => {
    const chunks = cosineSimilarity([1, 2, 3], [1, 2, 3]);
    expect(chunks).toEqual(1);
  });

  test("calculates similarity", () => {
    const chunks = cosineSimilarity([1, 2, 3], [4, 5, 6]);
    expect(chunks).toEqual(0.9746318461970762);
  });
});
