import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
    getAll,
	add,
    update,
    remove,
    getById
} from '../controllers/packageController';

const router = express.Router();
router.get('/get', verifyToken, getAll);
router.get('/getById/:id', verifyToken, getById);
router.post('/add', verifyToken, add);
router.put('/update/:id', verifyToken, update);
router.delete('/delete/:id', verifyToken, remove);

export default router;