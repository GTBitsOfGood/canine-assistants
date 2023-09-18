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
    maternalDemeanor: "Fearful",
    location: "Placed",
    rolePlacedAs: "Service",
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
  console.log("Successfully seeded local db");
} catch (e) {
  console.log("Failed to seed local db");
}

async function seedDb() {
  // delete everything

  // add dogs
  for (const dog of dogs) {
    fetch(`http://localhost:3000/api/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((result) => result.json())
      .then((body) => {
        console.log(body);
      });
  }

  // add users
  for (const dog of dogs) {
    fetch(`http://localhost:3000/api/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((result) => result.json())
      .then((body) => {
        console.log(body);
      });
  }
}

// async function connect() {
//   const DB_URL = process.env.DB_URL;
//   const DB_NAME = process.env.DB_NAME;
//   mongoose
//     .connect(`${DB_URL}${DB_NAME}?retryWrites=true&w=majority`, opts)
//     .then((mongoose) => {
//       // mongoose.set('debug', process.env.NODE_ENV === 'development')

//       return mongoose;
//     });
// }
