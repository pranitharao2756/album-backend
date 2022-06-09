const db = require("../models");
const multer = require("multer");
const path = require("path");
const Artist = db.artists;
const Op = db.Sequelize.Op;
// Create and Save a new Artist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Create an Artist
  const artist = {
    name: req.body.name,
    artistimage:req.file.path
  };
  // Save Artist in the database
  Artist.create(artist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Album."
      });
    });
};

// Find a single artist with an id
exports.findOne = (req, res) => {
  const id = req.params.artistid;
    Artist.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find artist with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

const storage = multer.diskStorage({
  destination: (req,file,callback) =>{
    callback(null,"../album-frontend/Images/artists");
  },
  filename: (req,file,callback) =>{
      callback(null, Date.now() + path.extname(file.originalname));
  }
})

exports.upload = multer({
storage: storage,
limits: { fileSize: '5000000'},
fileFilter: (req,file,callback) =>{
const fileType = /jpeg|jpg|png/
const mimeType = fileType.test(file.mimetype);
const extname = fileType.test(path.extname(file.originalname))
if(mimeType && extname){
  return callback(null,true)
}
callback("File format not supported")
}
}).single('artistimage')
