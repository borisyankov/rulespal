import pdfjsLib from "pdfjs-dist";

// Necessary to run pdf.js in Node.js
// global.window = global;
// global.navigator = { userAgent: "node" };
// global.PDFJS = pdfjsLib;

const fs = require("fs");

// Function to read a PDF file
export async function readPDFFile(filePath: string): Promise<string> {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data: data }).promise;
  const metadata = await pdf.getMetadata();
  console.log("Metadata: ", metadata);
  // Example: Fetch information of the first page
  const page = await pdf.getPage(1);
  console.log("Page loaded");
  // Get text content from the page
  const textContent = await page.getTextContent();
  console.log("Text Content: ", textContent);
  return textContent;
}

// Specify the path to your PDF file
readPDFFile("..\\..\\DUNE_IMPERIUM_UPRISING_RULEBOOK.pdf");