const delimiters = ["\n", ".", " "];

function sanitize(text: string): string {
  return text
    .replace(/[\n. ]*(\n)+[\n. ]*/g, "\n")
    .replace(/[. ]*(\.)+[. ]*/g, ".")
    .replace(/[ ]*(\ )+[ ]*/g, " ");
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
    if (index !== -1) {
      return [startIndex + index, delimiter.length];
    }
  }
  return [endIndex, 0];
}

export function splitText(
  inputText: string,
  chunkSize: number,
  chunkOverlap = 0,
): string[] {
  if (chunkOverlap > chunkSize) {
    throw new Error("chunkOverlap must be less than chunkSize");
  }
  const text = sanitize(inputText);
  const chunks = [];
  let currentIndex = 0;
  while (currentIndex < text.length) {
    if (chunkOverlap > 0) {
      const [startIndex, startDelimiterLength] = firstIndexOfDelimiters(
        text,
        Math.max(currentIndex - chunkOverlap, 0),
        currentIndex,
      );
      currentIndex = startIndex + startDelimiterLength;
    }
    const [endIndex, delimiterLength] = text.length - currentIndex < chunkSize ?
       [text.length, 0] : lastIndexOfDelimiters(
      text,
      currentIndex,
      currentIndex + chunkSize,
    );
    const chunk = text.substring(currentIndex, endIndex).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    currentIndex = endIndex + delimiterLength;
  }
  return chunks;
}
