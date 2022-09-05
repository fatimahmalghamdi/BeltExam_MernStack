const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/pet_shelter_db")
.then(() => console.log("successfully conneted to the db"))
.catch(err => console.log("faild to connect to the database"))