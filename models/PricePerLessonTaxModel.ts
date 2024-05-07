import mongoose, { Model, Schema, Document } from 'mongoose';

interface PricePerLessonTax extends Document {
	tax: number;
	price_per_lesson: number;
}

const rateSchema = new Schema<PricePerLessonTax>(
	{
		tax: {
			type: Number,
			required: true,
		},
		price_per_lesson: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const PricePerLessonTax: Model<PricePerLessonTax> = mongoose.model(
	'PricePerLessonTax',
	rateSchema
);

export { PricePerLessonTax };
export default PricePerLessonTax;
