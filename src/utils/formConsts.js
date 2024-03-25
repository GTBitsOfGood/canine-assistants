const MONTHLY_PLACED_FORM = [
  {
    question: "Work or school schedule",
    choices: ["Full-Time", "Part-Time", "N/a"],
    questionNumber: 1,
  },
  {
    question: "How easy has it been to get your dog into the car?",
    choices: ["Very Easy", "Fairly Easy", "Difficult", "Very Difficult"],
    questionNumber: 2,
  },
  {
    question: "How comfortable was your dog in the car?",
    choices: [
      "Totally comfortable",
      "fairly comfortable",
      "stayed curled on the floorboard",
      "paced the whole time",
    ],
    questionNumber: 0,
  },
  {
    question: "How easy has it been to get your dog out of the car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
    questionNumber: 0,
  },
  {
    question: "Did you teach your dog anything new? If yes, please describe.",
    choices: [],
    questionNumber: 3,
  },
  {
    question: "Is there anything you would like to teach your dog?",
    choices: [],
    questionNumber: 0,
  },
  {
    question: "Any veterinary care given? If yes, please describe.",
    choices: [],
    questionNumber: 4,
  },
  {
    question: "How often did your dog bark at home?",
    choices: ["None", "A few times", "Every day", "Multiple times every day"],
    questionNumber: 5,
  },
  {
    question: "How often did your dog bark at work or school?",
    choices: ["None", "A few times", "Every day", "Multiple times every day"],
    questionNumber: 0,
  },
  {
    question:
      "Did your dog have any accidents in the house? If yes, please give details.",
    choices: [],
    questionNumber: 6,
  },
  {
    question:
      "Did your dog have any accidents in public? If yes, please give details.",
    choices: [],
    questionNumber: 0,
  },
  {
    question: "Overall, how comfortable was your dog when you were out?",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
    questionNumber: 7,
  },
  {
    question:
      "Was your dog startled or upset by any sounds? If yes, please explain in detail.",
    choices: [],
    questionNumber: 8,
  },
  {
    question:
      "Was your dog startled or upset by any sights (including people or other dogs)? If yes, please explain in detail.",
    choices: [],
    questionNumber: 0,
  },
  {
    question: "How often were you able to play with your dog?",
    choices: [],
    questionNumber: 9,
  },
  {
    question: "Did your dog play with any other dogs?",
    choices: [],
    questionNumber: 10,
  },
  {
    question: "Is there anything else you’d like us to know?",
    choices: [],
    questionNumber: 11,
  },
  {
    question: "Is there anything you’d like to discuss with us?",
    choices: [],
    questionNumber: 0,
  },
];

// How comfortable was your dog in the car?
const MONTHLY_UNPLACED_FORM = [
  {
    question: "Does the dog show safe haven effect with instructor?",
    choices: ["Yes", "No"],
    questionNumber: 1,
  },
  {
    question: "Does the dog show secure base effect with instructor?",
    choices: ["Yes", "No"],
    questionNumber: 0,
  },
  {
    question: "Does the dog show proximity maintenance with instructor?",
    choices: ["Yes", "No"],
    questionNumber: 2,
  },
  {
    question:
      "Does the dog show separation distress/reunion joy with instructor?",
    choices: ["Yes", "No"],
    questionNumber: 0,
  },
  {
    question: "Can the dog answer yes or no questions?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 3,
  },
  {
    question: "Can the dog answer other binary questions?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 0,
  },
  {
    question: "Can the dog reason by exclusion?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 4,
  },
  {
    question:
      "Does the dog synchronize with the activity level of his instructor?",
    choices: ["Always", "Sometimes", "Never"],
    questionNumber: 5,
  },
  {
    question:
      "Does the dog understand how to move objects with his mouth, nose, and paws?",
    choices: ["Yes", "Working on it", "No"],
    questionNumber: 6,
  },
  {
    question: "Does the dog communicate information to his instructor?",
    choices: ["Yes", "Sometimes", "Not yet"],
    questionNumber: 7,
  },
  {
    question: "Does the dog respond to his instructor’s body language?",
    choices: ["Yes", "Sometimes", "Not yet"],
    questionNumber: 8,
  },
  {
    question: "Does the dog respond to his instructor’s spoken directives?",
    choices: ["Yes", "Sometimes", "Not yet"],
    questionNumber: 0,
  },
  {
    question: "Does the dog walk calmly on a loose leash?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 9,
  },
  {
    question: "Does the dog understand the concept of being gentle when asked?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 10,
  },
  {
    question:
      "Does the dog gently take food from between instructor’s fingertips?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 0,
  },
  {
    question: "Does the dog go better hurry on leash?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 11,
  },
  {
    question: "Does the dog freeze and maintain position until touched?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 12,
  },
  {
    question: "Does the dog pause before crossing thresholds?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 13,
  },
  {
    question: "Does the dog respond to 'ick'?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 14,
  },
  {
    question: "Does the dog copy actions using 'like me'?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 15,
  },
  {
    question: "Does the dog retrieve to hand or lap?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 16,
  },
  {
    question: "Does the dog tug?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 17,
  },
  {
    question: "Does the dog do light switches?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 18,
  },
  {
    question: "Does the dog press buttons?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 0,
  },
  {
    question: "Does the dog recognize the pre-ictal odor?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 19,
  },
  {
    question: "Does the dog recognize the smell of low blood sugar?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 20,
  },
  {
    question: "Does the dog recognize the smell of high blood sugar?",
    choices: ["Always", "Working on it", "Doesn't know"],
    questionNumber: 0,
  },
  {
    question: "Is the dog startled by loud noises?",
    choices: ["Always", "Sometimes", "Never"],
    questionNumber: 21,
  },
  {
    question: "Is the dog startled by strange sights?",
    choices: ["Always", "Sometimes", "Never"],
    questionNumber: 0,
  },
  {
    question: "Does the dog play well with other dogs?",
    choices: ["Always", "Usually", "Not really"],
    questionNumber: 22,
  },
  {
    question: "How easy is it to put the dog’s harness on?",
    choices: ["Very easy", "Easy", "Somewhat difficult", "Really difficult"],
    questionNumber: 23,
  },
  {
    question:
      "Does the dog hold his end of the We Leash when asked to do so? If yes, what attachments will he hold?",
    choices: ["Handle with bone", "Plain handle", "Binkie"],
    questionNumber: 24,
  },
  { question: "(place for notes)", choices: [], questionNumber: 0 },
  {
    question: "How easy is it to get the dog into a car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
    questionNumber: 25,
  },
  {
    question: "How comfortable is the dog in a car?",
    choices: [
      "Totally comfortable",
      "Fairly comfortable",
      "Stayed curled on the floorboard",
      "Paced the whole time",
    ],
    questionNumber: 0,
  },
  {
    question: "How easy is it to get the dog out of a car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
    questionNumber: 0,
  },
  {
    question:
      "Is the dog on any medications? If so, please give the name and dosage.",
    choices: [],
    questionNumber: 26,
  },
  {
    question: "Affectionate to Fearful Scale (with people):",
    choices: [
      "Calmly affectionate",
      "Excitedly affectionate",
      "Somewhat aloof",
      "Aloof",
      "Fearful",
    ],
    questionNumber: 27,
  },
  {
    question: "Affectionate to Fearful with New People",
    choices: [
      "Calmly affectionate",
      "Excitedly affectionate",
      "Somewhat aloof",
      "Aloof",
      "Fearful",
    ],
    questionNumber: 0,
  },
  {
    question: "Bold to Hesitant in familiar situations scale",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
    questionNumber: 28,
  },
  {
    question: "Bold to Shy in New Situations",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
    questionNumber: 0,
  },
];

