import { Request, Response } from "express";
import { CandidateService } from "../services/candidateService.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { supabase } from "../config/supabase.js";
import path from "path";

const bucketName = process.env.SUPABASE_BUCKET_NAME!;

export class CandidateController {
  /**
   * @swagger
   * /jobs/{jobId}/candidates:
   *   post:
   *     summary: Upload candidate CV for a job
   *     tags: [Candidates]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: jobId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               cv:
   *                 type: string
   *                 format: binary
   *     responses:
   *       202:
   *         description: CV accepted for processing
   *       400:
   *         description: Invalid file or missing file
   *       404:
   *         description: Job not found
   */
  static uploadCandidate = catchAsync(async (req: Request, res: Response) => {
    const jobId = req.params.jobId as string;
    const userId = req.user!.userId;

    if (!req.file) {
      throw new AppError("No file uploaded. Please upload a PDF file.", 400);
    }

    // Upload to Supabase
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(req.file.originalname);
    const fileName = `cv-${uniqueSuffix}${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) {
      throw new AppError(
        `Failed to upload file to storage: ${uploadError.message}`,
        500
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    if (!urlData) {
      throw new AppError("Failed to get public URL for the file.", 500);
    }

    const candidate = await CandidateService.createCandidate({
      jobId,
      userId,
      fileUrl: urlData.publicUrl,
      originalFilename: req.file.originalname,
    });

    res.status(202).json({
      status: "success",
      message:
        "CV accepted for processing. Analysis will be completed shortly.",
      data: { candidate },
    });
  });

  /**
   * @swagger
   * /jobs/{jobId}/candidates:
   *   get:
   *     summary: Get all candidates for a job
   *     tags: [Candidates]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: jobId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of candidates
   *       404:
   *         description: Job not found
   */
  static getCandidates = catchAsync(async (req: Request, res: Response) => {
    const jobId = req.params.jobId as string;
    const userId = req.user!.userId;

    const candidates = await CandidateService.getCandidatesByJob(jobId, userId);

    res.status(200).json({
      status: "success",
      data: { candidates },
    });
  });

  /**
   * @swagger
   * /candidates/{id}:
   *   get:
   *     summary: Get a specific candidate by ID
   *     tags: [Candidates]
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
   *         description: Candidate details
   *       404:
   *         description: Candidate not found
   */
  static getCandidateById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;

    const candidate = await CandidateService.getCandidateById(id, userId);

    res.status(200).json({
      status: "success",
      data: { candidate },
    });
  });

  /**
   * @swagger
   * /candidates/{id}:
   *   delete:
   *     summary: Delete a candidate
   *     tags: [Candidates]
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
   *         description: Candidate deleted successfully
   *       404:
   *         description: Candidate not found
   */
  static deleteCandidate = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;

    const result = await CandidateService.deleteCandidate(id, userId);

    res.status(200).json({
      status: "success",
      data: result,
    });
  });

  /**
   * @swagger
   * /candidates/{id}/reprocess:
   *   post:
   *     summary: Reprocess a candidate's CV
   *     tags: [Candidates]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       202:
   *         description: CV reprocessing initiated
   *       404:
   *         description: Candidate not found
   */
  static reprocessCandidate = catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const userId = req.user!.userId;

      const result = await CandidateService.reprocessCandidateCV(id, userId);

      res.status(202).json({
        status: "success",
        message: result.message,
      });
    }
  );
}
