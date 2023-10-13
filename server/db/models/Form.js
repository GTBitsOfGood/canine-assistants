import mongoose, { SchemaTypes } from "mongoose";
import { consts } from "@/utils/consts";

const { Schema } = mongoose;

// schema for form responses
const FormSchema = new Schema({
  type: {
    type: String,
    enum: ["MonthlyUnplaced", "MonthlyPlaced", "VolunteerInteraction"],
    required: true,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  dog: {
    type: SchemaTypes.ObjectId,
    ref: "Dog",
    required: true,
  },
  responses: {
    type: [
      {
        answer: String,
      },
    ],
  },
});
// tell mongodb to autogenerate createdAt + updatedAt fields
FormSchema.set("timestamps", true);

export default mongoose.models?.Form ?? mongoose.model("Form", FormSchema);
