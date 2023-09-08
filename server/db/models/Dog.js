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
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  behavior: {
    type: String,
    enum: ["No concern", "Some concern", "High concern"],
    required: true,
  },
  medical: {
    type: String,
    enum: ["No concern", "Some concern", "High concern"],
    required: true,
  },
  other: {
    type: String,
    enum: ["No concern", "Some concern", "High concern"],
    required: true,
  },
  recentLogs: {
    // only the 2 most recent logs
    type: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Log",
      },
    ],
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
  location: {
    type: String,
    enum: ["Facility 1", "Facility 2", "Placed"],
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
          enum: ["Sibling", "Parent", "Partner", "Friend", "Child", "Other"],
        },
      },
    ],
  },
  petmates: {
    type: [
      {
        animal: String,
        age: Number,
        gender: {
          type: String,
          enum: ["Female", "Male"],
        },
      },
    ],
  },
  instructors: {
    // Dogs can only have up to 3 instructors
    type: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  volunteer: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
});

export default mongoose.models?.Dog ?? mongoose.model("Dog", DogSchema);
