'use server';

import fs from "fs";
import { splitText } from "./rag";

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
  const chunks = splitText(text, 1000, 200);
  console.log(chunks);
  console.log(chunks.length);
}
