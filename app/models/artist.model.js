module.exports = (sequelize, Sequelize) => {
    const Artist = sequelize.define("artist", {
      artistimage:{
        type:Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }  
      }
    );
    return Artist;
  };
