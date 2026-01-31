import prisma from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';

export interface CreateJobInput {
  title: string;
  description: string;
  userId: string;
}

export class JobService {
  static async createJob(data: CreateJobInput) {
    const { title, description, userId } = data;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        userId,
      },
      include: {
        candidates: true,
      },
    });

    return job;
  }

  static async getJobsByUser(userId: string) {
    const jobs = await prisma.job.findMany({
      where: { userId },
      include: {
        candidates: {
          select: {
            id: true,
            name: true,
            originalFilename: true,
            status: true,
            score: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return jobs;
  }

  static async getJobById(jobId: string, userId: string) {
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
      include: {
        candidates: {
          orderBy: {
            score: 'desc',
          },
        },
      },
    });

    if (!job) {
      throw new AppError('Job not found.', 404);
    }

    return job;
  }

  static async deleteJob(jobId: string, userId: string) {
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      throw new AppError('Job not found.', 404);
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return { message: 'Job deleted successfully' };
  }
}
