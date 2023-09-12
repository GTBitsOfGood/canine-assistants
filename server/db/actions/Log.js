import dbConnect from "../dbConnect";
import Log from "../models/Log";

export async function createLog(logData) {
  await dbConnect();
  const log = new Log(logData);
  try {
    await log.save();
  } catch (e) {
    throw new Error("Unable to create log");
  }

  return log._id;
}
