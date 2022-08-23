import {useState } from "react";

export default function Login(){
    const [userData, setUserData] = useState({
       email: "", password: ""
    });

    // console.log(userData);

    function handleChange(e){

        // console.log(e.target);

        if(e.target.placeholder == "email"){
            setUserData(obj =>{
                return {
                    ...obj,
                    email: `${e.target.value}`
                }
            })
        }
        else{
            setUserData(obj =>{
                return {
                    ...obj,
                    password: `${e.target.value}`
                }
            })
        }

    }

    function handleClick(event){
        event.preventDefault();

        // if(validator.isEmail(userData.email)){
        //     alert("The email is not valid");
        // }
        // else{
        //     alert("Valid email");
        // }

        console.log(userData);

    }

    return(
        <>
            <form>
                <h1>Login</h1>

                <div>
                    <label>Email : </label>
                    <input type="text" placeholder="email" onChange={handleChange} value={userData.email}></input>
                </div>

                <div>
                    <label>Password : </label>
                    <input type="text" placeholder="password" onChange={handleChange} value={userData.password} ></input>
                </div>

                <button onClick={handleClick} >Login</button>

                
            </form>
        </>

    )






}