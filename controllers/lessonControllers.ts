import { Request, Response } from 'express';
import LessonModel, { LessonInterface } from '../models/lessonModel';
import assignModel from '../models/assignModel';
import StudentModel from '../models/studentModel';
import InstructorModel from '../models/instructorModel';
import InstructorPaymentModel from '../models/instructorPaymentModel';
const getAllLessons = async (req: Request, res: Response) => {
	try {
		const lessons = await LessonModel.find()
			.populate('std_id')
			.populate('instruct_id');
		res.status(200).json({
			success: true,
			message: 'Lessons retrieved successfully',
			lessons: lessons,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const createLesson = async (req: Request, res: Response) => {
	try {
		const {
			std_id,
			instruct_id,
			no_of_lesson_compeleted,
			Cr,
			rate,
			tax,
			issueDate,
			total_lesson,
		} = req.body;

		const updateAssign: any = await assignModel
			.findOne({ std_id })
			.sort({ createdAt: -1, _id: -1 });
		updateAssign.no_of_lesson_completed += no_of_lesson_compeleted;
		if (updateAssign.no_of_lesson_completed === updateAssign.no_of_lesson) {
			const student: any = await StudentModel.findById(std_id);
			student.lesson_completed = 'completed';
			student.save();
		}
		const instructor: any = await InstructorModel.findById(instruct_id);
		instructor.no_of_lesson += no_of_lesson_compeleted;
		instructor.save();
		await updateAssign.save();

		const lastPayment = await InstructorPaymentModel.findOne({
			instruct_id,
		}).sort({ createdAt: -1 });

		// Calculate the new balance
		const newBalance = lastPayment ? lastPayment.Balance + Cr : Cr;

		const newCredit = {
			instruct_id,
			Cr,
			rate,
			tax,
			issueDate,
			noOfLessonToPay: no_of_lesson_compeleted,
			Balance: newBalance,
		};
		await InstructorPaymentModel.create(newCredit);

		const newLessonData = {
			total_lesson,
			std_id,
			instruct_id,
			no_of_lesson_compeleted,
		};

		const lesson = await LessonModel.create(newLessonData);
		res.status(201).json({
			success: true,
			message: 'Lesson created successfully',
			lesson: lesson,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create lesson',
		});
	}
};

const getLessonById = async (req: Request, res: Response) => {
	try {
		const lesson = await LessonModel.findById(req.params.id);
		if (!lesson) {
			return res.status(404).json({
				success: false,
				message: 'Lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Lesson retrieved successfully',
			lesson: lesson,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updateLesson = async (req: Request, res: Response) => {
	try {
		const updatedLesson = await LessonModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedLesson) {
			return res.status(404).json({
				success: false,
				message: 'Lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Lesson updated successfully',
			lesson: updatedLesson,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to update lesson',
		});
	}
};

const deleteLesson = async (req: Request, res: Response) => {
	try {
		const deletedLesson = await LessonModel.findByIdAndDelete(req.params.id);
		if (!deletedLesson) {
			return res.status(404).json({
				success: false,
				message: 'Lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Lesson deleted successfully',
			lesson: deletedLesson,
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
	getAllLessons,
	createLesson,
	getLessonById,
	updateLesson,
	deleteLesson,
};
