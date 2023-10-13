const MONTHLY_PLACED_FORM = [
  {
    question: "Work or school schedule",
    choices: ["Full-Time", "Part-Time", "N/a"],
  },
  {
    question: "How easy has it been to get your dog into the car?",
    choices: ["Very Easy", "Fairly Easy", "Difficult", "Very Difficult"],
  },
  {
    question: "How comfortable was your dog in the car?",
    choices: [
      "Totally comfortable",
      "fairly comfortable",
      "stayed curled on the floorboard",
      "paced the whole time",
    ],
  },
  {
    question: "How easy has it been to get your dog out of the car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
  },
  {
    question: "Did you teach your dog anything new? If yes, please describe.",
    choices: [],
  },
  {
    question: "Is there anything you would like to teach your dog?",
    choices: [],
  },
  {
    question: "Any veterinary care given? If yes, please describe.",
    choices: [],
  },
  {
    question: "How often did your dog bark at home?",
    choices: ["None", "A few times", "Every day", "Multiple times every day"],
  },
  {
    question: "How often did your dog bark at work or school?",
    choices: ["None", "A few times", "Every day", "Multiple times every day"],
  },
  {
    question:
      "Did your dog have any accidents in the house? If yes, please give details.",
    choices: [],
  },
  {
    question:
      "Did your dog have any accidents in public? If yes, please give details.",
    choices: [],
  },
  {
    question: "Overall, how comfortable was your dog when you were out?",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
  },
  {
    question:
      "Was your dog startled or upset by any sounds? If yes, please explain in detail.",
    choices: [],
  },
  {
    question:
      "Was your dog startled or upset by any sights (including people or other dogs)? If yes, please explain in detail.",
    choices: [],
  },
  {
    question: "How often were you able to play with your dog?",
    choices: [],
  },
  {
    question: "Did your dog play with any other dogs?",
    choices: [],
  },
  {
    question: "Is there anything else you’d like us to know?",
    choices: [],
  },
  {
    question: "Is there anything you’d like to discuss with us?",
    choices: [],
  },
];
// How comfortable was your dog in the car?
const MONTHLY_UNPLACED_FORM = [
  {
    question: "Does the dog show safe haven effect with instructor?",
    choices: ["Yes", "No"],
  },
  {
    question: "Does the dog show secure base effect with instructor?",
    choices: ["Yes", "No"],
  },
  {
    question: "Does the dog show proximity maintenance with instructor?",
    choices: ["Yes", "No"],
  },
  {
    question:
      "Does the dog show separation distress/reunion joy with instructor?",
    choices: ["Yes", "No"],
  },
  {
    question: "Can the dog answer yes or no questions?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Can the dog answer other binary questions?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Can the dog reason by exclusion?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question:
      "Does the dog synchronize with the activity level of his instructor?",
    choices: ["Always", "Sometimes", "Never"],
  },
  {
    question:
      "Does the dog understand how to move objects with his mouth, nose, and paws?",
    choices: ["Yes", "Working on it", "No"],
  },
  {
    question: "Does the dog communicate information to his instructor?",
    choices: ["Yes", "Sometimes", "Not yet"],
  },
  {
    question: "Does the dog respond to his instructor’s body language?",
    choices: ["Yes", "Sometimes", "Not yet"],
  },
  {
    question: "Does the dog respond to his instructor’s spoken directives?",
    choices: ["Yes", "Sometimes", "Not yet"],
  },
  {
    question: "Does the dog walk calmly on a loose leash?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog understand the concept of being gentle when asked?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question:
      "Does the dog gently take food from between instructor’s fingertips?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog go better hurry on leash?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog freeze and maintain position until touched?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog pause before crossing thresholds?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog respond to 'ick'?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog copy actions using 'like me'?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog retrieve to hand or lap?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog tug?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog do light switches?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog press buttons?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog recognize the pre-ictal odor?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog recognize the smell of low blood sugar?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Does the dog recognize the smell of high blood sugar?",
    choices: ["Always", "Working on it", "Doesn't know"],
  },
  {
    question: "Is the dog startled by loud noises?",
    choices: ["Always", "Sometimes", "Never"],
  },
  {
    question: "Is the dog startled by strange sights?",
    choices: ["Always", "Sometimes", "Never"],
  },
  {
    question: "Does the dog play well with other dogs?",
    choices: ["Always", "Usually", "Not really"],
  },
  {
    question: "How easy is it to put the dog’s harness on?",
    choices: ["Very easy", "Easy", "Somewhat difficult", "Really difficult"],
  },
  {
    question:
      "Does the dog hold his end of the We Leash when asked to do so? If yes, what attachments will he hold?",
    choices: [
      "Handle with bone",
      "Plain handle",
      "Binkie",
      "Toy (place for notes)",
    ],
  },
  {
    question: "How easy is it to get the dog into a car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
  },
  {
    question: "How comfortable is the dog in a car?",
    choices: [
      "Totally comfortable",
      "Fairly comfortable",
      "Stayed curled on the floorboard",
      "Paced the whole time",
    ],
  },
  {
    question: "How easy is it to get the dog out of a car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
  },
  {
    question:
      "Is the dog on any medications? If so, please give the name and dosage.",
    choices: [],
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
  },
  {
    question: "Bold to Hesitant in familiar situations scale",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
  },
  {
    question: "Bold to Shy in New Situations",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
  },
];

