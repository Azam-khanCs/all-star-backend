import mongoose, { Model, Schema, Document } from 'mongoose';

interface ReportInterface extends Document {
	instructor_id: mongoose.Types.ObjectId;
	cheque_no: string;
	rate: string;
	tax: string;
	amount: string;
	no_of_lesson: string;
	issue_date: Date;
}

const reportSchema = new Schema<ReportInterface>(
	{
		instructor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor', // Assuming you have an Instructor model
			required: true,
		},
		rate: {
			type: String,
			required: true,
		},
		tax: {
			type: String,
			required: true,
		},
		no_of_lesson: {
			type: String,
			required: true,
		},
		cheque_no: {
			type: String,
			required: true,
		},
		issue_date: {
			type: Date,
			required: true,
		},
		amount: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const ReportModel: Model<ReportInterface> = mongoose.model(
	'Report',
	reportSchema
);

export { ReportInterface };
export default ReportModel;
