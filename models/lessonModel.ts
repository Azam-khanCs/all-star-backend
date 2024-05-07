import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface LessonInterface extends Document {
	instruct_id: mongoose.Types.ObjectId;

	// package_id: mongoose.Types.ObjectId;
	std_id: mongoose.Types.ObjectId;
	no_of_lesson_compeleted: string;
	road_test_completion: string;
	total_lesson: string;
}

const lessonSchema = new Schema<LessonInterface>(
	{
		instruct_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},

		// package_id: {
		// 		type:mongoose.Schema.Types.ObjectId ,
		// 		ref: 'Package',
		// 		required: true,
		// 	},
		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
		no_of_lesson_compeleted: {
			type: String,
			required: true,
		},
		road_test_completion: {
			type: String,
			// required: true,
		},
		total_lesson: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the LessonModel
const LessonModel: Model<LessonInterface> = mongoose.model<LessonInterface>(
	'Lesson',
	lessonSchema
);
export { LessonInterface };
export default LessonModel;
