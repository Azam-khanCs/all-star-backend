import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserInterface {
	username: string;
	email: string;
	phone_number: string;
	cnic: string;
	passport_number: string;
	role: string; // admin/customer default(customer)
	password: string;
	address: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
	generateToken(): string;
}

const userSchema = new Schema<UserInterface>(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			required: true,
			default: 'Admin',
		},
		password: {
			type: String,
			required: true,
		},
		address: {
			type: String,
		},
		phone_number: {
			type: String,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Hash the password before saving to the database
userSchema.pre<UserInterface>('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error: any) {
		next(error);
	}
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	try {
		return await bcrypt.compare(candidatePassword, this.password);
	} catch (error: any) {
		return false;
	}
};

const UserModal: Model<UserInterface> = mongoose.model('User', userSchema);

export { UserInterface };
export default UserModal;
