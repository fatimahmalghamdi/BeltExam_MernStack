import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

function PetDetails (props){
    const history= useHistory();
    const [pet, setPet] = useState({});
    const { pet_id } = useParams();
    

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/"+pet_id)
        .then(res => {console.log(res.data.Pet[0]);
                        setPet(res.data.Pet[0]);
        })
        .catch(err => console.log(err))
    },[])

    function handledelete(event, pet_id){
        event.preventDefault();
        axios.delete("http://localhost:8000/api/pets/delete/"+pet_id)
            .then(res => { 
                console.log(res);
                history.push("/");
            })
            .catch(error => console.log(error));
    }

    return(
        <div >
            <h2>Pet Shelter</h2>
            <h5><Link to={"/"}>back to home</Link></h5>
            <div>
                <div className="mycontainer">
                    <h5>Details about: {pet.pet_name}</h5>
                    <h5>Type: {pet.pet_type}</h5>
                    <h5>Description: {pet.pet_desc}</h5>
                    <h5>Skills: 
                        <p>{pet.skill1}</p>
                        <p>{pet.skill2}</p>
                        <p>{pet.skill3}</p>
                    </h5>
                </div>
            </div>
            <div>
                <form onSubmit={(event) => handledelete(event, pet._id)}>
                    <button className="btn btn-primary mx-2">Adopt {pet.pet_name}</button>
                </form>
            </div>
        </div>

    );

}

export default PetDetails;