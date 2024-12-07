import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
  throw new Error("Please define MONGODB_URI and MONGODB_DB environment variables inside .env.local");
}

const client = new MongoClient(process.env.MONGODB_URI);

const dbName = process.env.MONGODB_DB;

let isConnected = false;

export async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  const db = client.db(dbName);
  return { db, client };
}
