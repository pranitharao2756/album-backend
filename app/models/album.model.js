module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    }
  );
  const Track = require("./tracks.model.js")(sequelize, Sequelize);
  Track.belongsTo(Album)
  return {Album,Track};
};