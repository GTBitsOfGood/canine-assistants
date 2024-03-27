import { Types } from "mongoose";
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
  concernArray: ["None", "Moderate", "High"],
  resolveArray: ["Resolved", "Unresolved"],
  locationArray: ["Facility 1", "Facility 2", "Placed"],
  roleArray: ["Service", "Companion"],
  userRoleArray: ["Manager", "Admin", "User"],
  limitedUserRoleArray: ["Admin", "User"],
  userAccess: {
    Manager: "Manager",
    Admin: "Admin",
    User: "User",
  },
  limitedUserAccess: {
    Admin: "Admin",
    User: "User",
  },
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
  formTypeArray: ["MonthlyPlaced", "MonthlyUnplaced", "VolunteerInteraction"],
};

/**
 * Zod object for validating request bodies for dogs
 */
const dogSchema = z.object({
  name: z.string().min(1),
  gender: z.enum(consts.genderPetArray).default("Male"),
  breed: z.string().min(1),
  weight: z.coerce.number(),
  hasUnresolved: z.number().min(0).default(0),
  behavior: z.enum(consts.concernArray).default("None"),
  medical: z.enum(consts.concernArray).default("None"),
  other: z.enum(consts.concernArray).default("None"),
  recentLogs: z
    .array(
      z.string().refine((id) => {
        return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .default([]),
  parents: z
    .array(
      z
        .string()
        .refine((id) => {
          return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
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
      name: z.string().optional(),
      age: z.coerce.number().optional(),
      disability: z.string().optional(),
      user: z
        .string()
        .refine((id) => {
          return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
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
        return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .optional(),
  volunteer: z
    .string()
    .refine((id) => {
      return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
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
        return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
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
    hasUnresolved: dog?.hasUnresolved,

    // Birth
    collarColor: dog?.collarColor,
    supplementalFeeding: dog?.supplementalFeeding,
    deliveryInformation: dog?.deliveryInformation, // right now set to natural, figure out default value later
    birthOrder: dog?.birthOrder,

    // Weight
    weight: dog?.weight,

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
    caregivers: dog?.caregivers?.map((caregiver) =>
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

    placementCamp: {
      startDate: dog?.placementCamp?.startDate
        ? new Date(dog?.placementCamp?.startDate).toLocaleDateString()
        : dateutils.getDateString(new Date()),
      endDate: dog?.placementCamp?.endDate
        ? new Date(dog?.placementCamp?.endDate).toLocaleDateString()
        : dateutils.getDateString(new Date()),
    },
  };

  // do logic for placed/unplaced dogs

  if (dog?.location === "Placed") {
    defaults.partner = dog?.partner;
    defaults.placement = dog?.placement;
    defaults.placementCamp = dog?.placementCamp;
    defaults.location = dog?.location;
  } else {
    defaults.location = dog?.location;
  }

  return defaults;
};

/**
 * Zod object for validating request bodies for users
 */
const userUpdateSchema = z.object({
  name: z.string(),
  role: z.enum(consts.userRoleArray),
  isActive: z.boolean(),
  acceptedInvite: z.boolean(),
});

const userRegistrationSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.string().email(),
  password: z.string().min(1), // change min to 8 later
});

const userInviteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(consts.userRoleArray),
  isActive: z.boolean(),
  acceptedInvite: z.boolean(),
});

/**
 * Zod object for validating request bodies for logs
 */
const logSchema = z.object({
  title: z.string().min(1),
  topic: z.enum(consts.topicArray),
  tags: z.array(z.enum(consts.tagsArray)).optional(),
  severity: z.enum(consts.concernArray),
  description: z.string().min(1).optional(),
  resolved: z.boolean(),
  resolution: z.string().min(1).optional(),
  resolver: z
    .string()
    .refine((id) => {
      return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
  author: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
  dog: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
});

/**
 * Zod object for validating request bodies for form updates
 */
const formUpdateSchema = z.object({
  responses: z
    .array(
      z.object({
        answer: z.string(),
      }),
    )
    .optional(),
});

/**
 * Zod object for validating request bodies for forms
 */
const formSchema = z.object({
  type: z.enum(consts.formTypeArray),
  user: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
  dog: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
  responses: z.array(
    z.object({
      answer: z.string(),
    }),
  ),
});

/**
 * Zod object for validating request bodies for signup
 */
const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter a valid name" }).trim(),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

/**
 * Zod object for information returned when user with limited association views dog
 * Used to strip all but the basic details from the dog data
 */
const limitedDogSchema = z.object({
  name: z.string().min(1),
  gender: z.enum(consts.genderPetArray).default("Male"),
  breed: z.string().min(1),
  weight: z.coerce.number(),
  dateOfBirth: z.coerce.date(),
  location: z.enum(consts.locationArray),
  coatColor: z.string().optional(),
});

/**
 * New Dog
 */
const newDog = {
  name: "New Dog",
  gender: "Female",
  behavior: consts.concernArray[0],
  medical: consts.concernArray[0],
  other: consts.concernArray[0],
  dateOfBirth: new Date("2019-03-15"),
  maternalDemeanor: [1, 1, 1],
  location: consts.locationArray[consts.locationArray[0]],
};

export {
  pages,
  consts,
  dogSchema,
  logSchema,
  userUpdateSchema,
  userRegistrationSchema,
  userInviteSchema,
  formSchema,
  formUpdateSchema,
  signUpSchema,
  dogInformationSchema,
  computeDefaultValues,
  newDog,
  limitedDogSchema,
};
