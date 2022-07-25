import express from 'express';
import courseController from '../app/controllers/CourseController';

const router = express.Router();
router.get('/create', courseController.create); 
router.post('/store', courseController.store); 
router.post('/handle-form-actions', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit); 
router.put('/:id', courseController.update); 
router.delete('/:id', courseController.destroy); 
router.patch('/:id/restore', courseController.restore); 
router.delete('/:id/force', courseController.forceDestroy); 
router.get('/:slug', courseController.show); 

export default router;