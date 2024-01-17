const delimiters = ["\n\n", "\n", "。", ". ;", " "];

export function splitText(text: string, chunkSize: number, chunkOverlap: number): string[] {
  function lastIndexOfMultiple(text: string, delimiters: string[], startIndex: number): number {
    let lastIndex = -1;
    for (const delimiter of delimiters) {
      const index = text.lastIndexOf(delimiter, startIndex);
      if (index > lastIndex) {
        lastIndex = index;
      }
    }
    return lastIndex;
  }

  function recursiveTextSplitter(text: string): string[] {
    if (text.length <= chunkSize) {
      return [text];
    }

    let delimiterIndex = lastIndexOfMultiple(text, delimiters, chunkSize - 1);
    if (delimiterIndex === -1) {
      delimiterIndex = chunkSize;
    } else {
      delimiterIndex += 1;
    }

    const leftPart = text.substring(0, delimiterIndex);
    const rightPart = text.substring(delimiterIndex);

    return [
      leftPart,
      ...recursiveTextSplitter(rightPart),
    ];
  }

  return recursiveTextSplitter(text);
}
