import { ai, AI_MODEL } from "../config/gemini.js";
import prisma from "../config/prisma.js";
import { extractTextFromPDF, stripJsonFences } from "./pdfParser.js";
import { CVAnalysisSchema } from "../schemas/cvAnalysis.schema.js";

export async function processCV(
  candidateId: string,
  filePath: string,
  jobDescription: string,
): Promise<void> {
  try {
    console.log(`📄 Processing CV for candidate: ${candidateId}`);

    // Extract text from PDF
    const cvText = await extractTextFromPDF(filePath);

    if (!cvText || cvText.trim().length < 50) {
      throw new Error("PDF appears to be empty");
    }

    // Prepare prompt
    const prompt = `You are an expert recruiter AI. Analyze the following CV against the job description.

Job Description:
${jobDescription}

CV Content:
${cvText}

Provide your analysis in the following JSON format (no markdown fences, just pure JSON):
{
  "name": "Candidate's full name (optional)",
  "email": "candidate@example.com (optional)",
  "score": 75,
  "summary": "A comprehensive summary (100-500 words)",
  "pros": ["Strong technical skills", "5+ years experience", "etc"],
  "cons": ["Limited experience in X", "Missing Y", "etc"],
  "skills": ["JavaScript", "Python", "Leadership", "etc"]
}

Requirements:
- score: Integer 0-100 based on job fit
- summary: Detailed assessment (100-500 words, less than 3000 characters)
- pros: 3-8 strengths
- cons: 3-8 weaknesses
- skills: 5-30 key skills

Return ONLY the JSON object.`;

    // Call Gemini
    const response = await ai.models.generateContent({
      model: AI_MODEL,
      contents: prompt,
    });

    // const response = result.response;
    const text = response.text as string;

    const cleanedText = stripJsonFences(text);

    // Parse and validate
    const parsedResponse = JSON.parse(cleanedText);
    const validatedData = CVAnalysisSchema.parse(parsedResponse);

    // Update candidate
    await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        status: "COMPLETED",
        name: validatedData.name || null,
        email: validatedData.email || null,
        score: validatedData.score,
        summary: validatedData.summary,
        pros: validatedData.pros,
        cons: validatedData.cons,
        skills: validatedData.skills,
      },
    });

    console.log(`✅ Successfully processed CV for candidate: ${candidateId}`);
  } catch (error) {
    console.error(`❌ Error processing CV:`, error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        status: "FAILED",
        errorLog: errorMessage,
      },
    });
  }
}
