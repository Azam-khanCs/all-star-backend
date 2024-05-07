import express from 'express';
import verifyToken from '../middleware/verifyToken';
import {
	addInstructor,
	updateInstructor,
	deleteInstructor,
	getAllInstructors,
	getInstructorById,
	getAllUnassignedInstructor,
} from '../controllers/instructorController';

const router = express.Router();

//Room routes
router.post('/addinstructor', verifyToken, addInstructor);
router.put('/updateinstructor/:id', verifyToken, updateInstructor);
router.get('/getsingleinstructor/:id', verifyToken, getInstructorById);
router.delete('/deleteinstructor/:id', verifyToken, deleteInstructor);
router.get('/getallinstructors', verifyToken, getAllInstructors);
router.get(
	'/getAllUnassignedInstructor',
	verifyToken,
	getAllUnassignedInstructor
);
export default router;
