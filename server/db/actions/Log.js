import dbConnect from "../dbConnect";
import Log from "../models/Log";
import Dog from "../models/Dog";

export async function createLog(logData) {
  await dbConnect();

  const dog = await Dog.findById(logData.Dog);
  if (!dog) {
    throw new Error("Dog ID does not exist");
  }
  // edit topic's severity based on log
  if (logData.topic == "Medical") {
    dog.medical = logData.severity;
  } else if (logData.topic == "Behavioral") {
    dog.behavioral = logData.severity;
  } else {
    dog.other = logData.severity;
  }

  if (dog.recentLogs.length < 2) {
    // If there are less than 2 logs in recentLogs, append the new log
    dog.recentLogs.push(logData._id);
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
      const removed = await Log.findByIdAndRemove(dog.recentLogs[0]);

      if (!removed) {
        throw new Error(
          "The oldest recent log could not be pruned, please try again.",
        );
      }
      dog.recentLogs.splice(0, 1);
    } else {
      // remove first log
      const removed = Log.findByIdAndRemove(dog.recentLogs[1]);

      if (!removed) {
        throw new Error(
          "The oldest recent log could not be pruned, please try again.",
        );
      }
      dog.recentLogs.splice(1, 1);
    }
    dog.recentLogs.push(logData._id);
  }

  try {
    await dog.save();
  } catch (e) {
    throw new Error("Unable to update dog");
  }

  const log = new Log(logData);
  try {
    await log.save();
  } catch (e) {
    throw new Error("Unable to create log");
  }

  return log._id;
}
