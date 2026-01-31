import { Router } from 'express';
import { CandidateController } from '../controllers/candidateController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Upload CV for a specific job
router.post('/jobs/:jobId/candidates', upload.single('cv'), CandidateController.uploadCandidate);

// Get candidates for a specific job
router.get('/jobs/:jobId/candidates', CandidateController.getCandidates);

// Get/Delete specific candidate
router.get('/candidates/:id', CandidateController.getCandidateById);
router.delete('/candidates/:id', CandidateController.deleteCandidate);

// Reprocess a specific candidate's CV
router.post(
  "/candidates/:id/reprocess",
  CandidateController.reprocessCandidate
);

export default router;
