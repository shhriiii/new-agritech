const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    Disease:{ 
        type: String,
        required: true
    },
    Observation : { 
        type: String,
        required: true
    },
    Image: {
        type: String,
        default: "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v ==="" ? "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    Solution:{ 
        type: String,
        required: true

    },
    Price: { 
        type: String,
        required: true
    },
    Dose:{ 
        type: String,
        required: true
    },
    BlogImage: {
        type: String,
        default: "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v ==="" ? "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    BlogTitle:{
        type: String,
        required: true
    },
    BlogHead:{
        type: String,
        required: true
    },
    BlogPara:{
        type: String,
        required: true
    },

})

//export
const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
// This code defines a Mongoose schema for a "Listing" model, which includes fields for disease information, observations, images, solutions, prices, doses, and blog-related content. The schema enforces required fields and provides