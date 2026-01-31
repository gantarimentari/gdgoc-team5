import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import { processCV } from "../utils/cvProcessor";

export interface CreateCandidateInput {
  jobId: string;
  userId: string;
  fileUrl: string;
  originalFilename: string;
}

export class CandidateService {
  static async createCandidate(data: CreateCandidateInput) {
    const { jobId, userId, fileUrl, originalFilename } = data;

    // Verify job belongs to user
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      throw new AppError("Job not found or unauthorized.", 404);
    }

    // Create candidate record
    const candidate = await prisma.candidate.create({
      data: {
        jobId,
        fileUrl,
        originalFilename,
        status: "PENDING",
      },
    });

    // Process CV
    processCV(candidate.id, fileUrl, job.description).catch((error) => {
      console.error("CV processing failed:", error);
    });

    return candidate;
  }

  static async getCandidatesByJob(jobId: string, userId: string) {
    // Verify job belongs to user
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      throw new AppError("Job not found or unauthorized.", 404);
    }

    const candidates = await prisma.candidate.findMany({
      where: { jobId },
      orderBy: {
        score: "desc",
      },
    });

    return candidates;
  }

  static async getCandidateById(candidateId: string, userId: string) {
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            userId: true,
          },
        },
      },
    });

    if (!candidate) {
      throw new AppError("Candidate not found.", 404);
    }

    // Verify ownership
    if (candidate.job.userId !== userId) {
      throw new AppError("Unauthorized access.", 403);
    }

    return candidate;
  }

  static async deleteCandidate(candidateId: string, userId: string) {
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        job: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!candidate) {
      throw new AppError("Candidate not found.", 404);
    }

    // Verify ownership
    if (candidate.job.userId !== userId) {
      throw new AppError("Unauthorized access.", 403);
    }

    await prisma.candidate.delete({
      where: { id: candidateId },
    });

    return { message: "Candidate deleted successfully" };
  }

  static async reprocessCandidateCV(candidateId: string, userId: string) {
    // Find the candidate and its job
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        job: true,
      },
    });

    if (!candidate) {
      throw new AppError("Candidate not found.", 404);
    }

    // Verify ownership
    if (candidate.job.userId !== userId) {
      throw new AppError("Unauthorized access.", 403);
    }

    // Reset status to PENDING
    await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        status: "PENDING",
        errorLog: null,
      },
    });

    // Trigger reprocessing
    processCV(candidate.id, candidate.fileUrl, candidate.job.description).catch(
      (error) => {
        console.error("CV reprocessing failed:", error);
      }
    );

    return { message: "CV reprocessing initiated." };
  }
}
