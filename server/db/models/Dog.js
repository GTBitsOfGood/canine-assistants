import mongoose, { SchemaTypes } from "mongoose";

const { Schema } = mongoose;

const DogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Female", "Male"],
    required: true,
  },
  breed: {
    type: String, // potentially change to enum
    required: true,
  },
  parents: {
    type: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Dog",
      },
    ],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  litterSize: {
    type: Number,
  },
  birthOrder: {
    type: Number,
    min: 1,
  },
  maternalDemeanor: {
    // order: [before, during, after] birth
    type: String,
    enum: ["Happy", "Sad", "Fearful"], // placeholders
  },
  placed: {
    type: Boolean,
    required: true,
  },
  rolePlacedAs: {
    type: String,
    enum: ["Service", "Companion"],
  },
  partner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  toiletArea: {
    type: String,
    enum: ["Leashed", "Off-leash"],
  },
  housemates: {
    type: [
      {
        age: Number,
        gender: {
          type: String,
          enum: ["Female", "Male", "Other"],
        },
        relationshipToPartner: {
          type: String,
          enum: ["Sister", "Brother", "Mother", "Father", "Partner", "Friend"],
        },
      },
    ],
  },
  petmates: {
    type: [
      {
        age: Number,
        gender: {
          type: String,
          enum: ["Female", "Male"],
        },
      },
    ],
  },
});

export default mongoose.models?.Dog ?? mongoose.model("Dog", DogSchema);
