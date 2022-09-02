import { useCookies } from 'react-cookie';
import {database} from "../../firebaseConfig";
import {collection,doc, getDoc} from "firebase/firestore";
import {useState,useEffect} from "react";
import {Navigate} from "react-router-dom";
import BlogSection from "./section";
export default function Blog(){

    const [cookies,setCookie,removeCookie] = useCookies(['userId']); 
    const [currentUserName, setCurretnUserName] = useState('Guest');
    const [loginData,setloginData] = useState('');
    const [redirectLogin,setRedirectLogin] = useState(false);


    async function getProfileData(){
        console.log("Call");

        if(cookies.sessionId != undefined && cookies.sessionId != null){

            // Database Collection
            // const collectionRef = collection(database,`Users/${cookies.sessionId}`);
            const documentRef = doc(database, "Users", cookies.sessionId);
    
            getDoc(documentRef).then(docsnap=>{
                const data = docsnap.get('Username');
                setCurretnUserName(data);
                setloginData("Logout");
                // console.log(docsnap.get('Username'));
            }).catch((err)=>{
                console.log("Unable to fetch data due to: ",err.message);
            })
        }
        setloginData("Login");
    }
    useEffect(()=>{
        getProfileData();
    },[])


    
    function logOut(){

        //Removing cookie
        removeCookie('sessionId');
        //Resetting username
        setCurretnUserName("Guest");

        if(loginData == "Logout"){

            setloginData("Login");
        }
        else{
            setRedirectLogin(true);           
        }   
    }

    return(
        <>
            {redirectLogin && <Navigate to='/login'/>}

            <h1>Blog Page</h1>
            <h1>Welcome {currentUserName}</h1>
            <button onClick={logOut}>{loginData}</button>

            <BlogSection />

        </>
        
    )


}
