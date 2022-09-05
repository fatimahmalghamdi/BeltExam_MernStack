const Pet = require("../models/pet.model")

//get all Pets:
function getallPets(req, res){
    Pet.find()
    .then(allpets => res.json({
        records_count: allpets.length,
        pets: allpets
    }))
    .catch(err => res.json({errorMsg: "Faild to fetch the pets data"}))
}

//add new Pet:
function addnewPet (req, res) {
    Pet.create(req.body)
        .then(newlycreatedPet => res.json({thePet: newlycreatedPet}))
        .catch(error => res.status(400).json({error}))
}

//get Pet by id:
function getPetById(req, res){
    const { pet_id } = req.params;
    Pet.find({_id: pet_id})
    .then(thePet => res.json({
        Pet: thePet
    }))
    .catch(err => res.json({errorMsg: "Faild to fetch the Pet info"}))
}

//update Pet by id:
function updatePetById (req, res) {
    const { pet_id } = req.params;
    Pet.updateOne({_id: pet_id}, req.body)
        .then(updatePet => res.json(updatePet))
        .catch(error => res.json({error}))
}

//delete Pet by id:
function deletePetById (req, res) {
    const { pet_id } = req.params;
    Pet.deleteOne({_id: pet_id})
        .then((result) => res.json(result))
        .catch(err => res.json({error: true, message: "Faild to delete Pet"}))
}


module.exports = {
    getallPets,
    addnewPet,
    getPetById,
    updatePetById,
    deletePetById
}