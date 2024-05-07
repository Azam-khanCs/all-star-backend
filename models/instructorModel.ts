import mongoose, { Model, Schema } from 'mongoose';

interface InstructorInterface {
	save(): unknown;
	firstName: string;
	lastName: string;
	phone_number: string;
	email: string;
	address: string;
	hired_as: string;
	dob: string;
	gender: string;
	driver_licence_number: string;
	DI_number: string;
	no_of_lesson: number;
}

const instructorSchema = new Schema<InstructorInterface>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		phone_number: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
		},
		// hired_as: {
		// 	type: String,
		// 	required: true,
		// },
		dob: {
			type: String,
			required: true,
		},

		gender: {
			type: String,
			required: true,
		},

		no_of_lesson: {
			type: Number,
			default: 0,
		},
		driver_licence_number: {
			type: String,
			required: true,
			// unique: true,
		},
		DI_number: {
			type: String,
			required: true,
			// unique: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const InstructorModel: Model<InstructorInterface> = mongoose.model(
	'Instructor',
	instructorSchema
);

export { InstructorInterface };
export default InstructorModel;
