module.exports = app => {
  const albums = require("../controllers/album.controller.js");
  const tracks = require("../controllers/track.controller.js");
  const artists = require("../controllers/artist.controller.js");

  var router = require("express").Router();
  // Create a new Artist
  router.post("/",artists.upload,artists.create);


  //Delete API for artists
  router.delete("/", artists.deleteAll);

  router.delete("/:id",artists.delete)

  // Retrieve all artists
  router.get("/", artists.findAll);
  
    // Retrieve artist with artist id
  router.get("/:artistid", artists.findOne);

  //Update artist information.
  router.put("/:id", artists.upload,artists.update);

  // Create a new Track
  router.post("/:albumid/tracks", tracks.createTrack);

   // Create a new Artist
  router.post("/artists",artists.upload,artists.create);

  // Retrieve a single artist with id
  router.get("/artists/:artistid", artists.findOne);

  //Find tracks present in an album
  router.get("/:albumid/tracks", tracks.findTracks);

  router.get("/:albumid/tracks/:trackid", tracks.findOne);

  router.put("/:albumid/tracks/:trackid", tracks.update);

  router.delete("/:albumid/tracks",tracks.deleteAll);

  router.delete("/:albumid/tracks/:trackid",tracks.delete);

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
  app.use('/api/artists', router);
};