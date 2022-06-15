const db = require("../models");
const multer = require("multer");
const path = require("path");
const Album = db.albums;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  const artistid = req.params.artistid;
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Album
  const album = {
    title: req.body.title,
    description: req.body.description,
    image:req.file.path,
    artistId:artistid
  };
  // Save Album in the database
  Album.create(album)
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
// Retrieve all Albums from the database.
exports.findAll = (req, res) => {
  const title = req.params.title;
  var condition = { title: { [Op.like]: `%${title}%` },artistId:req.params.artistid } ;
  Album.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};
// Find a single album with an id
exports.findOne = (req, res) => {
  const id = req.params.albumid;
  Album.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find album with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving album with id=" + id
      });
    });
};
// Update a Album by the id in the request
exports.update = (req, res) => {
  const id = req.params.albumid;
    var data = {}
    if(req.file !== undefined)
    {
        data.image = req.file.path;
    }
    
    data.title = req.body.title;
    data.description = req.body.description
  Album.update(data, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Album was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Album with id=${id}. Maybe Album was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Album with id=" + id
      });
    });
};
// Delete a Album with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Album.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Album was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Album with id=${id}. Maybe Album was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Album with id=" + id
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
  Album.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Albums were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all albums."
      });
    });
};

exports.findAlbums = (req, res) => {
  const artistid = req.params.artistid
  Album.findAll({ where: { artistId: artistid } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Albums."
    });
  });
};

const storage = multer.diskStorage({
  destination: (req,file,callback) =>{
    callback(null,"../album-frontend/Images");
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
}).single('image')