const VOLUNTEER_FORM = [
  {
    question: "How many times have you worked with this dog previously?",
    choices: ["None", "Once", "2-3 times", "4-5 times", "6 or more times"],
    questionNumber: 1,
  },
  {
    question: "Did you give the dog a bath?",
    choices: ["Yes", "No"],
    questionNumber: 2,
  },
  {
    question: "How hard was it to get the dog into the tub?",
    choices: [
      "Easy",
      "Somewhat difficult",
      "Different",
      "Very difficult",
      "N/a",
    ],
    questionNumber: 0,
  },
  {
    question: "How comfortable was the dog in the bathtub?",
    choices: [
      "Comfortable",
      "Wiggling but okay",
      "Tried to get out the whole time",
      "N/a",
    ],
    questionNumber: 0,
  },
  {
    question:
      "Did you use a forced air dryer? If yes, how comfortable was the dog with the dryer?",
    choices: [
      "Totally comfortable",
      "Fairly comfortable",
      "Didn’t like it",
      "Was afraid of it",
    ],
    questionNumber: 3,
  },
  {
    question:
      "Did you use a handheld hair dryer? If yes, how comfortable was the dog with the dryer?",
    choices: [
      "Totally comfortable",
      "Fairly comfortable",
      "Didn’t like it",
      "Was afraid of it",
    ],
    questionNumber: 0,
  },
  {
    question: "How easy was it to put the dog’s harness on?",
    choices: ["Very easy", "Easy", "Somewhat difficult", "Really difficult"],
    questionNumber: 4,
  },
  {
    question:
      "Did the dog hold his end of the We Leash when asked to do so? If yes, what attachment did you use?",
    choices: ["Handle with bone", "Plain handle", "Binkie", "Toy"],
    questionNumber: 5,
  },
  { question: "(place for notes)", choices: [], questionNumber: 0 },
  {
    question: "How easy was it to get your dog into the car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
    questionNumber: 6,
  },
  {
    question: "How comfortable was your dog in the car?",
    choices: [
      "Totally comfortable",
      "Fairly comfortable",
      "Stayed curled on the floorboard",
      "Paced the whole time",
    ],
    questionNumber: 0,
  },
  {
    question: "How easy was it to get your dog out of the car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
    questionNumber: 0,
  },
  {
    question: "Did you take the dog on a home visit?",
    choices: ["Yes", "No"],
    questionNumber: 7,
  },
  {
    question: "How long did the dog stay?",
    choices: [],
    questionNumber: 0,
  },
  {
    question: "Had this dog been to your home previously?",
    choices: ["Once", "2-3 times", "4-5 times", "6 or more times"],
    questionNumber: 8,
  },
  {
    question: "How comfortable was the dog in your home?",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
    questionNumber: 0,
  },
  {
    question: "How many times did the dog urinate in the house?",
    choices: [],
    questionNumber: 9,
  },
  {
    question: "How many times did the dog defecate in the house?",
    choices: [],
    questionNumber: 0,
  },
  {
    question: "Outings: Please list everywhere you took the dog",
    choices: [],
    questionNumber: 10,
  },
  {
    question: "Overall, how comfortable was the dog on your outings?",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
    questionNumber: 0,
  },
  {
    question:
      "Was your dog startled or upset by any sounds? If yes, please explain in detail.",
    choices: [],
    questionNumber: 11,
  },
  {
    question:
      "Was your dog startled or upset by any sights (including people or other dogs)? If yes, please explain in detail.",
    choices: [],
    questionNumber: 0,
  },
];

export { MONTHLY_PLACED_FORM, MONTHLY_UNPLACED_FORM, VOLUNTEER_FORM };
