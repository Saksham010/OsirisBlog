import {useState} from "react";
// import {validator} from "validator";
export default function Signup(){

    const [userData, setUserData] = useState({
        username: "", email: "", password: ""
    });

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

    function handleClick(event){
        event.preventDefault();

        // if(validator.isEmail(userData.email)){
        //     alert("The email is not valid");
        // }
        // else{
        //     alert("Valid email");
        // }

        console.log(userData);

        const url = "127.0.0.1/submit";
        fetch(url,{
            Method : 'POST',
            Body : userData
        }).then(data=>{
            console.log(data);
        });
    }

    return(
        <>
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