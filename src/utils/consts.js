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
      z
        .string()
        .refine((id) => {
          return mongoose.Types.ObjectId.isValid(id)
            ? new Types.ObjectId(id)
            : null;
        })
        .optional(),
    )
    .optional(),
  dateOfBirth: z.coerce.date(),
  litterSize: z.coerce.number().optional(),
  birthOrder: z.coerce.number().min(1).optional(),
  maternalDemeanor: z
    .array(z.coerce.number().gte(1).lte(5).optional())
    .length(3)
    .optional(),
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
        return mongoose.Types.ObjectId.isValid(id)
          ? new Types.ObjectId(id)
          : null;
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
        return mongoose.Types.ObjectId.isValid(id)
          ? new Types.ObjectId(id)
          : null;
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
  Birth: {
    "Birth Time": {
      key: "dateOfBirth",
    },
    "Collar Color": {
      key: "collarColor",
    },
    "Supplemental Feeding": {
      key: "supplementalFeeding",
    },
    "Delivery Information": {
      key: "deliveryInformation",
    },
    "Birth Order": {
      key: "birthOrder",
    },
  },
  ["Family"]: {
    "Litter Size": {
      key: "litterSize",
    },
    ["Litter Composition"]: {
      key: "litterComposition",
    },
    ["Father"]: {
      key: "parents.0",
    },
    ["Mother"]: {
      key: "parents.1",
    },
  },
  ["Maternal Demeanor"]: {
    ["Prior to Whelping"]: {
      key: "maternalDemeanor.0",
    },
    ["During Whelping"]: {
      key: "maternalDemeanor.1",
    },
    ["Subsequent to Whelping"]: {
      key: "maternalDemeanor.2",
    },
  },
  ["Housing"]: {
    ["Housing"]: {
      key: "housing.place",
    },
    ["Instructor(s)"]: {
      key: "instructors",
    },
    ["Primary Caregiver(s)"]: {
      key: "caregivers",
    },

    ["Primary Toileting Area"]: {
      key: "toiletArea",
    },
  },
  ["Feeding"]: {
    ["Amount"]: {
      key: "feeding.amount",
    },
    ["First Meal"]: {
      key: "feeding.firstmeal",
    },
    ["Second Meal"]: {
      key: "feeding.secondmeal",
    },
    ["Third Meal"]: {
      key: "feeding.thirdmeal",
    },
  },
  ["Grooming"]: {
    ["Last bath"]: {
      key: "grooming.lastBath",
    },
  },
};

const computeDefaultValues = (dog) => {
  const defaults = {
    // Top info
    name: dog?.name,
    dateOfBirth: dog?.dateOfBirth,

    gender: dog?.gender,
    breed: dog?.breed,
    coatColor: dog?.coatColor,
    location: dog?.location,

    // Birth
    collarColor: dog?.collarColor,
    supplementalFeeding: dog?.supplementalFeeding,
    deliveryInformation: dog?.deliveryInformation, // right now set to natural, figure out default value later
    birthOrder: dog?.birthOrder,

    // Family
    litterSize: dog?.litterSize,
    litterComposition: dog?.litterComposition,
    parents: dog?.parents?.map((parent) => (parent._id ? parent._id : parent)),

    // Maternal Demeanor
    maternalDemeanor: dog?.maternalDemeanor, // priorToWheeping, duringWheeping, subsequentToWheeping

    // Housing
    housing: {
      place: dog?.housing?.place,
    },
    toiletArea: dog?.toiletArea,
    instructors: dog?.instructors?.map((instructor) =>
      instructor._id ? instructor._id : instructor,
    ),
    caregivers: dog?.caregivers.map((caregiver) =>
      caregiver._id ? caregiver._id : caregiver,
    ),
    // Feeding

    feeding: {
      amount: dog?.feeding?.amount,
      firstmeal: dog?.feeding?.firstmeal,
      secondmeal: dog?.feeding?.secondmeal,
      thirdmeal: dog?.feeding?.thirdmeal,
    },

    // Grooming
    grooming: {
      lastBath: dog?.grooming?.lastBath
        ? dateutils.getDateString(new Date(dog.grooming?.lastBath))
        : dateutils.getDateString(new Date()),
    },
  };

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
  dogInformationSchema,
};
