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

    // Create a new Album
  router.post("/:artistid/albums", albums.upload,albums.create);
  
  // Retrieve album with album id
  router.get("/:artistid/albums/:albumid", albums.findOne);

  // Retrieve all albums assigned to artist
  router.get("/:artistid/albums", albums.findAlbums);
  
  //Search album
  router.get("/:artistid/search/:title", albums.findAll);

  router.get("/albums/:albumid",albums.findOne);
  
  //Update album information
  router.put("/:artistid/albums/:albumid", albums.upload,albums.update);

  //Delete rest API for albums
  router.delete("/albums/:id",albums.delete)

  router.delete("/albums/delete/all",albums.deleteAll)

  // Create a new Track
  router.post("/albums/:albumid/tracks", tracks.createTrack);

  

  //Find tracks present in an album
  router.get("/albums/:albumid/tracks", tracks.findTracks);

  //Find a track with trackid.
  router.get("/albums/:albumid/tracks/:trackid", tracks.findOne);

  //Update track information
  router.put("/albums/:albumid/tracks/:trackid", tracks.update);

  //Delete rest api for tracks
  router.delete("/albums/:albumid/tracks",tracks.deleteAll);

  router.delete("/albums/:albumid/tracks/:trackid",tracks.delete);
  
  app.use('/api/artists', router);
};