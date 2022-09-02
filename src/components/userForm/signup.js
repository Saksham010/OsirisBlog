import {useEffect, useState} from "react";
// import {validator} from "validator";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {database} from "../../firebaseConfig";
import {collection, addDoc,getDocs} from "firebase/firestore";
export default function Signup(){
    //Cookie
    const [cookies,setCookie] = useCookies(['userId']);

    const[isLoggedIn,setIsLoggedIn] = useState(false);

    //Database Collection
    const  collectionRef = collection(database, 'Users');

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
    // const [testState,setTestState] = useState(0); //For useEffect

    // function getData(){
    //     fetch('/myserver',{
    //         method : 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body : JSON.stringify(userData)
    //     }).then(data=>data.json().then(JsonData=>{
    //         console.log("Server Response: ",JsonData);

    //     }));
    //     // const JsonData  = await data.json();
    //     // console.log("Server Response: ",JsonData);
    // }


    // useEffect(()=>{
    //     console.log("running");
    //     if(userData.username != "" && userData.email != "" && userData.password != "" ){
    //         getData();
    //         setRedirectLogin(true);
    //     }
    //     //Resetting userData
    //     setUserData(obj=>{
    //         return {
    //             ...obj,
    //             username : "",
    //             email : "",
    //             password : ""
    //         }
    //     })
    // },[testState])


    //Fetch data from firebase and save it in state
    const [fetchedUserData,setfetchedUserData] = useState([]);
    
    useEffect(()=>{
        //Check if user is logged in
        if(cookies.sessionId != null || cookies.sessionId != undefined){
            alert("Already logged in. See ya");
            setIsLoggedIn(true);
        }

        getDocs(collectionRef).then((response)=>{
            const testarr = [];
            response.docs.map((item)=>{
                const obj = item.data();
                testarr.push(obj);
            });
            setfetchedUserData(testarr);
        })

    },[]);
    // console.log(fetchedUserData);

    function addUser(){
        addDoc(collectionRef,{
            Username: userData.username,
            Email: userData.email,
            Password: userData.password,
        }).then(()=>{
            alert("Sign up successfull");

            //Resetting userData
            setUserData(obj=>{
                return {
                    ...obj,
                    username : "",
                    email : "",
                    password : ""
                }
            });

            //Redirecting to login page
            setRedirectLogin(true);
        }).catch((err)=>{
            alert(err.message);
            //Resetting userData
            setUserData(obj=>{
                return {
                    ...obj,
                    username : "",
                    email : "",
                    password : ""
                }
            });

        });
    }

    
    function handleClick (event){
        event.preventDefault();

        // if(validator.isEmail(userData.email)){
        //     alert("The email is not valid");
        // }
        // else{
        //     alert("Valid email");
        // }

        // console.log(userData);

        // setTestState(data => data+1);


        //Firebase integration


        let isMember = false;
        // Check if the email has already been registered
        fetchedUserData.map((obj,i)=>{
            if(obj.Email == userData.email){
                isMember = true;                
            }
            if(i+1 == fetchedUserData.length){
                if(isMember == false){
                    // console.log("Calling");
                    addUser();
                }
                else{
                    alert("Email already registered try again with new email");                    
                }
            }
        });

    }

    return(
        <>
            {isLoggedIn && <Navigate to='/'/>}
            {redirectLogin && <Navigate to={'/login'}/>}

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