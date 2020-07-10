const router = require("express").Router();
const protected = require("./verifyToken");
const Song = require("../models/Song");
const { db } = require("../models/Song");

// Fetch all songs.
router.get("/songs", protected, (req, res) => {
  Song.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(result);
    }
  });

  // res.status(200).json(fetchedSongs);
});

// Add song
router.post("/songs/add", protected, async (req, res) => {
  const {
    artist_name,
    cover_image,
    video_url,
    song_name,
    ratings_number,
    rating,
    lyrics,
  } = req.body;

  let newSong = new Song({
    artist_name: artist_name,
    cover_image: cover_image,
    video_url: video_url,
    song_name: song_name,
    ratings_number: ratings_number,
    rating: rating,
    lyrics: lyrics,
  });

  try {
    const savedSong = await newSong.save();
    res.status(200).send(savedSong);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
