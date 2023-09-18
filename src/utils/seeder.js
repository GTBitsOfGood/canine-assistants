const dogs = [
  {
    name: "Bella",
    gender: "Female",
    breed: "Labrador Retriever",
    weight: 30,
    behavior: "No concern",
    medical: "Some concern",
    other: "No concern",
    recentLogs: [],
    parents: [],
    dateOfBirth: new Date("2019-03-15"),
    litterSize: 8,
    birthOrder: 2,
    maternalDemeanor: "Happy",
    location: "Facility 1",
    toiletArea: "Leashed",
    housemates: [
      {
        age: 40,
        gender: "Male",
        relationshipToPartner: "Spouse",
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
    behavior: "Behavior",
    medical: "Other",
    other: "Medical",
    recentLogs: [],
    dateOfBirth: new Date("2020-06-20"),
    litterSize: 6,
    birthOrder: 3,
    maternalDemeanor: "Fearful",
    location: "Placed",
    rolePlacedAs: "Service",
    partner: "",
    toiletArea: "Back Yard",
    housemates: [
      {
        age: 30,
        gender: "Female",
        relationshipToPartner: "Spouse",
      },
    ],
    petmates: [
      {
        animal: "Dog",
        age: 4,
        gender: "Female",
      },
    ],
  },
];
const users = [
  {
    username: "user1",
    hash: "hash1",
  },
  {
    username: "user2",
    hash: "hash2",
  },
  {
    username: "user3",
    hash: "hash3",
  },
  {
    username: "user4",
    hash: "hash4",
  },
  {
    username: "user5",
    hash: "hash5",
  },
  {
    username: "user6",
    hash: "hash6",
  },
  {
    username: "user7",
    hash: "hash7",
  },
  {
    username: "user8",
    hash: "hash8",
  },
  {
    username: "user9",
    hash: "hash9",
  },
  {
    username: "user10",
    hash: "hash10",
  },
];
try {
  seedDb();
} catch (e) {
  console.log("Failed");
}

async function seedDb() {
  await connect();
  // clears the db
  await Dog.deleteMany();
  await User.deleteMany();
  await Log.deleteMany();

  // start adding documents
  const dbUsers = await User.insertMany(users);
  const dbDogs = await Dog.insertMany(dogs);

  // get User _id's and Dog _id's
  console.log(dbUsers);
  console.log(dbDogs);
}
async function connect() {
  const DB_URL = process.env.DB_URL;
  const DB_NAME = process.env.DB_NAME;
  mongoose
    .connect(`${DB_URL}${DB_NAME}?retryWrites=true&w=majority`, opts)
    .then((mongoose) => {
      // mongoose.set('debug', process.env.NODE_ENV === 'development')

      return mongoose;
    });
}
