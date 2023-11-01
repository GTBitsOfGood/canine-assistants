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
    enum: consts.genderPetArray,
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
        type: SchemaTypes.ObjectId, // 0 is father, 1 is mother
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
    // Should be size 3 array where each number is from 1 to 5
    // indicating the dog's demeanor [before, during, after]
    type: [Number],
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
    age: Number,
    name: String,
    disability: String,
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
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
          enum: consts.genderPersonArray,
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
          enum: consts.genderPetArray,
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
  collarColor: {
    type: String,
  },
  coatColor: {
    type: String,
  },
  supplementalFeeding: {
    type: String,
  },
  deliveryInformation: {
    type: String,
    enum: consts.deliveryArray,
  },
  litterComposition: {
    type: String,
  },
  housing: {
    place: {
      type: String,
      enum: consts.housingArray,
    },
    room: String,
  },
  caregivers: {
    type: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  feeding: {
    amount: String,
    firstmeal: String,
    secondmeal: String,
    thirdmeal: String,
  },
  grooming: {
    lastBath: Date,
  },
  placement: {
    type: String,
  },
  image: {
    type: String,
  },
  placementCamp: {
    startDate: Date,
    endDate: Date,
  },
});

export default mongoose.models?.Dog ?? mongoose.model("Dog", DogSchema);
