import { consts } from "@/utils/consts";
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: consts.userRoleArray,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  acceptedInvite: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
