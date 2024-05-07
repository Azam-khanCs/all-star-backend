import { Request, Response } from 'express';
import User, { UserInterface } from '../models/userModel';
import Instructor from '../models/instructorModel';
import Student from '../models/studentModel';
import {
	createUser,
	loginUser,
	forgotPass,
	verifyForgotPassToken,
	resetPass,
	emailVerif,
	registerUser,
	getAllUsers,
	updateUsers,
	deleteUsers,
} from '../services/userService';
import generateResetToken from '../utils/generateResetToken';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken';

// Register Admin api
const register = async (req: Request, res: Response) => {
	const { username, email, password, userType } = req.body;

	try {
		const result = await createUser({
			username,
			email,
			password,
			userType,
		});

		if (result.success) {
			res.status(200).json(result);
		} else {
			res.status(500).json(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const emailVerification = async (req: Request, res: Response) => {
	const { userId, token } = req.body;

	try {
		const result = await emailVerif({
			token,
		});
		if (result.success) {
			const response = await registerUser({ userId });
			if (response.success) {
				res.status(200).json(response);
			} else {
				res.status(500).json(response);
			}
		} else {
			res.status(500).json(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// Login Admin api
const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const result = await loginUser({
			email,
			password,
		});

		if (result.success) {
			res.status(200).json(result);
		} else {
			res.status(500).json(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Forgot  sPassword
const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		// Check if user with the provided email exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const result = await forgotPass({
			email,
		});

		if (result?.success) {
			res.status(200).json(result);
		} else {
			res.status(500).json(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Verify token
const tokenVerification = async (req: Request, res: Response) => {
	const { token } = req.params;
	try {
		const result = await verifyForgotPassToken({
			token,
		});

		if (result) {
			if (result.success) {
				res.status(200).json(result);
			} else {
				res.status(500).json(result);
			}
		} else {
			// Handle case where result is undefined
			res.status(500).json({
				success: false,
				message: 'Error occurred while verifying token',
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// reset password
const resetPassword = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const result = await resetPass({
			email,
			password,
		});
		if (result.success) {
			res.status(200).json(result);
		} else {
			res.status(500).json(result);
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

//getAllUser
const getAllUser = async (req: Request, res: Response) => {
	try {
		const result = await getAllUsers();

		if (result.success) {
			res.status(200).json({
				success: true,
				Customer: result.customers,
			});
		} else {
			res.status(500).json({
				success: false,
				message: result.message,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// updateUser
const updateUser = async (req: Request, res: Response) => {
	try {
		const updateData = req.body;

		const result = await updateUsers({ id: req.params.id, updateData });

		if (result.success) {
			res.status(200).json({
				success: true,
				Customer: result.customer,
				message: 'User updated successfully',
			});
		} else {
			res.status(500).json({
				success: false,
				message: result.message,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
	try {
		const result = await deleteUsers({ id: req.params.id });

		if (!result.success) {
			return res.status(404).json({
				success: false,
				message: result.message,
			});
		}

		res.status(200).json({
			success: true,
			message: result.message,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};
// get dashboard stats
const getDashboardStats = async (req: Request, res: Response) => {
	try {
		// Get total number of rooms
		const totalStudents = await Student.countDocuments();

		// Get total number of reservations
		const totalInstructors = await Instructor.countDocuments();

		// Calculate total revenue for booked reservations
		const totalRevenueResult = await Instructor.aggregate([
			{ $match: { Reservation_status: 'Booked' } }, // Match only booked reservations
			{
				$group: {
					_id: null,
					totalRevenue: { $sum: '$total_price' },
				},
			},
		]);

		const totalRevenue =
			totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

		res.status(200).json({
			success: true,
			message: 'Dashboard stats retrieved successfully',
			totalStudents: totalStudents,
			totalInstructors: totalInstructors,
			totalRevenue: totalRevenue,
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
	register,
	login,
	forgotPassword,
	tokenVerification,
	getAllUser,
	updateUser,
	deleteUser,
	resetPassword,
	emailVerification,
	getDashboardStats,
};
