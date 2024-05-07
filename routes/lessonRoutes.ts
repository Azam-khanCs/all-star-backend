import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
    getAllLessons, createLesson, getLessonById, updateLesson, deleteLesson
} from '../controllers/lessonControllers';

const router = express.Router();
router.get('/get', verifyToken, getAllLessons);
router.post('/add', verifyToken, createLesson);
router.get('/getLessonById/:id', verifyToken, getLessonById);
router.put('/update/:id', verifyToken, updateLesson);
router.delete('/delete/:id', verifyToken, deleteLesson);

export default router;