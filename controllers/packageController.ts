import { Request, Response } from 'express';
import Package, { packageInterface } from '../models/packageModel';

const getAll = async (req: Request, resp: Response) => {
	try {
		const packages = await Package.find(); // Retrieve all packages from the database
		resp.status(200).json({
			success: true,
			message: 'Packages retrieved successfully',
			packages: packages, // Send the retrieved packages in the response
		});
	} catch (error) {
		console.error(error);
		resp.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const add = async (req: Request, resp: Response) => {
	const { name, price, no_of_lesson } = req.body;
	try {
		const newPackage: packageInterface = new Package({
			name,
			price,
			no_of_lesson,
		});
		const result = await newPackage.save();
		if (result) {
			resp.status(201).json({
				success: true,
				message: 'Package added successfully',
				package: result, // Send the added package data in the pponse
			});
		} else {
			// If there was an issue saving the package, send a server error response
			resp.status(500).json({
				success: false,
				message: 'Failed to add package',
			});
		}
	} catch (error) {
		console.error(error);
		resp.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const update = async (req: Request, resp: Response) => {
	const id = req.params.id; // Retrieve the package ID from the request parameters
	const { name, price, no_of_lesson } = req.body; // Retrieve the updated package data from the request body

	try {
		const updatedPackage = await Package.findByIdAndUpdate(
			id,
			{
				name,
				price,
				no_of_lesson,
			},
			{ new: true }
		);

		if (updatedPackage) {
			resp.status(200).json({
				success: true,
				message: 'Package updated successfully',
				package: updatedPackage, // Send the updated package data in the response
			});
		} else {
			resp.status(404).json({
				success: false,
				message: 'Package not found',
			});
		}
	} catch (error) {
		console.error(error);
		resp.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getById = async (req: Request, resp: Response) => {
	const { id } = req.params; // Retrieve the package ID from the request parameters
	try {
		const packageDetails = await Package.findById(id); // Find the package by ID in the database
		if (packageDetails) {
			resp.status(200).json({
				success: true,
				message: 'Package retrieved successfully',
				package: packageDetails, // Send the retrieved package data in the response
			});
		} else {
			resp.status(404).json({
				success: false,
				message: 'Package not found',
			});
		}
	} catch (error) {
		console.error(error);
		resp.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};
const remove = async (req: Request, resp: Response) => {
	const { id } = req.params; // Retrieve the package ID from the request parameters
	try {
		const deletedPackage = await Package.findByIdAndDelete(id); // Find the package by ID and remove it
		if (deletedPackage) {
			resp.status(200).json({
				success: true,
				message: 'Package deleted successfully',
				package: deletedPackage, // Send the deleted package data in the response
			});
		} else {
			resp.status(404).json({
				success: false,
				message: 'Package not found',
			});
		}
	} catch (error) {
		console.error(error);
		resp.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export { getAll, add, update, remove, getById };
