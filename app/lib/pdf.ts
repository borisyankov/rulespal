import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

const fs = require("fs");

// Function to read a PDF file
export async function readPDFFile(filePath: string): Promise<string> {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjs.getDocument({ data: data }).promise;
  const metadata = await pdf.getMetadata();
  console.log("Metadata: ", metadata);
  // Example: Fetch information of the first page
  const page = await pdf.getPage(1);
  console.log("Page loaded");
  // Get text content from the page
  const textContent = await page.getTextContent();
  console.log("Text Content: ", textContent);  
  return textContent.items.filter(item => 'str' in item).map((item) => (item as TextItem).str).join(" ");
}