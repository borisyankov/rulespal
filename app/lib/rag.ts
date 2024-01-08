export function recursiveTextSplitter(
  text: string,
  chunkSize: number,
  chunkOverlap: number
): string[] {
  const delimiter = ".";
  // Base case: if the text is already within the maximum length, return it as is
  if (text.length <= chunkSize) {
    return [text];
  }

  // Find the last occurrence of the delimiter before the chunkSize
  let delimiterIndex = text.lastIndexOf(delimiter, chunkSize);

  // If no delimiter is found within the chunkSize, use the chunkSize as the split index
  if (delimiterIndex === -1) {
    delimiterIndex = chunkSize;
  } else {
    // Include the delimiter in the left part
    delimiterIndex += delimiter.length;
  }

  // Adjust the split index based on the chunkOverlap
  delimiterIndex = Math.min(delimiterIndex + chunkOverlap, text.length);

  // Split the text into two parts
  const leftPart = text.substring(0, delimiterIndex);
  const rightPart = text.substring(delimiterIndex - chunkOverlap);

  // Recursively split each part
  return [
    ...recursiveTextSplitter(leftPart, chunkSize, chunkOverlap),
    ...recursiveTextSplitter(rightPart, chunkSize, chunkOverlap),
  ].filter((part, index, arr) => {
    // Remove duplicated overlapping parts
    return (
      index === 0 ||
      part !== arr[index - 1].substring(arr[index - 1].length - chunkOverlap)
    );
  });
}
