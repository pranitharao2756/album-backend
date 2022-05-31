const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
var temp = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
temp = require("./album.model.js")(sequelize,Sequelize);
db.albums = temp.Album;
db.tracks = temp.Track;
db.artists = temp.Artist;
module.exports = db;