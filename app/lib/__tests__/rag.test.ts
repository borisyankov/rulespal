import fs from 'fs';
import {
  splitText,
  cosineSimilarity,
  cosineToUnit,
  normalize,
  findOOVs,
  getOovCount,
  similarityScore,
  OOV_BOOST,
} from '../rag';

const wingspanExcept = `# Wingspan Rulebook

You are bird enthusiasts — researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves. Each bird extends a chain of powerful combinations in one of your habitats.

Each habitat focuses on a key aspect of the growth of your preserves:

* Gain food tokens via custom dice in a birdfeeder dice tower
* Lay eggs using marbled egg miniatures in a variety of colors
* Expand your bird collection, drawing from hundreds of unique bird cards

The winner is the player with the most points accumulated from birds, bonus cards, end-of-round goals, eggs, cached food,
and tucked birds.`

// splitText returns Chunk objects; these tests assert on the text content.
const texts = (input: string, chunkSize: number, chunkOverlap = 0) =>
  splitText(input, chunkSize, chunkOverlap).map((chunk) => chunk.text);

describe("splitText", () => {
  test("empty strings results in an empty list", () => {
    expect(texts("", 10)).toEqual([]);
  });

  test("if chunk size is too large return the whole string", () => {
    expect(texts("Word", 10)).toEqual(["Word"]);
  });

  test("split at each space", () => {
    expect(texts("One Two Three", 5)).toEqual(["One", "Two", "Three"]);
  });

  test("use different delimiters", () => {
    expect(texts("One\n\nTwo\nThree.Four Five", 5)).toEqual([
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
    ]);
  });

  test("lots of delimiters", () => {
    expect(texts("One\n\n    Two  \n     Three   .\nFour. . . . . .Five", 5)).toEqual([
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
    ]);
  });

  test("include delimiters in result", () => {
    expect(texts("One Two Three Four Five", 10)).toEqual([
      "One Two",
      "Three Four",
      "Five",
    ]);
  });

  test("split at chunk size if no delimiters", () => {
    expect(texts("Splitatchunksizenodelimiters", 10)).toEqual([
      "Splitatchu",
      "nksizenode",
      "limiters",
    ]);
  });

  test("chunks carry their source offset", () => {
    const chunks = splitText("One Two Three", 5);
    expect(chunks).toEqual([
      { text: "One", offset: 0 },
      { text: "Two", offset: 4 },
      { text: "Three", offset: 8 },
    ]);
  });

  test("Wingspan rulebook excerpt", () => {
    expect(texts(wingspanExcept, 100).length).toEqual(10);
  });

  test("simple with overlap", () => {
    expect(texts("One Two Three", 10, 5)).toEqual(["One Two", "Two Three"]);
  });

  test("ignore multiple delimiters", () => {
    expect(texts("One\n\nTwo\n\n  \n\nThree", 10, 5)).toEqual([
      "One\nTwo",
      "Two\nThree",
    ]);
  });

  test("Wingspan rulebook excerpt with overlap", () => {
    expect(texts(wingspanExcept, 100, 20).length).toEqual(10);
  });

  test("Ark Nova full with overlap", () => {
    const arkNovaRulebook = fs.readFileSync('app/lib/__tests__/ark_nova_rulebook.txt', "utf8");
    expect(texts(arkNovaRulebook, 1000, 200).length).toEqual(71);
  });

  test("chunkOverlap larger than chunkSize throws", () => {
    expect(() => splitText("One Two Three", 5, 10)).toThrow(
      'chunkOverlap must be less than chunkSize',
    );
  });
});


describe("cosineSimilarity", () => {
  test("same vectors have similarity of 1", () => {
    expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toEqual(1);
  });

  test("calculates similarity", () => {
    expect(cosineSimilarity([1, 2, 3], [4, 5, 6])).toEqual(0.9746318461970762);
  });

  test("orthogonal vectors have similarity of 0", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toEqual(0);
  });

  test("throws when dimensions differ", () => {
    expect(() => cosineSimilarity([1, 2, 3], [1, 2])).toThrow(
      'Vectors are not of the same dimension',
    );
  });
});


describe("normalize", () => {
  test("scales a vector to unit length", () => {
    expect(normalize([3, 4])).toEqual([0.6, 0.8]);
  });

  test("leaves a zero vector unchanged", () => {
    expect(normalize([0, 0])).toEqual([0, 0]);
  });
});


describe("cosineToUnit", () => {
  test("matches cosineSimilarity when the query is pre-normalized", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    expect(cosineToUnit(a, normalize(b))).toBeCloseTo(cosineSimilarity(a, b), 12);
  });

  test("returns 0 for a zero vector", () => {
    expect(cosineToUnit([0, 0], normalize([1, 1]))).toEqual(0);
  });

  test("throws when dimensions differ", () => {
    expect(() => cosineToUnit([1, 2, 3], [1, 2])).toThrow(
      'Vectors are not of the same dimension',
    );
  });
});


describe("similarityScore", () => {
  test("returns the cosine similarity when no OOV terms match", () => {
    expect(similarityScore(0.5, 0)).toEqual(0.5);
  });

  test("adds OOV_BOOST for each matching OOV term", () => {
    expect(similarityScore(0.5, 2)).toBeCloseTo(0.5 + 2 * OOV_BOOST, 12);
  });

  test("an OOV match can outrank a higher raw cosine", () => {
    expect(similarityScore(0.4, 1)).toBeGreaterThan(similarityScore(0.5, 0));
  });
});


describe("findOOVs", () => {
  const dict = ["the", "player", "with", "most", "points", "wins"];

  test("returns words not present in the dictionary", () => {
    expect(findOOVs(dict, "the meeple wins")).toEqual(["meeple"]);
  });

  test("matching is case-insensitive", () => {
    expect(findOOVs(dict, "The Player Wins")).toEqual([]);
  });

  test("ignores non-alphabetic characters", () => {
    expect(findOOVs(dict, "wins 100 points!")).toEqual([]);
  });

  test("returns an empty list when the query has no words", () => {
    expect(findOOVs(dict, "123 ...")).toEqual([]);
  });
});


describe("getOovCount", () => {
  test("counts how many OOV terms appear in the content", () => {
    expect(getOovCount("The meeple moves to the castle", ["meeple", "castle"])).toEqual(2);
  });

  test("matching is case-insensitive", () => {
    expect(getOovCount("The MEEPLE moves", ["meeple"])).toEqual(1);
  });

  test("does not double-count repeated terms", () => {
    expect(getOovCount("meeple meeple meeple", ["meeple"])).toEqual(1);
  });

  test("returns 0 when no OOV terms are present", () => {
    expect(getOovCount("a plain sentence", ["meeple"])).toEqual(0);
  });
});
