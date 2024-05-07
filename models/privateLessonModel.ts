import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface PrivateLessonInterface extends Document {
	instructor_id: mongoose.Types.ObjectId;
	student_name: String;
	road_test_req: string;
	initial_lesson_requested: string;
}

const privateLessonSchema = new Schema<PrivateLessonInterface>(
	{
		instructor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},

		student_name: {
			type: String,
			required: true,
		},

		road_test_req: {
			type: String,
			required: true,
		},
		initial_lesson_requested: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the PrivateLessonModel
const PrivateLessonModel: Model<PrivateLessonInterface> =
	mongoose.model<PrivateLessonInterface>('PrivateLesson', privateLessonSchema);
export { PrivateLessonInterface };
export default PrivateLessonModel;
