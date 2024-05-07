import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface StudentPaymentInterface extends Document {
	std_id: mongoose.Types.ObjectId;
	amount: number;
	payment_method: String;
	date: Date;
}

const studentPaymentSchema = new Schema<StudentPaymentInterface>(
	{
		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},

		amount: {
			type: Number,
			required: true,
		},

		payment_method: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the StudentPaymentModel
const StudentPaymentModel: Model<StudentPaymentInterface> =
	mongoose.model<StudentPaymentInterface>(
		'studentPayment',
		studentPaymentSchema
	);
export { StudentPaymentInterface };
export default StudentPaymentModel;
