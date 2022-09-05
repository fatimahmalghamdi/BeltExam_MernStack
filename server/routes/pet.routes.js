const PetController = require("../controllers/pet.controller")

function registerPetRoutes(app)
{
    app.get("/api/pets", PetController.getallPets)
    app.post("/api/pets/new", PetController.addnewPet)
    app.get("/api/pets/:pet_id", PetController.getPetById)
    app.put("/api/pets/update/:pet_id", PetController.updatePetById)
    app.delete("/api/pets/delete/:pet_id", PetController.deletePetById)
}

module.exports = registerPetRoutes