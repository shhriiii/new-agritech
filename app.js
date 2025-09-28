// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path = require("path");
// // //for put req
// // const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// require("dotenv").config(); // for GEMINI_API_KEY in .env

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// app.use(express.json()); // for JSON POST from frontend



// const MONGO_URL ="mongodb://127.0.0.1:27017/agritech"
// main()
// .then(()=>{
//     console.log("cnntn succesfull");
// })
// .catch((err) => console.log(err));
// async function main() {
//     await mongoose.connect(MONGO_URL);
//   }
//   app.set("view engine" , "ejs");
//   app.set("views" , path.join(__dirname, "views"));
//   app.use(express.urlencoded({extended:true}));
//     //for rjs mate 
//     app.engine('ejs', ejsMate);
//     //for css
//     app.use(express.static(path.join(__dirname, "/public")));
//   //creating api
//   app.get("/" , (req , res) =>{
//     //res.send("hello world");
//     res.render("listings/home.ejs");

//   });
//   // creating a new listing
  
//   //index
//   app.get("/listings" , async(req,res) =>{
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs" , {allListings});
 
//  });
//  app.get("/listings/blog" , async(req,res) =>{
//   const allListings = await Listing.find({});
//   res.render("listings/blog.ejs" , {allListings});
// });

// app.get("/listings/subsidy" , async(req,res) =>{
//   res.render("listings/subsidy.ejs");
// });

// app.get("/listings/drone" , async(req,res) =>{
//   res.render("listings/drone.ejs");
// });

// app.get("/listings/chatbot", (req, res) => {
//   res.render("listings/chatbot.ejs");
// });
//  //show route

// // Show specific listing page
// app.get("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/show.ejs", { listing });
// });

// // Show specific listing blog page
// app.get("/listings/:id/blog", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/showblog.ejs", { listing });
// });
// app.get("/terms", async (req, res) => {
 
//   res.render("listings/terms.ejs");
// });

// app.post("/chatbot/query", async (req, res) => {
//   const { query } = req.body;

//   try {
//     // Step 1: Fetch data from MongoDB
//     const listings = await Listing.find({});
// const context = listings.map(item =>
//   `Disease: ${item.Disease}
// Observation: ${item.Observation}
// Solution: ${item.Solution}
// Price: ${item.Price}
// Dose: ${item.Dose}

// Blog Title: ${item.BlogTitle}
// Blog Headline: ${item.BlogHead}
// Blog Summary: ${item.BlogPara}`
// ).join("\n\n");


//     // Step 2: Get model (change to gemini-2.0-flash if needed)
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//     // Step 3: Use correct payload format for v1beta
//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `You are an agricultural assistant chatbot.

// You have access to a knowledge base containing crop disease info and agriculture blog articles.

// Use ONLY the **most relevant** blog or disease entry from the data below to answer the user's question. 
// Do not list multiple articles or diseases. Summarize as if you're writing a helpful reply.
// if they ask any other question which is not related to agriculture or not present in database then say "I am sorry I can only answer questions related to agriculture".

// Knowledge Base:
// ${context}

// User Question: ${query}`

//             }
//           ]
//         }
//       ]
//     });

//     // Step 4: Return Gemini response
//     const response = result.response.text();
//     res.json({ response });

//   } catch (error) {
//     console.error("Gemini Error:", error);
//     res.status(500).json({ response: "❌ Something went wrong while generating the answer." });
//   }
// });





  
//   //server on
//   app.listen(8080 , () =>{
//     console.log("server is running on port 8080")
//   });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const { GoogleGenerativeAI } = require('@google/generative-ai');
require("dotenv").config(); // for GEMINI_API_KEY in .env

// ---------- Error Handling Utilities ----------
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const catchAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

// ---------- Gemini Config ----------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------- MongoDB Connection ----------
const MONGO_URL = "mongodb://127.0.0.1:27017/agritech";
main()
  .then(() => {
    console.log("✅ MongoDB connection successful");
  })
  .catch((err) => console.log("❌ MongoDB error:", err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// ---------- App Config ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// ---------- Routes ----------

// Home
app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});

// All listings
app.get("/listings", catchAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// Blog listing
app.get("/listings/blog", catchAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/blog.ejs", { allListings });
}));

// Subsidy page
app.get("/listings/subsidy", (req, res) => {
  res.render("listings/subsidy.ejs");
});

// Drone page
app.get("/listings/drone", (req, res) => {
  res.render("listings/drone.ejs");
});

// Chatbot page
app.get("/listings/chatbot", (req, res) => {
  res.render("listings/chatbot.ejs");
});

// Show specific listing
app.get("/listings/:id", catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError("Listing not found!", 404);
  res.render("listings/show.ejs", { listing });
}));

// Show blog for a listing
app.get("/listings/:id/blog", catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError("Blog not found!", 404);
  res.render("listings/showblog.ejs", { listing });
}));

// Terms page
app.get("/terms", (req, res) => {
  res.render("listings/terms.ejs");
});

// Chatbot API
app.post("/chatbot/query", catchAsync(async (req, res) => {
  const { query } = req.body;

  // Fetch knowledge base
  const listings = await Listing.find({});
  if (!listings.length) {
    throw new ExpressError("Knowledge base is empty", 500);
  }

  const context = listings.map(item =>
    `Disease: ${item.Disease}
Observation: ${item.Observation}
Solution: ${item.Solution}
Price: ${item.Price}
Dose: ${item.Dose}

Blog Title: ${item.BlogTitle}
Blog Headline: ${item.BlogHead}
Blog Summary: ${item.BlogPara}`
  ).join("\n\n");

  // Call Gemini API
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an agricultural assistant chatbot.

You have access to a knowledge base containing crop disease info and agriculture blog articles.

Use ONLY the **most relevant** blog or disease entry from the data below to answer the user's question. 
Do not list multiple articles or diseases. Summarize as if you're writing a helpful reply.
If they ask any other question which is not related to agriculture or not present in database then say "I am sorry I can only answer questions related to agriculture".

Knowledge Base:
${context}

User Question: ${query}`
          }
        ]
      }
    ]
  });

  const response = result.response.text();
  res.json({ response });
}));

// ---------- Error Handling ----------

// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("layouts/error.ejs", { err });
});

// ---------- Start Server ----------
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
