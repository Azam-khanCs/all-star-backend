import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
    getAllPrivateLessons, createPrivateLesson, getPrivateLessonById, updatePrivateLesson, deletePrivateLesson
} from '../controllers/privateLessonController';

const router = express.Router();
router.get('/get', verifyToken, getAllPrivateLessons);
router.post('/add', verifyToken, createPrivateLesson);
router.get('/getPrivateLessonById/:id', verifyToken, getPrivateLessonById);
router.put('/update/:id', verifyToken, updatePrivateLesson);
router.delete('/delete/:id', verifyToken, deletePrivateLesson);

export default router;