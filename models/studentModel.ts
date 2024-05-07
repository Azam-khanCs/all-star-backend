import mongoose, { Model, Schema } from 'mongoose';

interface StudentInterface {
	save(): unknown;
	instructor_id: mongoose.Types.ObjectId;
	supportive_id: string;
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	phone_number: string;
	gender: string;
	dob: string;
	licence_no: string;
	lesson_completed: string;
	fee: string;
	// mto_certification: 'yes' | 'no';
	// total_payment_received: number;
	// score: string;
	licence_issue_date: Date;
	licence_expiry_date: Date;
	course_start_date: Date;
}

const studentSchema = new Schema<StudentInterface>(
	{
		instructor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor', // Assuming you have an Instructor model
		},
		supportive_id: {
			type: String,
			// required: true,
			// unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
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
		phone_number: {
			type: String,
			required: true,
		},
		dob: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		licence_no: {
			type: String,
			required: true,
		},
		lesson_completed: {
			type: String,
			default: 'inprogress',
		},
		fee: {
			type: String,
			default: 'unpaid',
		},
		// mto_certification: {
		// 	type: String,
		// 	enum: ['yes', 'no'],
		// 	// required: true,
		// },
		// total_payment_received: {
		// 	type: Number,
		// 	required: true,
		// },
		// score: {
		// 	type: String,
		// 	required: true,
		// },
		licence_issue_date: {
			type: Date,
			required: true,
		},
		licence_expiry_date: {
			type: Date,
			required: true,
		},
		course_start_date: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const StudentModel: Model<StudentInterface> = mongoose.model(
	'Student',
	studentSchema
);

export { StudentInterface };
export default StudentModel;
