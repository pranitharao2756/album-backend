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

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Artist.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
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

// Delete a Artist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  
  Artist.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Artist was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Artist with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Artist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Artists were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all artists."
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
