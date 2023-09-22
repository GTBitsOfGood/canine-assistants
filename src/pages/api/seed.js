import dbConnect from "../../../server/db/dbConnect";
import User from "../../../server/db/models/User";
import { createUser } from "../../../server/db/actions/User";
import Log from "../../../server/db/models/Log";
import Dog from "../../../server/db/models/Dog";
import { createLog } from "../../../server/db/actions/Log";
import { consts } from "@/utils/consts";
import { createDog } from "../../../server/db/actions/Dog";

const dogs = [
  {
    name: "Bella",
    gender: "Female",
    breed: "Labrador Retriever",
    weight: 30,
    behavior: "No concern",
    medical: "Some concern",
    other: "No concern",
    dateOfBirth: new Date("2019-03-15"),
    litterSize: 8,
    birthOrder: 2,
    parents: [],
    maternalDemeanor: "Happy",
    location: "Facility 1",
    toiletArea: "Leashed",
    housemates: [
      {
        age: 40,
        gender: "Male",
        relationshipToPartner: "Partner",
      },
      {
        age: 10,
        gender: "Female",
        relationshipToPartner: "Child",
      },
    ],
    petmates: [
      {
        animal: "Cat",
        age: 5,
        gender: "Male",
      },
      {
        animal: "Rabbit",
        age: 2,
        gender: "Female",
      },
    ],
    instructors: [],
  },
  {
    name: "Max",
    gender: "Male",
    breed: "German Shepherd",
    weight: 40,
    behavior: "No concern",
    medical: "High concern",
    other: "No concern",
    recentLogs: [],
    dateOfBirth: new Date("2020-06-20"),
    litterSize: 6,
    birthOrder: 3,
    parents: [],
    maternalDemeanor: "Fearful",
    location: "Placed",
    rolePlacedAs: "Service",
    partner: "",
    toiletArea: "Leashed",
    housemates: [
      {
        age: 30,
        gender: "Female",
        relationshipToPartner: "Partner",
      },
    ],
    petmates: [
      {
        animal: "Dog",
        age: 4,
        gender: "Female",
      },
    ],
    instructors: [],
  },
  {
    name: "Casey",
    gender: "Female",
    breed: "Pomeranian",
    weight: 10,
    behavior: "Some concern",
    medical: "No concern",
    other: "No concern",
    dateOfBirth: new Date("2025-03-08"),
    litterSize: 4,
    birthOrder: 3,
    parents: [],
    maternalDemeanor: "Fearful",
    location: "Placed",
    rolePlacedAs: "Companion",
    partner: "",
    toiletArea: "Off-leash",
    housemates: [
      {
        age: 50,
        gender: "Male",
        relationshipToPartner: "Partner",
      },
      {
        age: 19,
        gender: "Female",
        relationshipToPartner: "Child",
      },
      {
        age: 17,
        gender: "Female",
        relationshipToPartner: "Child",
      },
    ],
    petmates: [
      {
        animal: "Rat",
        age: 2,
        gender: "Male",
      },
      {
        animal: "Rabbit",
        age: 3,
        gender: "Female",
      },
    ],
    instructors: [],
  },
];
const users = [
  {
    username: "jsmith",
    hash: "hash1",
  },
  {
    username: "afazio",
    hash: "hash2",
  },
  {
    username: "bpatel",
    hash: "hash3",
  },
  {
    username: "gburdell",
    hash: "hash4",
  },
  {
    username: "buzz",
    hash: "hash5",
  },
  {
    username: "amahesh",
    hash: "hash6",
  },
  {
    username: "emitchell",
    hash: "hash7",
  },
  {
    username: "pcabrera",
    hash: "hash8",
  },
  {
    username: "khenry",
    hash: "hash9",
  },
  {
    username: "rhoward",
    hash: "hash10",
  },
];
const logs = [
  {
    title: "This is a log",
    topic: consts.topicArray[0],
    tags: [consts.tagsArray[0]],
    severity: consts.concernArray[0],
    description: "This is a log description",
    author: "",
    dog: "",
  },
  {
    title: "This is a log",
    topic: consts.topicArray[1],
    tags: [consts.tagsArray[1]],
    severity: consts.concernArray[1],
    description: "This is a log description",
    author: "",
    dog: "",
  },
  {
    title: "This is a log",
    topic: consts.topicArray[2],
    tags: [consts.tagsArray[2]],
    severity: consts.concernArray[2],
    description: "This is a log description",
    author: "",
    dog: "",
  },
  {
    title: "This is a log",
    topic: consts.topicArray[0],
    tags: [consts.tagsArray[0]],
    severity: consts.concernArray[0],
    description: "This is a log description",
    author: "",
    dog: "",
  },
  {
    title: "This is a log",
    topic: consts.topicArray[1],
    tags: [consts.tagsArray[0]],
    severity: consts.concernArray[2],
    description: "This is a log description",
    author: "",
    dog: "",
  },
];

export default async function handler(req, res) {
  if (process.env.NODE_ENV === "development" && req.method === "GET") {
    await dbConnect();
    // delete everythin
    await User.deleteMany({});
    await Log.deleteMany({});
    await Dog.deleteMany({});

    // create users
    const userIds = [];
    for (const user of users) {
      const id = await createUser(user.username, user.hash);
      userIds.push(id.toString());
    }

    // create dogs
    const dogIds = [];
    dogs[1].partner = userIds[2];
    dogs[2].partner = userIds[3];
    for (let i = 0; i < dogs.length; i++) {
      dogs[i].instructors = [userIds[0]];
      const id = await createDog(dogs[i]);
      dogIds.push(id.toString());
    }

    // create logs
    for (let i = 0; i < logs.length; i++) {
      logs[i].dog = dogIds[getRandomInt(0, dogIds.length - 1)];
      logs[i].author = userIds[getRandomInt(0, userIds.length - 1)];
      await createLog(logs[i]);
    }
    return res.send("Successfully seeded db");
  }
  return res.redirect("/");
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
