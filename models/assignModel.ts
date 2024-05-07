import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface assignInterface extends Document {
	instructor_id: mongoose.Types.ObjectId;
	std_id: mongoose.Types.ObjectId;
	no_of_lesson: number;
	road_test: string;
	package_id: mongoose.Types.ObjectId;
	price_per_lesson: number;
	no_of_lesson_completed: number;
	// paymentPlan: string;
	// paymentType: string;
	// advance: string;
	// remainingAmount: string;
	// total: string;
}

const assignSchema = new Schema<assignInterface>(
	{
		instructor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},

		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
		no_of_lesson: {
			type: Number,
			// required: true,
		},
		no_of_lesson_completed: {
			type: Number,
			default: 0,
		},
		road_test: {
			type: String,
			// required: true,
		},
		package_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Package',
			// required: true,
			default: null,
		},
		price_per_lesson: {
			type: Number,
		},
		// paymentPlan: {
		// 	type: String,
		// 	required: true,
		// },
		// paymentType: {
		// 	type: String,
		// },
		// advance: {
		// 	type: String,
		// },
		// total: {
		// 	type: String,
		// },
		// remainingAmount: {
		// 	type: String,
		// },
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the assignModel
const assignModel: Model<assignInterface> = mongoose.model<assignInterface>(
	'assign',
	assignSchema
);
export { assignInterface };
export default assignModel;
