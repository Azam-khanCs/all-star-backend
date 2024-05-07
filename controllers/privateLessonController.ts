import { Request, Response } from 'express';
import PrivateLessonModel, {
	PrivateLessonInterface,
} from '../models/privateLessonModel';

const getAllPrivateLessons = async (req: Request, res: Response) => {
	try {
		const privateLessons = await PrivateLessonModel.find().populate(
			'instructor_id'
		);
		res.status(200).json({
			success: true,
			message: ' Private lessons retrieved successfully',
			privateLessons: privateLessons,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const createPrivateLesson = async (req: Request, res: Response) => {
	try {
		const privateLesson = await PrivateLessonModel.create(req.body);
		res.status(201).json({
			success: true,
			message: 'Private lesson created successfully',
			privateLesson: privateLesson,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create private lesson',
		});
	}
};

const getPrivateLessonById = async (req: Request, res: Response) => {
	try {
		const privateLesson = await PrivateLessonModel.findById(req.params.id);
		if (!privateLesson) {
			return res.status(404).json({
				success: false,
				message: 'Private lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Private lesson retrieved successfully',
			privateLesson: privateLesson,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updatePrivateLesson = async (req: Request, res: Response) => {
	try {
		const updatedPrivateLesson = await PrivateLessonModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedPrivateLesson) {
			return res.status(404).json({
				success: false,
				message: 'Private lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Private lesson updated successfully',
			privateLesson: updatedPrivateLesson,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to update private lesson',
		});
	}
};

const deletePrivateLesson = async (req: Request, res: Response) => {
	try {
		const deletedPrivateLesson = await PrivateLessonModel.findByIdAndDelete(
			req.params.id
		);
		if (!deletedPrivateLesson) {
			return res.status(404).json({
				success: false,
				message: 'Private lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Private lesson deleted successfully',
			privateLesson: deletedPrivateLesson,
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
	getAllPrivateLessons,
	createPrivateLesson,
	getPrivateLessonById,
	updatePrivateLesson,
	deletePrivateLesson,
};
