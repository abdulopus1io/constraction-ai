// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then((connection) => {
      console.log("MongoDB connected in development environment");
      return connection;
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      throw error;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((connection) => {
    console.log("MongoDB connected in production environment");
    return connection;
  }).catch((error) => {
    console.error("MongoDB connection error:", error);
    throw error;
  });
}

// Add the named export for connectMongoDB
export const connectMongoDB = () => clientPromise;

export default clientPromise;
