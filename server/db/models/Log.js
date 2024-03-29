import mongoose, { SchemaTypes } from "mongoose";
import { consts } from "@/utils/consts";

const { Schema } = mongoose;

const LogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    enum: consts.topicArray,
    required: true,
  },
  tags: {
    type: [String],
    enum: consts.tagsArray,
  },
  severity: {
    type: String,
    enum: consts.concernArray,
    required: true,
  },
  description: {
    type: String,
  },
  resolved: {
    type: Boolean,
    required: true,
  },
  resolution: {
    type: String,
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  resolver: {
    type: SchemaTypes.ObjectId,
    ref: "User",
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