const VOLUNTEER_FORM = [
  {
    question: "How many times have you worked with this dog previously?",
    choices: ["None", "Once", "2-3 times", "4-5 times", "6 or more times"],
  },
  {
    question: "Did you give the dog a bath?",
    choices: ["Yes", "No"],
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
  },
  {
    question: "How comfortable was the dog in the bathtub?",
    choices: [
      "Comfortable",
      "Wiggling but okay",
      "Tried to get out the whole time",
      "N/a",
    ],
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
  },
  {
    question: "How easy was it to put the dog’s harness on?",
    choices: ["Very easy", "Easy", "Somewhat difficult", "Really difficult"],
  },
  {
    question:
      "Did the dog hold his end of the We Leash when asked to do so? If yes, what attachment did you use?",
    choices: [
      "Handle with bone",
      "Plain handle",
      "Binkie",
      "Toy (place for notes)",
    ],
  },
  {
    question: "How easy was it to get your dog into the car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
  },
  {
    question: "How comfortable was your dog in the car?",
    choices: [
      "Totally comfortable",
      "Fairly comfortable",
      "Stayed curled on the floorboard",
      "Paced the whole time",
    ],
  },
  {
    question: "How easy was it to get your dog out of the car?",
    choices: ["Very easy", "Fairly easy", "Difficult", "Very difficult"],
  },
  {
    question: "Did you take the dog on a home visit?",
    choices: ["Yes", "No"],
  },
  {
    question: "How long did the dog stay?",
    choices: [],
  },
  {
    question: "Had this dog been to your home previously?",
    choices: ["Once", "2-3 times", "4-5 times", "6 or more times"],
  },
  {
    question: "How comfortable was the dog in your home?",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
  },
  {
    question: "How many times did the dog urinate in the house?",
    choices: ["(Place for notes)"],
  },
  {
    question: "How many times did the dog defecate in the house?",
    choices: ["(Place for notes)"],
  },
  {
    question: "Outings: Please list everywhere you took the dog",
    choices: [],
  },
  {
    question: "Overall, how comfortable was the dog on your outings?",
    choices: ["Bold", "Comfortable", "Somewhat hesitant", "Hesitant"],
  },
  {
    question:
      "Was your dog startled or upset by any sounds? If yes, please explain in detail.",
    choices: [],
  },
  {
    question:
      "Was your dog startled or upset by any sights (including people or other dogs)? If yes, please explain in detail.",
    choices: [],
  },
];

/*
VOLUNTEER INTERACTION FORM
How many times have you worked with this dog previously?
None, Once, 2-3 times, 4-5 times, 6 or more times
Did you give the dog a bath?
Yes, No
How hard was it to get the dog into the tub?
Easy, somewhat difficult, different, very difficult, N/a
How comfortable was the dog in the bathtub?
Comfortable, wiggling but okay, tried to get out the whole time, N/a
Did you use forced air dryer? If yes, how comfortable was the dog with the dryer?
Totally comfortable, fairly comfortable, didn’t like it, was afraid of it
Did you use a handheld hair dryer? If yes, how comfortable was the dog with the dryer?
Totally comfortable, fairly comfortable, didn’t like it, was afraid of it
How easy was it to put the dog’s harness on?

Very easy, easy, somewhat difficult, really difficult
Did the dog hold his end of the We Leash when asked to do so? If yes, what attachment did you
use?

Handle with bone, plain handle, binkie, toy (place for notes)
How easy was it to get your dog into the car?
Very easy, fairly easy, difficult, very difficult
How comfortable was your dog in the car?
Totally comfortable, fairly comfortable, stayed curled on the floorboard, paced the whole time
How easy was it to get your dog out of the car?
Very easy, fairly easy, difficult, very difficult
Did you take the dog on a home visit?
How long did the dog stay?
Had this dog been to your home previously?
If yes, how many times: Once, 2-3 times, 4-5 times, 6 or more times
How comfortable was the dog in your home?
Bold, comfortable, somewhat hesitant, hesitant
How many times did the dog urinate in the house? (Place for notes)
How many times did the dog defecate in the house? (Place for notes)
Outings
Please list everywhere you took the dog
Overall, how comfortable was the dog on your outings?
Bold, comfortable, somewhat hesitant, hesitant
Was your dog startled or upset by any sounds? If yes, please explain in detail.

Was your dog startled or upset by any sights (including people or other dogs)? If yes, please explain
in detail.
*/

