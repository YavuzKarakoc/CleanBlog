const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PhotoSchema = new Schema({
  title: String,
  detail: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);
module.exports = Photo;