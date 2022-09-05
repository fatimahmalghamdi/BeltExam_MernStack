import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";


function ListPets (props) {
    const history = useHistory();
    const [petList, setPetList] = useState([]);
    const [myflag, setMyflag] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then(res => {
                console.log(res.data.pets);
                setPetList(res.data.pets)}
                )
            .catch(err => console.log(err))
        console.log("hello");
    }, [])


    // function handledelete(author_id){
    //     axios.delete("http://localhost:8000/api/authors/delete/"+author_id)
    //         .then(res => {
    //             setAuthorList(authorList.filter((u) => u._id !== author_id));
    //         })
    // }


    return (
        <div style={{ margin: "auto", width: "700px", marginTop: "30px"}}>
            <h2>Pet Shelter</h2>
            <h4>These pets are looking for a good home</h4>
            <h5><Link to={"/new"}>Add a pet to the shelter</Link></h5>
            <table width= "100%" className="table">
                <thead className="table-dark">
                    <tr>
                        <td>Name</td>
                        <td>type</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {petList.map((pet,i) => (
                        <tr key={pet._id}>
                            <td>{pet.pet_name}</td>
                            <td>{pet.pet_type}</td>
                            <td>
                                <Link to={"/details/"+pet._id}>Details </Link>
                                |
                                <Link to={"/update/"+pet._id}> Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ListPets;