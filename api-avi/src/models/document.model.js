const mongoose = require("mongoose");

const uploadDocumentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    hairstyle: {
        type: mongoose.Schema.ObjectId,
        ref:"Hairstyle" 
    },
    picture: {
        type: String
    },
});

const Document = mongoose.model("Document", uploadDocumentSchema);

module.exports = Document;