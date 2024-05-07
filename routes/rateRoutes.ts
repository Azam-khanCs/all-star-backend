import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
	getAllRates,
	createRate,
	getRateById,
	updateRate,
	deleteRate,
} from '../controllers/rateController';

const router = express.Router();
router.get('/get', verifyToken, getAllRates);
router.post('/add', verifyToken, createRate);
router.get('/getRateById/:id', verifyToken, getRateById);
router.put('/update/:id', verifyToken, updateRate);
router.delete('/delete/:id', verifyToken, deleteRate);

export default router;
