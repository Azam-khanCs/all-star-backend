import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
	addStudent,
	updateStudent,
	deleteStudent,
	getAllStudents,
	stdAssignToInstructor,
	editStdAssignToInstructor,
	updateStdAssignToInstructor,
	getAllStdAssignToInstructor,
	deleteStdAssignToInstructor,
	getStudentById,
	getAllUnAssignedStudents,
	getAllAssignedStudents,
	getStudentsByInstructorId,
	getAssignedStudents,
} from '../controllers/studentController';

const router = express.Router();

//Room routes
router.post('/addStudent', verifyToken, addStudent);
router.put('/updateStudent/:id', verifyToken, updateStudent);
router.delete('/deleteStudent/:id', verifyToken, deleteStudent);
router.get('/getAllStudents', verifyToken, getAllStudents);
router.get('/getAllStudents', verifyToken, getAllStudents);
router.get('/getAllAssignStudents', verifyToken, getAllAssignedStudents);

router.post('/stdAssignToInstructor', verifyToken, stdAssignToInstructor);
router.get(
	'/editStdAssignToInstructor/:id',
	verifyToken,
	editStdAssignToInstructor
);
router.get('/getStudentById/:id', verifyToken, getStudentById);
router.get(
	'/getStudentByInstructorId/:id',
	verifyToken,
	getStudentsByInstructorId
);
router.post(
	'/updateStdAssignToInstructor/:id',
	verifyToken,
	updateStdAssignToInstructor
);
router.get(
	'/getAllStdAssignToInstructor',
	verifyToken,
	getAllStdAssignToInstructor
);
router.get('/getAssignStudent', verifyToken, getAssignedStudents);
router.delete(
	'/deleteStdAssignToInstructor/:id',
	verifyToken,
	deleteStdAssignToInstructor
);

export default router;
