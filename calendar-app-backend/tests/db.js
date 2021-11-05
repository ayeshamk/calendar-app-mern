// const mongoose = require("mongoose");
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;

module.exports.connect = async () => {
  mongod = await MongoMemoryServer.create({ binary: { version: "4.2.8" } });
  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose
    .connect(uri, mongooseOpts)
    .then(() => {
      console.log("==============MEMORY DB CONNECTED==============");
    })
    .catch((err) => {
      console.log("------------------ DB CONNECTION ERROR: ", err);
    });
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
