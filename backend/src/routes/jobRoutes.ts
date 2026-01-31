import { Router } from 'express';
import { JobController } from '../controllers/jobController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/', JobController.createJob);
router.get('/', JobController.getJobs);
router.get('/:id', JobController.getJobById);
router.delete('/:id', JobController.deleteJob);

export default router;
