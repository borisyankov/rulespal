"use server";

import fs from "fs";

const delimiters = ["\n\n", "\n", "。", ". ;", " "];

function textSplitter(text: string, chunkSize: number, chunkOverlap: number) {
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

function readTextFromFile(filePath: string): string {
  try {
    const text = fs.readFileSync(filePath, "utf-8");
    return text;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return "";
  }
}

export async function parseRulebook() {
  const text = await readTextFromFile(
    ".//rulebooks//underwater_cities_rulebook.md",
  );
  const chunks = textSplitter(text, 1000, 200);
  console.log(chunks);
  console.log(chunks.length);
}




