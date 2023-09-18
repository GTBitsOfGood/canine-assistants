import dbConnect from "../dbConnect";
import Log from "../models/Log";
import Dog from "../models/Dog";

export async function createLog(logData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to create log at this time, please try again");
  }

  const log = new Log(logData);
  try {
    await log.save();
  } catch (e) {
    throw new Error("Unable to create log");
  }

  const dog = await Dog.findById(logData.dog);
  if (!dog) {
    throw new Error("Dog ID does not exist");
  }
  // edit topic's severity based on log
  if (logData.topic == "Medical") {
    dog.medical = logData.severity;
  } else if (logData.topic == "Behavioral") {
    dog.behavior = logData.severity;
  } else {
    dog.other = logData.severity;
  }

  if (dog.recentLogs.length < 2) {
    // If there are less than 2 logs in recentLogs, append the new log
    dog.recentLogs.push(log._id);
  } else {
    // The new log replaces the oldest log on the Dog's recentLogs attribute.
    const firstLog = await Log.findById(dog.recentLogs[0]);
    const secondLog = await Log.findById(dog.recentLogs[1]);
    if (!firstLog || !secondLog) {
      throw new Error("One or more of the recent logs could not be found");
    }

    const firstDate = new Date(firstLog.createdAt);
    const secondDate = new Date(secondLog.createdAt);
    if (firstDate.getTime() < secondDate.getTime()) {
      // remove first log
      dog.recentLogs.splice(0, 1);
    } else {
      // remove second log
      dog.recentLogs.splice(1, 1);
    }
    dog.recentLogs.push(log._id);
  }

  try {
    await dog.save();
  } catch (e) {
    throw new Error("Unable to update dog");
  }

  return log._id;
}
