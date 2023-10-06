import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_CONNECTION_STRING = `${DB_URL}${DB_NAME}?retryWrites=true&w=majority`
const DB_OPTS = {
  bufferCommands: false,
};

export const DB_INFO = { DB_URL, DB_NAME, DB_CONNECTION_STRING, DB_OPTS };

if (!DB_URL || !DB_NAME) {
  throw new Error(
    "Please define the DB_URL and DB_NAME environment variable inside .env*.local",
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {


    cached.promise = mongoose
      .connect(DB_CONNECTION_STRING, DB_OPTS)
      .then((mongoose) => {
        mongoose.set('debug', process.env.NODE_ENV === 'development')

        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
