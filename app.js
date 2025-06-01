const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
// //for put req
// const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const MONGO_URL ="mongodb://127.0.0.1:27017/agritech"
main()
.then(()=>{
    console.log("cnntn succesfull");
})
.catch((err) => console.log(err));
async function main() {
    await mongoose.connect(MONGO_URL);
  }
  app.set("view engine" , "ejs");
  app.set("views" , path.join(__dirname, "views"));
  app.use(express.urlencoded({extended:true}));
    //for rjs mate 
    app.engine('ejs', ejsMate);
    //for css
    app.use(express.static(path.join(__dirname, "/public")));
  //creating api
  app.get("/" , (req , res) =>{
    //res.send("hello world");
    res.render("listings/home.ejs");

  });
  // creating a new listing
  
  //index
  app.get("/listings" , async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
 
 });
 app.get("/listings/blog" , async(req,res) =>{
  const allListings = await Listing.find({});
  res.render("listings/blog.ejs" , {allListings});
});

app.get("/listings/subsidy" , async(req,res) =>{
  res.render("listings/subsidy.ejs");
});

app.get("/listings/drone" , async(req,res) =>{
  res.render("listings/drone.ejs");
});
 //show route

// Show specific listing page
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Show specific listing blog page
app.get("/listings/:id/blog", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/showblog.ejs", { listing });
});
app.get("/terms", async (req, res) => {
 
  res.render("listings/terms.ejs");
});

  
  //server on
  app.listen(8080 , () =>{
    console.log("server is running on port 8080")
  });