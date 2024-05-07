
import mongoose, { Model, Schema } from 'mongoose';


interface StdAssignToInstructor extends Document {
  id: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  instructorId: mongoose.Types.ObjectId;
  // Add more fields as needed
}

const studentsAssingedToInstructorSchema = new Schema<StdAssignToInstructor>({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'id',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  // Add more fields as needed
});

const StdAssignToInstructor: Model<StdAssignToInstructor> = mongoose.model(
  'stdassigntointstrs',
  studentsAssingedToInstructorSchema
);

export default StdAssignToInstructor;
