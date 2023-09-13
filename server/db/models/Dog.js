import mongoose, { SchemaTypes } from "mongoose";
import { consts } from "@/utils/consts";

const { Schema } = mongoose;

const DogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: consts.genderArray,
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
    enum: consts.concernArray,
    required: true,
  },
  medical: {
    type: String,
    enum: consts.concernArray,
    required: true,
  },
  other: {
    type: String,
    enum: consts.concernArray,
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
    enum: consts.demeanorArray,
  },
  location: {
    type: String,
    enum: consts.locationArray,
    required: true,
  },
  rolePlacedAs: {
    type: String,
    enum: consts.roleArray,
  },
  partner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  toiletArea: {
    type: String,
    enum: consts.leashArray,
  },
  housemates: {
    type: [
      {
        age: Number,
        gender: {
          type: String,
          enum: consts.genderOtherArray,
        },
        relationshipToPartner: {
          type: String,
          enum: consts.relationshipArray,
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
          enum: consts.genderArray,
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
