import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY! as string;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

export const ai = new GoogleGenAI({ apiKey: apiKey });
export const AI_MODEL = "gemini-2.5-flash-lite";
