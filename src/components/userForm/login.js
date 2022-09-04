import {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

import {database} from "../../firebaseConfig";
import {collection,getDocs} from "firebase/firestore";
import { useCookies } from 'react-cookie';
import { Notification,Alert} from '@mantine/core';
import { IconCheck, IconX, IconAlertCircle } from '@tabler/icons';
import { openContextModal } from "@mantine/modals";


export default function Login(){
    //State for login check
    const[isLoggedIn,setIsLoggedIn] = useState(false);

    //Cookies
    const [cookies,setCookie] = useCookies(['userId']);
    // console.log(cookies);
    //Database Collection
    const collectionRef = collection(database,'Users');

    //Redirect login state
    const [redirectLogin,setRedirectLogin] = useState(false);


    const [userData, setUserData] = useState({
       email: "", password: ""
    });


    const[mantineLoginCheck, setMantineLoginCheck] = useState(false);
    const[mantineLoginError,setMantineLoginError] = useState(false);


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


    const [fetchedUserData,setfetchedUserData] = useState([]);
    useEffect(()=>{

        //Check if user is logged in
        if(cookies.sessionId != null || cookies.sessionId != undefined){
            openContextModal({

                modal: 'loginCheckModal',
                title: 'Wait a minute',
                innerProps:{
                    modalBody:'You are already logged in. Let me redirect you',
                    redirect: ()=>{setIsLoggedIn(true)}
                },                
            });            
        }

        getDocs(collectionRef).then((response)=>{
            const testarr = [];
            response.docs.map((item)=>{
                // const obj = item.data();
                const obj = {...item.data(), id: item.id};
                testarr.push(obj);
            });
            setfetchedUserData(testarr);
        })


    },[]);
    // console.log(fetchedUserData)



    function handleClick(event){
        event.preventDefault();
        
        // if(validator.isEmail(userData.email)){
        //     alert("The email is not valid");
        // }
        // else{
        //     alert("Valid email");
        // }

        // console.log(userData);
        let loginStatus = false; //Login status

        fetchedUserData.map((obj,i)=>{
            if(obj.Email == userData.email && obj.Password == userData.password){
                loginStatus = true;
                //Insert id as cookie storage
                console.log(obj.id);
                setCookie('sessionId',obj.id,{path: '/'});

                //Alert the user
                // alert("Login successfull");
                setMantineLoginCheck(true);

                setTimeout(()=>{

                    setRedirectLogin(true);
                },2000)
            }
            if(i+1 == fetchedUserData.length && loginStatus != true){
                // alert("Wrong email or password. Try again");
                setMantineLoginError(true);

                setTimeout(()=>{
                    setMantineLoginError(false);
                },2000)
            }
        })
    }

    return(
        <>
            
            {(redirectLogin || isLoggedIn) && <Navigate to='/'/>}
     
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

            {mantineLoginCheck &&  
            <Notification icon={<IconCheck size={18} />} color="teal" title="Login" disallowClose>
                    Successfull
            </Notification> 

            }

            {mantineLoginError &&


            <Alert icon={<IconAlertCircle size={16} />} title="Failed to Login" color="red">
                Wrong Email or Password. Try again
            </Alert>    
            }

        </>

    )






}