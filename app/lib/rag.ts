const delimiters = ["\n\n", "\n", " ", ".", " "];

function lastIndexOfMultiple(
  text: string,
  startIndex: number,
  endIndex: number,
) {
  console.log('Searching in:', text.substring(startIndex, endIndex));
  for (const delimiter of delimiters) {
    const index = text.lastIndexOf(delimiter, endIndex);
    if (index > startIndex) {
      return [index, delimiter.length]
    }
  }
  return [endIndex, 0];
}

export function splitText(
  text: string,
  chunkSize: number,
  chunkOverlap = 0,
): string[] {
  const chunks = [];
  let currentIndex = 0;
  while (currentIndex < text.length) {
    const [endIndex, delimiterLength] = lastIndexOfMultiple(
      text,
      currentIndex,
      currentIndex + chunkSize,
    );
    const chunk = text.substring(currentIndex, endIndex);
    console.log(chunk, chunk.length, currentIndex, endIndex, delimiterLength);
    chunks.push(chunk);
    currentIndex = endIndex + delimiterLength;
  }
  return chunks;
}
