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
  concernArray: ["No concern", "Some concern", "High concern"],
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
  tagsArray: ["auditory", "heartworm", "fleas/ticks"],
  deliveryArray: ["Natural", "C-section", "Combination"],
  housingArray: ["Clinic", "Nursery", "BBI"],
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
          severity: "High concern",
          description: "Some other random log I made",
          author: {},
          dog: {}
        }
      ],
      instructors: [],
      _id: "dog1",
      name: "Rufus",
      gender: "Male",
      breed: "Poodle",
      behavior: "No concern",
      medical: "High concern",
      other: "No concern",
      parents: [],
      dateOfBirth: new Date("2021-09-06T21:37:38.975Z").toLocaleDateString(
        "en-US"
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
          severity: "High concern",
          description: "Some random log I made",
          author: {},
          dog: {}
        }
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
        "en-US"
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

export { pages, consts, mocks };
