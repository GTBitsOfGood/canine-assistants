import dbConnect from "../dbConnect";
import Log from "../models/Log";
import Dog from "../models/Dog";
import { updateHasUnresolved } from "./Dog";

export async function getLogs(filter = {}) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to get logs at this time, please try again");
  }
  return Log.find(filter).populate("author");
}

export async function getLogById(id) {
  try {
    await dbConnect();
    return Log.findById(id);
  } catch (e) {
    throw new Error("Unable to get log at this time, please try again");
  }
}

export async function createLog(logData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to create log at this time, please try again");
  }

  const log = new Log(logData);
  try {
    await log.save();
    await updateHasUnresolved(logData.dog, 1);
  } catch (e) {
    throw new Error(e);
    //throw new Error("Unable to create log");
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
/**
Updates a log
@param {*} logId ObjectId of log to update
@param {*} logData Object with log updates
*/
export async function updateLog(logId, logData) {
  let log;
  try {
    await dbConnect();
    log = await Log.findById(logId);
  } catch (e) {
    throw new Error("Unable to update log, please try again");
  }

  // Update hasUnresolved attribute on dog if resolved status changes
  try {
    if (logData.resolved !== undefined) {
      if (logData.resolved && !log.resolved) {
        // resolving so decrease unresolved
        await updateHasUnresolved(log.dog, -1);
      } else if (!logData.resolved && log.resolved) {
        // unresolving so increase unresolved
        await updateHasUnresolved(log.dog, 1);
      }
    }
    return await Log.findByIdAndUpdate(logId, logData, {
      returnDocument: "after",
    });
  } catch (e) {
    throw new Error("Unable to update dog");
  }
}
/**
 * Deletes log and removes from recentLogs array if applicable
 * and adds next most recent log to array
 * @param {*} logID ObjectId of log to delete
 * @returns id of deleted log if success, error if otherwise
 */
export async function deleteLog(logId) {
  try {
    await dbConnect();

    const deletedLog = await Log.findById(logId).populate("dog");

    if (!deletedLog) {
      throw new Error("Invalid log ID");
    }

    if (!deletedLog.resolved) {
      // if unresolved, decrease unresolved count
      await updateHasUnresolved(deletedLog.dog, -1);
    }

    const dog = deletedLog.dog;
    let index = dog.recentLogs.indexOf(logId);

    if (index == -1) {
      return (await Log.findByIdAndDelete(logId))._id;
    } else {
      // Find all logs for this dog and sort reverse to get max
      const logArray = await Log.aggregate([
        {
          $match: {
            dog: dog._id,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      // Push next most recent log if it exists
      if (logArray.length > dog.recentLogs.length) {
        const mostRecentLogId = logArray[dog.recentLogs.length]._id;

        await Dog.findByIdAndUpdate(dog._id, {
          $push: { recentLogs: mostRecentLogId },
        });
      }

      // Remove deleted log from recentLog array
      await Dog.findByIdAndUpdate(dog._id, {
        $pull: { recentLogs: logId },
      });

      return (await Log.findByIdAndDelete(logId))._id;
    }
  } catch (e) {
    throw new Error(e);
  }
}
