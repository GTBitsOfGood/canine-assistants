import { consts } from "@/utils/consts";
import mongoose from "mongoose";
const { Schema } = mongoose;

const InvitedUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: consts.userRoleArray,
    required: true,
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

export default mongoose.models?.InvitedUser ??
  mongoose.model("InvitedUser", InvitedUserSchema);
