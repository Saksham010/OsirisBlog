import { useState,useEffect } from "react";
import {database} from "../../firebaseConfig";
import {collection,doc, getDoc, addDoc} from "firebase/firestore";
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function MakePost(){

    const [cookies, setCookie] = useCookies(['Users']);
    const [authorName,setAuthorName] = useState("");
    const [textData, setTextData] = useState("");
    const [redirectMainBlog,setRedirectMainBlog] = useState(false);     
    const [redirectLogin,setRedirectLogin] = useState(false);


    //fetching data to get username 
    async function getProfileData(){

        if(cookies.sessionId != undefined && cookies.sessionId != null){

            // Database Collection
            // const collectionRef = collection(database,`Users/${cookies.sessionId}`);
            const documentRef = doc(database, "Users", cookies.sessionId);
    
            getDoc(documentRef).then(docsnap=>{
                const data = docsnap.get('Username');
                setAuthorName(data);
            }).catch((err)=>{
                console.log("Unable to fetch data due to: ",err.message);
            })
        }
        else{
            alert("Not logged in. Please login");
            setRedirectLogin(true);
        }
    }
    useEffect(()=>{
        getProfileData();
    },[])

    //New collection for blog post
    const collectionRef = collection(database, "blogContent");
    function submitBlog(){
        addDoc(collectionRef,{
            Author: authorName,
            Content: textData,
        }).then(()=>{
            alert("Blog succesfully posted");

            //Resetting blog text data
            setTextData("");

           //Redirecting to login page
            setRedirectMainBlog(true);
        }).catch((err)=>{
            alert(err.message);
            //Resetting blog text data
            setTextData("");

        });
    }

    
    function handleChange(event){
        // console.log(event.target.value);
        let textData = event.target.value;
        setTextData(textData);


    }

    return(
        <>
            {redirectLogin && <Navigate to="/login"/>}
            {redirectMainBlog && <Navigate to="/"/>}

            <Navbar/>

            <h1>Write your blog :</h1>
            <textarea onChange={handleChange} value={textData}></textarea>
            <button onClick={submitBlog}>Submit</button>

        </>
    )

}