const mongoose = require("mongoose");

const uploadPhotoSchema = mongoose.Schema({
    title: {
        type:String
    },
    picture: {
        type: String
    },
});

const Photo = mongoose.model("Photo", uploadPhotoSchema);

module.exports = Photo;