import { consts } from "@/utils/consts";
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: null,
  },
  role: {
    type: String,
    enum: consts.roleArray,
    required: true,
  }
  
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
