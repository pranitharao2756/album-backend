module.exports = app => {
  const albums = require("../controllers/album.controller.js");
  const tracks = require("../controllers/track.controller.js");
  var router = require("express").Router();
  // Create a new Album
  router.post("/", albums.create);

  // Create a new Track
  router.post("/:albumid/tracks", tracks.createTrack);

  //Find tracks present in an album
  router.get("/:albumid/tracks", tracks.findTracks);

  router.get("/:albumid/tracks/:trackid", tracks.findOne);

  router.put("/:albumid/tracks/:trackid", tracks.update);

  // Retrieve all Albums
  router.get("/", albums.findAll);
  
  // Retrieve a single album with id
  router.get("/:id", albums.findOne);
  // Update a album with id
  router.put("/:id", albums.update);
  // Delete a album with id
  router.delete("/:id", albums.delete);
  // Delete all albums
  router.delete("/", albums.deleteAll);
  app.use('/api/albums', router);
};