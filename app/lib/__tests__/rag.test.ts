import { splitText } from "../rag";
import fs from 'fs';

const filePath = 'c:/code/rulespal/rulebooks/wingspan_short.md';

function readFile() {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
  }
}

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

  test("use different delimiters", () => {
    const chunks = splitText("One Two Three Four Five", 10);
    expect(chunks).toEqual(["One Two", "Three Four", "Five"]);
  });

  test("split at chunk size if no delimiters", () => {
    const chunks = splitText("Splitatchunksizenodelimiters", 10);
    expect(chunks).toEqual(["Splitatchu", "nksizenode", "limiters"]);
  });

  test("split at chunk size if no delimiters", () => {
    
    const chunks = splitText("Splitatchunksizenodelimiters", 10);
    expect(chunks).toEqual(["Splitatchu", "nksizenode", "limiters"]);
  });

  test.only("Wingspan", () => {
    const wingspan = readFile();
    const chunks = splitText(wingspan, 100);
    // console.log('Wingspan length: ', wingspan.length);
    // for (const i in chunks){
    //   console.log(chunks[i]);
    //   console.log('--------------');
    // }
    expect(chunks.length).toEqual(266);
  });

});