/*
MONTHLY UNPLACED FORM
Does the dog show safe haven effect with instructor?
Does the dog show secure base effect with instructor?
Does the dog show proximity maintenance with instructor?
Does the dog show separation distress/reunion joy with instructor?
Can the dog answer yes or no questions? Always, working on it, doesn’t know
Can the dog answer other binary questions? Always, working on it, doesn’t know
Can the dog reason by exclusion? Always, working on it, doesn’t know
Does the dog synchronize with the activity level of his instructor? Always, sometimes, never
Does the dog understand how to move objects with his mouth, nose, and paws? Yes, working on it,
no
Does the dog communicate information to his instructor? Yes, sometimes, not yet
Does the dog respond to his instructor’s body language? Yes, sometimes, not yet
Does the dog respond to his instructor’s spoken directives? Yes, sometimes, not yet
Does the dog walk calmly on a loose leash? Always, working on it, doesn’t know
Does the dog understand the concept of being gentle when asked? Always, working on it, doesn’t
know
Does the dog gently take food from between instructor’s fingertips? Always, working on it, doesn’t
know
Does the dog go better hurry on leash? Always, working on it, doesn’t know
Does the dog freeze and maintain position until touched? Always, working on it, doesn’t know
Does the dog pause before crossing thresholds? Always, working on it, doesn’t know
Does the dog respond to ick? Always, working on it, doesn’t know
Does the dog copy actions using like me? Always, working on it, doesn’t know
Does the dog retrieve to hand or lap? Always, working on it, doesn’t know
Does the dog tug? Always, working on it, doesn’t know
Does the dog do light switches? Always, working on it, doesn’t know
Does the dog press buttons? Always, working on it, doesn’t know
Does the dog recognize the pre-ictal odor? Always, working on it, doesn’t know
Does the dog recognize the smell of low blood sugar? Always, working on it, doesn’t know
Does the dog recognize the smell of high blood sugar? Always, working on it, doesn’t know
Is the dog startled by loud noises? Always, sometimes, never
Is the dog startled by strange sights? Always, sometimes, never
Does the dog play well with other dogs? Always, usually, not really
How easy is it to put the dog’s harness on?

Very easy, easy, somewhat difficult, really difficult
Does the dog hold his end of the We Leash when asked to do so? If yes, what attachments will he
hold?
Handle with bone, plain handle, binkie, toy (place for notes)
How easy is it to get the dog into a car?
Very easy, fairly easy, difficult, very difficult
How comfortable is the dog in a car?
Totally comfortable, fairly comfortable, stayed curled on the floorboard, paced the whole time
How easy is it to get the dog out of a car?
Very easy, fairly easy, difficult, very difficult
Is the dog on any medications? If so, please give the name and dosage.
Affectionate to Fearful Scale (with people):
Calmly affectionate, excitedly affectionate, somewhat aloof, aloof, fearful
Affectionate to Fearful with New People
Calmly affectionate, excitedly affectionate, somewhat aloof, aloof, fearful
Bold to Hesitant in familiar situations scale
Bold, comfortable, somewhat hesitant, hesitant
Bold to Shy in New Situations
Bold, comfortable, somewhat hesitant, hesitant 

*/

/*
MONTHLY PLACED FORM
How comfortable was your dog in the car?
Totally comfortable, fairly comfortable, stayed curled on the floorboard, paced the whole time
How easy has it been to get your dog out of the car?
Very easy, fairly easy, difficult, very difficult
(Place for notes with the car questions.)

Did you teach your dog anything new? If yes, please describe.
Is there anything you would like to teach your dog?
Any veterinary care given? If yes, please describe.
How often did your dog bark at home? None, a few times, every day, multiple times every day
(Place for notes)
How often did your dog bark at work or school? None, a few times, every day, multiple times every
day (Place for notes)
Did your dog have any accidents in the house? If yes, please give details.
Did your dog have any accidents in public? If yes, please give details.
Overall, how comfortable was your dog when you were out?
Bold, comfortable, somewhat hesitant, hesitant
Was your dog startled or upset by any sounds? If yes, please explain in detail.

Was your dog startled or upset by any sights (including people or other dogs)? If yes, please explain
in detail.
How often were you able to play with your dog?
Did your dog play with any other dogs? (Place for notes)
Is there anything else you’d like us to know?
Is there anything you’d like to discuss with us?

*/

export { MONTHLY_PLACED_FORM, MONTHLY_UNPLACED_FORM, VOLUNTEER_FORM };
