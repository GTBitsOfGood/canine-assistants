import mongoose, { Types } from "mongoose";
import dateutils from "./dateutils";
import { z } from "zod";

const pages = {
  index: "/",
  api: {
    example: "/api/example",
    users: {
      index: "/api/users",
    },
    dogs: {
      index: "/api/dogs",
    },
  },
};

const consts = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",

  genderPetArray: ["Female", "Male"],
  genderPersonArray: ["Female", "Male", "Other"],
  concernArray: ["No Concern", "Some Concern", "High Concern"],
  locationArray: ["Facility 1", "Facility 2", "Placed"],
  roleArray: ["Service", "Companion"],
  leashArray: ["Leashed", "Off-leash"],
  relationshipArray: [
    "Sibling",
    "Parent",
    "Partner",
    "Friend",
    "Child",
    "Other",
  ],
  topicArray: ["Medical", "Behavioral", "Other"],
  tagsArray: [
    "Auditory",
    "Heartworm",
    "Fleas",
    "Ticks",
    "Vet",
    "Feeding Change",
  ],
  deliveryArray: ["Natural", "C-section", "Combination"],
  housingArray: ["Clinic", "Nursery", "BBI"],
};

/**
 * Zod object for validating request bodies for dogs
 */
const dogSchema = z.object({
  name: z.string(),
  gender: z.enum(consts.genderPetArray),
  breed: z.string(),
  weight: z.number(),
  behavior: z.enum(consts.concernArray),
  medical: z.enum(consts.concernArray),
  other: z.enum(consts.concernArray),
  recentLogs: z
    .array(
      z.string().refine((id) => {
        return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .default([]),
  parents: z
    .array(
      z.string().refine((id) => {
        return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .optional(),
  dateOfBirth: z.coerce.date(),
  litterSize: z.number().optional(),
  birthOrder: z.number().min(1).optional(),
  maternalDemeanor: z.array(z.number().gte(1).lte(5)).length(3).optional(),
  location: z.enum(consts.locationArray),
  rolePlacedAs: z.enum(consts.roleArray).optional(),
  partner: z
    .object({
      age: z.number().optional(),
      name: z.string().optional(),
      disability: z.string().optional(),
      user: z
        .string()
        .refine((id) => {
          return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
        })
        .optional(),
    })
    .optional(),
  toiletArea: z.enum(consts.leashArray).optional(),
  housemates: z
    .array(
      z.object({
        age: z.number().optional(),
        gender: z.enum(consts.genderPersonArray).optional(),
        relationshipToPartner: z.enum(consts.relationshipArray).optional(),
      }),
    )
    .optional(),
  petmates: z
    .array(
      z.object({
        animal: z.string().toLowerCase().optional(),
        age: z.number().optional(),
        gender: z.enum(consts.genderPetArray).optional(),
      }),
    )
    .optional(),
  instructors: z
    .array(
      z.string().refine((id) => {
        return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .optional(),
  volunteer: z
    .string()
    .refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
  collarColor: z.string().optional(),
  coatColor: z.string().optional(),
  supplementalFeeding: z.string().optional(),
  deliveryInformation: z.enum(consts.deliveryArray).optional(),
  litterComposition: z.string().optional(),
  housing: z
    .object({
      place: z.enum(consts.housingArray).optional(),
      room: z.string().optional(),
    })
    .optional(),
  caregivers: z
    .array(
      z.string().refine((id) => {
        return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .optional(),
  feeding: z
    .object({
      amount: z.string().optional(),
      firstmeal: z.string().optional(),
      secondmeal: z.string().optional(),
      thirdmeal: z.string().optional(),
    })
    .optional(),
  grooming: z
    .object({
      lastBath: z.coerce.date().optional(),
    })
    .optional(),
  placement: z.string().optional(),
  image: z.string().optional(),
  placementCamp: z
    .object({
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    })
    .optional(),
});

const dogInformationSchema = {
  ["Birth"]: {
    ["Birth Time"]: "N/A",
    ["Collar Color"]: "N/A",
    ["Supplemental Feeding"]: "N/A",
    ["Delivery Information"]: "N/A",
    ["Birth Order"]: "N/A",
  },
  ["Family"]: {
    ["Litter Size"]: "N/A",
    ["Litter Composition"]: "N/A",
    ["Father"]: "N/A",
    ["Mother"]: "N/A",
  },
  ["Maternal Demeanor"]: {
    ["Prior to Whelping"]: "N/A",
    ["During Whelping"]: "N/A",
    ["Subsequent to Whelping"]: "N/A",
  },
  ["Housing"]: {
    ["Housing"]: "N/A",
    ["Instructor"]: "N/A",
    ["Primary Caregiver(s)"]: "N/A",
    ["Primary Toileting Area"]: "N/A",
  },
  ["Feeding"]: {
    ["Amount"]: "N/A",
    ["First Meal"]: "N/A",
    ["Second Meal"]: "N/A",
    ["Third Meal"]: "N/A",
  },
  ["Grooming"]: {
    ["Last bath"]: "N/A",
  },
};

const dogLabelToKey = {
  Name: "name",
  "Birth Date": "dateOfBirth",
  Sex: "gender",
  Breed: "breed",
  "Coat Color": "coatColor",
  "Collar Color": "collarColor",
};

const computeDefaultValues = (dog) => {
  const defaults = {
    name: dog?.name || "N/A",
    dateOfBirth: dog?.dateOfBirth
      ? dateutils.getDateString(new Date(dog.dateOfBirth))
      : "N/A",
    gender: dog?.gender || "N/A",
    breed: dog?.breed || "N/A",
    coatColor: dog?.coatColor || "N/A",
    collarColor: dog?.collarColor || "N/A",
    supplementalFeeding: dog?.supplementalFeeding || "N/A",
    deliveryInformation: dog?.deliveryInformation || "Natural", // right now set to natural, figure out default value later
    litterComposition: dog?.litterComposition || "N/A",
  };

  // Object.keys(dogInformationSchema).forEach((category) => {
  //   Object.keys(dogInformationSchema[category]).forEach((col) => {
  //     defaults[col] = "";
  //   });
  // });

  return defaults;
};

/**
 * Mock data for testing without any backend interaction
 */
const mocks = {
  mockDogs: [
    {
      recentLogs: [
        {
          title: "Log 1 for Mock 1",
          topic: "Medical",
          tags: ["auditory", "heartworm"],
          severity: "High Concern",
          description: "Some other random log I made",
          author: {},
          dog: {},
        },
      ],
      instructors: [],
      _id: "dog1",
      name: "Rufus",
      gender: "Male",
      breed: "Poodle",
      behavior: "No concern",
      medical: "High Concern",
      other: "No concern",
      parents: [],
      dateOfBirth: new Date("2021-09-06T21:37:38.975Z").toLocaleDateString(
        "en-US",
      ),
      litterSize: 3,
      birthOrder: 4,
      maternalDemeanor: "Happy",
      location: "Facility 1",
      rolePlacedAs: "Service",
      housemates: [],
      petmates: [],
      __v: 0,
      weight: 48.7,
      toiletArea: "Leashed",
    },
    {
      recentLogs: [
        {
          title: "Log 1",
          topic: "Medical",
          tags: ["auditory", "heartworm"],
          severity: "High Concern",
          description: "Some random log I made",
          author: {},
          dog: {},
        },
      ],
      instructors: [],
      _id: "dog2",
      name: "Turnip",
      gender: "Male",
      breed: "Golden Doodle",
      behavior: "No concern",
      medical: "Some concern",
      other: "No concern",
      parents: [],
      dateOfBirth: new Date("2019-09-06T21:37:38.975Z").toLocaleDateString(
        "en-US",
      ),
      litterSize: 3,
      birthOrder: 4,
      maternalDemeanor: "Happy",
      location: "Facility 1",
      rolePlacedAs: "Service",
      housemates: [],
      petmates: [],
      __v: 0,
      weight: 48.7,
      toiletArea: "Leashed",
    },
  ],
};

export {
  pages,
  consts,
  dogSchema,
  mocks,
  computeDefaultValues,
  dogLabelToKey,
  dogInformationSchema,
};
