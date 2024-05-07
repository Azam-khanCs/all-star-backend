import { Request, Response } from 'express';
import assignModel, { assignInterface } from '../models/assignModel';
import InstructorModel from '../models/instructorModel';
import StudentModel from '../models/studentModel';

const getAllpackagesAssigToStuds = async (req: Request, res: Response) => {
	try {
		// const packagesAssigToStuds = await assignModel
		// 	.find()
		// 	.populate('std_id') // Populate package details
		// 	.populate('instructor_id'); // Populate instructor details
		// // .populate('package_id'); // Populate student details

		const packagesAssigToStuds = await assignModel.aggregate([
			// Stage 1: Group by student_id and get the latest instructor for each student
			{
				$group: {
					_id: '$std_id',
					id: { $last: '$_id' },
					instructor_id: { $last: '$instructor_id' },
					no_of_lesson: { $last: '$no_of_lesson' },
					road_test: { $last: '$road_test' },
					lesson_completed: { $last: '$no_of_lesson_completed' },
				},
			},
			// Stage 2: Populate the instructor details for each student's latest instructor
			{
				$lookup: {
					from: 'instructors',
					localField: 'instructor_id',
					foreignField: '_id',
					as: 'instructor',
				},
			},
			// Stage 3: Unwind the instructor array to get a single instructor object for each student
			{ $unwind: '$instructor' },
			// Stage 4: Lookup student details
			{
				$lookup: {
					from: 'students',
					localField: '_id',
					foreignField: '_id',
					as: 'student',
				},
			},
			// Stage 5: Unwind the student array to get a single student object for each result
			{ $unwind: '$student' },
			// Stage 6: Project the desired fields
			{
				$project: {
					id: 1, // Include the assignModel _id field
					instructor: 1,
					student: 1,
					no_of_lesson: 1,
					road_test: 1,
					lesson_completed: 1,
				},
			},
		]);

		res.status(200).json({
			success: true,
			message: 'Assign instructor fetch successfully',
			packagesAssigToStuds: packagesAssigToStuds,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getAssignPackageByStdId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params; // Extract ID from request parameters

		// const packageAssigToStud = await assignModel
		// 	.find({ std_id: id })
		// 	.populate('package_id');

		const packageAssigToStud = await assignModel
			.findOne({ std_id: id })
			.sort({ createdAt: -1, _id: -1 }) // Sort by createdAt field in descending order, and then by _id
			.populate('package_id');
		if (!packageAssigToStud) {
			// If package assignment is not found, return 404
			return res.status(404).json({
				success: false,
				message: 'Package assignment not found',
			});
		}

		res.status(200).json({
			success: true,
			packageAssigToStud: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getAssignById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params; // Extract ID from request parameters

		const packageAssigToStud = await assignModel
			.findById(id)
			.populate('std_id')
			.populate('instructor_id');

		if (!packageAssigToStud) {
			// If package assignment is not found, return 404
			return res.status(404).json({
				success: false,
				message: 'Data not found',
			});
		}

		res.status(200).json({
			success: true,
			AssignData: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const createPackageAssigToStud = async (req: Request, res: Response) => {
	try {
		const packageAssigToStud = await assignModel.create(req.body);
		res.status(201).json({
			success: true,
			message: 'Package assigned to students successfully',
			packageAssigToStud: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create package assign to students',
		});
	}
};
const updatePackageAssignToStudent = async (req: Request, res: Response) => {
	try {
		const packageAssigToStud = await assignModel.findOneAndUpdate(
			{ std_id: req.params.id }, // Filter criteria
			{ $set: req.body }, // Update fields
			{ new: true } // Options: Return updated document
		);
		console.log('THe update api get called:', packageAssigToStud);

		res.status(201).json({
			success: true,
			message: 'Package assigned to students successfully',
			packageAssigToStud: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create package assign to students',
		});
	}
};

const getPackageAssigToStudById = async (req: Request, res: Response) => {
	try {
		const packageAssigToStud = await assignModel.findById(req.params.id);
		if (!packageAssigToStud) {
			return res.status(404).json({
				success: false,
				message: 'Package assign to students not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Package assign to students retrieved successfully',
			data: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updatePackageAssigToStud = async (req: Request, res: Response) => {
	try {
		const updatedpackageAssigToStud = await assignModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		if (!updatedpackageAssigToStud) {
			return res.status(404).json({
				success: false,
				message: 'Package assign to students not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Package assign to students updated successfully',
			packageAssigToStud: updatedpackageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to update package assign to students',
		});
	}
};

const getStudentsByInstructor = async (req: Request, res: Response) => {
	try {
		const instructorId = req.params.id;

		if (!instructorId) {
			return res.status(400).json({
				success: false,
				message: 'Instructor ID is required',
			});
		}

		const students = await assignModel
			.find(
				{ instructor_id: instructorId },
				{
					// __v: 0,
					// package_id: 0,
					// paymentPlan: 0,
					// paymentType: 0,
					// advance: 0,
					createdAt: 1,
					updatedAt: 1,
					// remainingAmount: 0,
					// instructor_id: 0,
				}
			)
			.populate('std_id')
			.populate('package_id', {
				no_of_lesson: 1,
			});
		const instructor = await InstructorModel.findById(instructorId, {
			firstName: 1,
			lastName: 1,
		});

		res.status(200).json({
			success: true,
			message: 'Students assigned to the instructor retrieved successfully',
			students: students,
			instructor: instructor,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getInstructorsByStudent = async (req: Request, res: Response) => {
	try {
		const StudentId = req.params.id;

		if (!StudentId) {
			return res.status(400).json({
				success: false,
				message: 'Instructor ID is required',
			});
		}

		const instructors = await assignModel
			.find(
				{ std_id: StudentId },
				{
					_id: 1,
					// __v: 0,
					// package_id: 0,
					// paymentPlan: 0,
					// paymentType: 0,
					// advance: 0,
					// createdAt: 1,
					// updatedAt: 1,
					// remainingAmount: 0,
					// instructor_id: 0,
				}
			)
			.populate('instructor_id')
			.populate('package_id', {
				no_of_lesson: 1,
			});

		const student = await StudentModel.findById(StudentId, {
			firstName: 1,
			lastName: 1,
		});

		res.status(200).json({
			success: true,
			message: 'Instructor assigned to the Students retrieved successfully',
			instructors: instructors,
			student: student,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const deletePackageAssigToStud = async (req: Request, res: Response) => {
	try {
		const deletedpackageAssigToStud = await assignModel.findByIdAndDelete(
			req.params.id
		);
		if (!deletedpackageAssigToStud) {
			return res.status(404).json({
				success: false,
				message: 'packageAssigToStud not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Package assign to students deleted successfully',
			packageAssigToStud: deletedpackageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const changeInstructor = async (req: Request, res: Response) => {
	try {
		const { instructor_id, id } = req.body;

		// Find the record to be updated
		const existingRecord = await assignModel.findById(id);

		// Check if the record exists
		if (!existingRecord) {
			return res.status(404).json({
				success: false,
				message: 'Record not found',
			});
		}

		// Clone the existing record and update the instructor ID
		const newRecord = { ...existingRecord.toObject() };
		newRecord.instructor_id = instructor_id;

		// Set _id to undefined to ensure it gets inserted as a new record
		newRecord._id = undefined;

		// Save the updated record as a new record
		const insertedRecord = await assignModel.create(newRecord);

		// Return the newly created record in the response
		res.status(201).json({
			success: true,
			message: 'Instructor changed successfully',
			packageAssigToStud: insertedRecord,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export {
	getAllpackagesAssigToStuds,
	createPackageAssigToStud,
	getPackageAssigToStudById,
	updatePackageAssigToStud,
	deletePackageAssigToStud,
	getStudentsByInstructor,
	getAssignPackageByStdId,
	getInstructorsByStudent,
	changeInstructor,
	getAssignById,
	updatePackageAssignToStudent,
};
