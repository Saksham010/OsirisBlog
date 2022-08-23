import {useEffect, useState} from "react";
// import {validator} from "validator";
import { Navigate } from "react-router-dom";

export default function Signup(){

    const [userData, setUserData] = useState({
        username: "", email: "", password: ""
    });

    const [redirectLogin, setRedirectLogin] = useState(false);
    // console.log(userData);

    function handleChange(e){

        // console.log(e.target);

        if(e.target.placeholder == "username"){
            setUserData(obj =>{
                return {
                    ...obj,
                    username: `${e.target.value}`
                }
            })
        }

        else if(e.target.placeholder == "email"){
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
    const [testState,setTestState] = useState(0); //For useEffect

    function getData(){
        fetch("/submit",{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(userData)
        }).then(data=>data.json().then(JsonData=>{
            console.log("Server Response: ",JsonData);

        }));
        // const JsonData  = await data.json();
        // console.log("Server Response: ",JsonData);
    }


    useEffect(()=>{
        console.log("running");
        if(userData.username != "" && userData.email != "" && userData.password != "" ){
            getData();
            setRedirectLogin(true);
        }
        //Resetting userData
        setUserData(obj=>{
            return {
                ...obj,
                username : "",
                email : "",
                password : ""
            }
        })
    },[testState])

    function handleClick (event){
        event.preventDefault();

        // if(validator.isEmail(userData.email)){
        //     alert("The email is not valid");
        // }
        // else{
        //     alert("Valid email");
        // }

        // console.log(userData);

        setTestState(data => data+1);

    }

    return(
        <>
            {redirectLogin && <Navigate to='/login'/>}

            <form>
                <h1>Sign Up</h1>

                <div>
                    <label>Username : </label>
                    <input type="text" placeholder="username" onChange={handleChange} value={userData.username }  ></input>
                </div>

                <div>
                    <label>Email : </label>
                    <input type="text" placeholder="email" onChange={handleChange} value={userData.email}></input>
                </div>

                <div>
                    <label>Password : </label>
                    <input type="text" placeholder="password" onChange={handleChange} value={userData.password} ></input>
                </div>

                <button onClick={handleClick} >Signup</button>

                
            </form>
        </>

    )





}