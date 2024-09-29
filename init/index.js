const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/agritech";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Updated initDB function with error handling
const initDB = async () => {
  try {
    // Delete existing data from the 'listings' collection
    await Listing.deleteMany({});
    
    // Insert new data from data.js
    await Listing.insertMany(initData.data);
    
    // Log success message
    console.log("data was initialized");
  } catch (error) {

    console.error("Error initializing data:", error);
  }
};

initDB();
