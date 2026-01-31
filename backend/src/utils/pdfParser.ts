import pdfParse from 'pdf-parse';
import fs from 'fs/promises';

export const extractTextFromPDF = async (filePath: string): Promise<string> => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const stripJsonFences = (text: string): string => {
  // Remove ```json and ``` markdown fences if present
  return text
    .replace(/^```json\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
};
