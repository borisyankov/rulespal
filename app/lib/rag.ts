const delimiters = ['\n', '.', ' '];

function sanitize(text: string): string {
  return text
    .replace(/[\n. ]*(\n)+[\n. ]*/g, '\n')
    .replace(/[. ]*(\.)+[. ]*/g, '.')
    .replace(/[ ]*(\ )+[ ]*/g, ' ');
}

function firstIndexOfDelimiters(
  text: string,
  startIndex: number,
  endIndex: number,
): [number, number] {
  const sub = text.substring(startIndex, endIndex + 1);
  for (const delimiter of delimiters) {
    const index = sub.indexOf(delimiter);
    if (index !== -1) {
      return [startIndex + index, delimiter.length];
    }
  }
  return [startIndex, 0];
}

function lastIndexOfDelimiters(
  text: string,
  startIndex: number,
  endIndex: number,
): [number, number] {
  const sub = text.substring(startIndex, endIndex + 1);
  for (const delimiter of delimiters) {
    const index = sub.lastIndexOf(delimiter);
    if (index > 0) {
      return [startIndex + index, delimiter.length];
    }
  }
  return [endIndex, 0];
}

type Chunk = {
  text: string;
  offset: number;
}

export function splitText(
  inputText: string,
  chunkSize: number,
  chunkOverlap = 0,
): Chunk[] {
  if (chunkOverlap > chunkSize) {
    throw new Error('chunkOverlap must be less than chunkSize');
  }
  const text = sanitize(inputText);
  const chunks = [];
  let currentIndex = 0;
  while (currentIndex < text.length) {
    const [startIndex, startDelimiterLength] =
      chunkOverlap === 0
        ? [currentIndex, 0]
        : firstIndexOfDelimiters(
            text,
            Math.max(currentIndex - chunkOverlap, 0),
            currentIndex,
          );
    const [endIndex, delimiterLength] =
      text.length - currentIndex < chunkSize
        ? [text.length, 0]
        : lastIndexOfDelimiters(
            text,
            currentIndex,
            currentIndex + chunkSize,
          );
    const chunk = text.substring(startIndex, endIndex).trim();
    if (chunk.length > 0) {
      chunks.push({
        offset: startIndex,
        text: chunk
      });
    }
    currentIndex = endIndex + delimiterLength;
  }
  return chunks;
}

function dotProduct(vecA: number[], vecB: number[]): number {
  return vecA.reduce((acc, current, index) => acc + current * vecB[index], 0);
}

function magnitude(vec: number[]): number {
  return Math.sqrt(vec.reduce((acc, val) => acc + val * val, 0));
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors are not of the same dimension');
  }
  const dotProd = dotProduct(vecA, vecB);
  const magnitudeA = magnitude(vecA);
  const magnitudeB = magnitude(vecB);
  return dotProd / (magnitudeA * magnitudeB);
}

// Scale a vector to unit length. Returns the vector unchanged if it has zero
// magnitude.
export function normalize(vec: number[]): number[] {
  const mag = magnitude(vec);
  return mag === 0 ? vec : vec.map((v) => v / mag);
}

// Cosine similarity when the query vector is already normalized to unit
// length. Lets a caller normalize the query once and reuse it across many
// chunk comparisons instead of recomputing the query magnitude each time.
export function cosineToUnit(vec: number[], unitQuery: number[]): number {
  if (vec.length !== unitQuery.length) {
    throw new Error('Vectors are not of the same dimension');
  }
  const mag = magnitude(vec);
  return mag === 0 ? 0 : dotProduct(vec, unitQuery) / mag;
}
