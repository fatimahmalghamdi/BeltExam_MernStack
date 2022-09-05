import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom"

function UpdatePet (props){
    const history= useHistory();
    const { pet_id } = useParams();
    const [myflag, setMyflag] = useState(false);
    const [pet, setPet] = useState({});
    const [createdSuccess, setCreatedSuccess] = useState(false);
    const [theErrors, setTheErrors] = useState([]);
    const skills =[];

    //fetch the info about pet:
    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/"+pet_id)
        .then(res => {console.log(res.data.Pet[0]);
                        setPet(res.data.Pet[0]);
        })
        .catch(err => console.log(err))
    },[])


    function handleChange(event){
        setPet({...pet, [event.target.name]: event.target.value});
    }


    //Update function:
    function handleSubmit (event){
        event.preventDefault();
        setCreatedSuccess(false);
        setTheErrors([]);
        //update the pet:
        axios.put("http://localhost:8000/api/pets/update/"+pet_id, pet)
                .then(res => {
                    console.log(res);
                    setCreatedSuccess(true);
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
    }

    return(
        <div>
                <h2>Pet Shelter</h2>
                <h5><Link to={"/"}>back to home</Link></h5>
                <h5>Edit {pet.pet_name}</h5>
                {theErrors.map((err,index) => 
                    (<div style={{color: "red"}} key={index}>Error: {err}</div>)
                )}
                {createdSuccess && <div style={{color: "green"}}> The pet has been updated successfully</div>}

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
                                <input type="text" className="form-control" name="skill1"
                                value={pet.skill1} onChange={handleChange}/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label">Skill 2: </label>
                                <input type="text" className="form-control" name="skill2"
                                value={pet.skill2} onChange={handleChange}/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label">Skill 3: </label>
                                <input type="text" className="form-control" name="skill3"
                                value={pet.skill3} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button className="btn btn-primary mx-2">Edit pet</button>
                    </div>
                </form>
        </div>

    );

}

export default UpdatePet;