const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  artist_name: {
    type: String,
    requried: true,
    min: 6,
    max: 100,
  },

  cover_image: {
    type: String,
    requried: true,
  },

  video_url: {
    type: String,
    requried: true,
  },

  song_name: {
    type: String,
    requried: true,
    min: 6,
    max: 100,
  },
  ratings_number: {
    type: Number,
    requried: true,
  },
  rating: {
    type: Number,
    requried: true,
  },
  lyrics: {
    type: String,
    requried: true,
    min: 10,
    max: 20000,
  },
});

module.exports = mongoose.model("Song", songSchema);
