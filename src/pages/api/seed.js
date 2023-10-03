import dbConnect from "../../../server/db/dbConnect";
import User from "../../../server/db/models/User";
import { createUser } from "../../../server/db/actions/User";
import Log from "../../../server/db/models/Log";
import Dog from "../../../server/db/models/Dog";
import { createLog } from "../../../server/db/actions/Log";
import { consts } from "@/utils/consts";
import { createDog } from "../../../server/db/actions/Dog";

const dogs = [];
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
  {
    title: "This is a log",
    topic: consts.topicArray[1],
    tags: [consts.tagsArray[0]],
    severity: consts.concernArray[2],
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
  {
    title: "This is a log",
    topic: consts.topicArray[1],
    tags: [consts.tagsArray[0]],
    severity: consts.concernArray[2],
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
  {
    title: "This is a log",
    topic: consts.topicArray[1],
    tags: [consts.tagsArray[0]],
    severity: consts.concernArray[2],
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

const dogNames = [
  "Max",
  "Charlie",
  "Rocky",
  "Buddy",
  "Duke",
  "Zeus",
  "Bear",
  "Tucker",
  "Bailey",
  "Cooper",
  "Finn",
  "Oliver",
  "Milo",
  "Leo",
  "Simba",
  "Louie",
  "Rusty",
  "Oscar",
  "Bentley",
  "Hunter",
  "Cody",
  "Jasper",
  "Apollo",
  "Diesel",
  "Ace",
  "Thor",
  "Marley",
  "Gizmo",
  "Rocco",
  "Bruno",
  "Hank",
  "Blue",
  "Roscoe",
  "Boomer",
  "Brody",
  "Chester",
  "Ziggy",
  "Murphy",
  "Wrigley",
  "Teddy",
  "Sammy",
  "Bear",
  "Brady",
  "Koda",
  "Jax",
  "Shadow",
  "Dexter",
  "Louie",
  "Gunner",
  "Rocky",
  "Bella",
  "Luna",
  "Daisy",
  "Lucy",
  "Sadie",
  "Ruby",
  "Chloe",
  "Lily",
  "Zoey",
  "Molly",
  "Rosie",
  "Bailey",
  "Stella",
  "Mia",
  "Penny",
  "Olive",
  "Sophie",
  "Willow",
  "Coco",
  "Zoe",
  "Mia",
  "Nala",
  "Ruby",
  "Ivy",
  "Hazel",
  "Harley",
  "Lulu",
  "Mia",
  "Ginger",
  "Daisy",
  "Roxy",
  "Maya",
  "Daisy",
  "Gracie",
  "Tinkerbell",
  "Lady",
  "Rosie",
  "Pepper",
  "Angel",
  "Bella",
  "Abby",
  "Mocha",
  "Winnie",
  "Honey",
  "Lexi",
  "Rosie",
  "Gigi",
  "Willow",
  "Pippin",
  "Breezy",
];

const dogBreeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Bulldog",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
];

const disabilities = ["epilepsy", "mobility", "diabetes", "PTSD"];

export default async function handler(req, res) {
  if (req.method === "GET") {
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
    const dogCount = 100;

    for (let i = 0; i < dogCount; i++) {
      dogs[i] = {
        name: dogNames[getRandomInt(0, dogNames.length - 1)],
        gender: getRandomInt(0, 1) === 1 ? "Male" : "Female",
        breed: dogBreeds[getRandomInt(0, dogBreeds.length - 1)],
        weight: getRandomInt(15, 30),
        behavior:
          consts.concernArray[getRandomInt(0, consts.concernArray.length - 1)],
        medical:
          consts.concernArray[getRandomInt(0, consts.concernArray.length - 1)],
        other:
          consts.concernArray[getRandomInt(0, consts.concernArray.length - 1)],
        dateOfBirth: new Date("2019-03-15"),
        litterSize: 8,
        birthOrder: 2,
        parents: [],
        maternalDemeanor: [
          getRandomInt(1, 5),
          getRandomInt(1, 5),
          getRandomInt(1, 5),
        ],
        location:
          consts.locationArray[
            getRandomInt(0, consts.locationArray.length - 1)
          ],
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
        partner: {
          age: getRandomInt(1, 100),
          name: dogNames[getRandomInt(0, dogNames.length - 1)],
          disability: disabilities[getRandomInt(0, disabilities.length - 1)],
        },
      };

      dogs[i].instructors = [userIds[0]];
      dogs[i].partner.user = userIds[2];

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
