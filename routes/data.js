const router = require('express').Router();
const protected = require('./verifyToken');
const Song = require('../models/Song');
const { db } = require('../models/Song');
const { v4: uuidv4 } = require('uuid');
var multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

// Fetch all songs.
router.get('/songs', protected, (req, res) => {
  Song.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(result);
    }
  });

  // res.status(200).json(fetchedSongs);
});

// Upload cover test
router.post('/songs/cover/upload', upload.single('coverFile'), (req, res) => {
  res.send(req.file);
});

router.post('/songs/video/upload', upload.single('videoFile'), (req, res) => {
  res.send(req.file);
});

// Add song
router.post('/songs/add', protected, async (req, res) => {
  // Upload song cover

  // Initialize song
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