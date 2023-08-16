import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
