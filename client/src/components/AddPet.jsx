import React, {useState} from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom"

function AddPet (props){
    const history= useHistory();
    const [pet, setPet] = useState({
        pet_name: "",
        pet_type: "",
        pet_desc: "",
        skill1: "",
        skill2: "",
        skill3:"",
        pet_likes: 0
    });
    const [createdSuccess, setCreatedSuccess] = useState(false);
    const [theErrors, setTheErrors] = useState([]);
    
    //Handle the inputs:
    function handleChange(event){
        setPet({...pet, [event.target.name]: event.target.value});
    }

    // Add new pet function:
    function handleSubmit (event){
        event.preventDefault();
        setCreatedSuccess(false);
        setTheErrors([]);

        axios.post("http://localhost:8000/api/pets/new", pet)
                .then(res => {
                    console.log(res);
                    setCreatedSuccess(true);
                    history.push("/");
                })
                .catch(err => {
                    console.log(err.response.data.error.message);
                    const mydata = err.response.data;
                    const errorMessages = [];
                    if ("error" in mydata){
                        errorMessages.push(mydata.error.message); 
                        }
                    setTheErrors(errorMessages);
                })

                // if (theErrors.length == 0)
                //     history.push("/");
    }

    return(
        <div>
                <h3>Add pet</h3>
                <h5><Link to={"/"}>back to home</Link></h5>
                {theErrors.map((err,index) => 
                    (<div style={{color: "red"}} key={index}>Error: {err}</div>)
                )}
                {createdSuccess && <div style={{color: "green"}}> The pet has been added successfully</div>}

                <form onSubmit={handleSubmit} style={{width: "400px", margin: "auto"}}>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div className="leftside">
                            <div className="form-outline mb-4">
                                <label className="form-label">Pet Name: </label>
                                <input type="text" name="pet_name" className="form-control" 
                                value={pet.pet_name} onChange={handleChange} />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label">Pet Type: </label>
                                <input type="text" name="pet_type" className="form-control" 
                                value={pet.pet_type} onChange={handleChange} />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label">Pet Description: </label>
                                <input type="text" name="pet_desc" className="form-control" 
                                value={pet.pet_desc} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="rightside">
                            <div className="form-outline mb-4">
                                <label className="form-label">Skill 1: </label>
                                <input type="text" className="form-control" 
                                value={pet.skill1} name="skill1" onChange={handleChange}/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label">Skill 2: </label>
                                <input type="text" className="form-control" 
                                value={pet.skill2} name="skill2" onChange={handleChange} />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label">Skill 3: </label>
                                <input type="text" className="form-control" 
                                value={pet.skill3} name="skill3" onChange={handleChange}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button className="btn btn-primary mx-2">Add pet</button>
                    </div>
                </form>
        </div>

    );

}

export default AddPet;