import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface instructorPaymentInterface extends Document {
	instruct_id: mongoose.Types.ObjectId;
	name: String;
	phone_number: string;
	rate: string;
	noOfLessonToPay: number;
	tax: string;
	chaqueNo: string;
	issueDate: Date;
	Dr: number;
	Cr: number;
	Balance: number;
}

const instructorPaymentSchema = new Schema<instructorPaymentInterface>(
	{
		instruct_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},
		rate: {
			type: String,
			required: true,
		},
		noOfLessonToPay: {
			type: Number,
			required: true,
		},
		tax: {
			type: String,
			required: true,
		},
		chaqueNo: {
			type: String,
			// required: true,
		},
		issueDate: {
			type: Date,
			required: true,
		},
		Dr: {
			type: Number,
			default: 0,
		},
		Cr: {
			type: Number,
			default: 0,
		},
		Balance: {
			type: Number,
			// required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the LessonModel
const InstructorPaymentModel: Model<instructorPaymentInterface> =
	mongoose.model<instructorPaymentInterface>(
		'InstructorPayment',
		instructorPaymentSchema
	);
export { instructorPaymentInterface };
export default InstructorPaymentModel;
