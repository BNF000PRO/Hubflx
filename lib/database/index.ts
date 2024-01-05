import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("debug", true);

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'hubflix',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB:", MONGODB_URL);

  return cached.conn;
}
