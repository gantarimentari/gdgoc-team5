import { Request, Response } from "express";
import { z } from "zod";
import { JobService } from "../services/jobService.js";
import { catchAsync } from "../utils/catchAsync.js";

const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export class JobController {
  /**
   * @swagger
   * /jobs:
   *   post:
   *     summary: Create a new job posting
   *     tags: [Jobs]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - description
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Job created successfully
   *       401:
   *         description: Unauthorized
   */
  static createJob = catchAsync(async (req: Request, res: Response) => {
    const validatedData = createJobSchema.parse(req.body);
    const userId = req.user!.userId;

    const job = await JobService.createJob({
      ...validatedData,
      userId,
    });

    res.status(201).json({
      status: "success",
      data: { job },
    });
  });

  /**
   * @swagger
   * /jobs:
   *   get:
   *     summary: Get all jobs for authenticated user
   *     tags: [Jobs]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of jobs
   *       401:
   *         description: Unauthorized
   */
  static getJobs = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const jobs = await JobService.getJobsByUser(userId);

    res.status(200).json({
      status: "success",
      data: { jobs },
    });
  });

  /**
   * @swagger
   * /jobs/{id}:
   *   get:
   *     summary: Get a specific job by ID
   *     tags: [Jobs]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Job details
   *       404:
   *         description: Job not found
   */
  static getJobById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;

    const job = await JobService.getJobById(id, userId);

    res.status(200).json({
      status: "success",
      data: { job },
    });
  });

  /**
   * @swagger
   * /jobs/{id}:
   *   delete:
   *     summary: Delete a job
   *     tags: [Jobs]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Job deleted successfully
   *       404:
   *         description: Job not found
   */
  static deleteJob = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;

    const result = await JobService.deleteJob(id, userId);

    res.status(200).json({
      status: "success",
      data: result,
    });
  });
}
