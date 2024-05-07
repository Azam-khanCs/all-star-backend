import mongoose, { Model, Schema } from 'mongoose';

interface packageInterface extends Document {
   
    save(): unknown;
    name: string;
    price: string;
    no_of_lesson: string;
    // Add more fields as needed
}
const packageSchema = new Schema<packageInterface>(
    {
        
        name: [
            {
                type: String,
                required: true,
            },
        ],
        price: {
            type: String,
            required: true,
        },
        no_of_lesson: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }

);

const packageModel: Model<packageInterface> = mongoose.model<packageInterface>(
    'Package',
    packageSchema
);
export{packageInterface};
export default packageModel;

