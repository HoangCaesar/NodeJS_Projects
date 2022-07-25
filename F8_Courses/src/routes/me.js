import express from 'express';
import meController from '../app/controllers/MeController';

const router = express.Router();
router.get('/bin/courses', meController.binCourses);
router.get('/stored/courses', meController.storedCourses); 

export default router;