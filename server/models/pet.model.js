const mongoose = require("mongoose")

const PetSchema = mongoose.Schema({
    pet_name: {
        type: String,
        minLength: [3, "The length should be more than 3 char"],
        required: true
    },
    pet_type: {
        type: String,
        minLength: [3, "The length should be more than 3 char"],
        required: true
    },
    pet_desc: {
        type: String,
        minLength: [3, "The length should be more than 3 char"],
        required: true
    },
    skill1: String,
    skill2: String,
    skill3: String,
    pet_likes: Number
})

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet; 