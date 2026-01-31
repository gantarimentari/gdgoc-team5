import { z } from "zod";

export const CVAnalysisSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  score: z.number().int().min(0).max(100),
  summary: z.string().min(10).max(3000),
  pros: z.array(z.string()).min(1).max(10),
  cons: z.array(z.string()).min(1).max(10),
  skills: z.array(z.string()).min(1).max(50),
});

export type CVAnalysisResult = z.infer<typeof CVAnalysisSchema>;
