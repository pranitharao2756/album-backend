const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/../album-frontend/Images',express.static('./../album-frontend/Images'));

app.use('/../album-frontend/Images/artists',express.static('./../album-frontend/Images/artists'));
// set up database 
const db = require("./app/models");
db.sequelize.sync();
// for devel to recreate each time database 
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/albumdata.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});