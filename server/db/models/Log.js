import mongoose, { SchemaTypes } from "mongoose";

const { Schema } = mongoose;

const LogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    enum: ["Medical", "Behavioral", "Other"],
    required: true,
  },
  severity: {
    type: String,
    enum: ["No concern", "Some concern", "High concern"],
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  dog: {
    type: SchemaTypes.ObjectId,
    ref: "Dog",
    required: true,
  },
});
// tell mongodb to autogenerate createdAt + updatedAt fields
LogSchema.set("timestamps", true);

export default mongoose.models?.Log ?? mongoose.model("Log", LogSchema);
