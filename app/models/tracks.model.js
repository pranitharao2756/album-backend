module.exports = (sequelize, Sequelize) => {
    const Track = sequelize.define("track", {
      title: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      category:
      {
          type:Sequelize.STRING
      },
        
      }
    );
    return Track;
  };
