const pages = {
  index: "/",
  api: {
    example: "/api/example",
    users: {
      index: "/api/users",
    },
  },
};

const consts = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",

  genderArray: ["Female", "Male"],
  genderOtherArray: ["Female", "Male", "Other"],
  concernArray: ["No concern", "Some concern", "High concern"],
  demeanorArray: ["Happy", "Sad", "Fearful"], // placeholders
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
};

export { pages, consts };
