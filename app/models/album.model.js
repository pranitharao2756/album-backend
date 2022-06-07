module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    image:{
      type:Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    }
  );
  const Track = require("./tracks.model.js")(sequelize, Sequelize);
  const Artist = require("./artist.model.js")(sequelize, Sequelize);
  Track.belongsTo(Album)
  Album.belongsTo(Artist)
  return {Album,Track,Album};
};