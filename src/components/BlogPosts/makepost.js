import { useState,useEffect } from "react";
import {database} from "../../firebaseConfig";
import {collection,doc, getDoc, addDoc} from "firebase/firestore";
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { openContextModal } from "@mantine/modals";
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

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
            openContextModal({

                modal: 'loginCheckModal',
                title: 'Sorry',
                innerProps:{
                    modalBody:'You need to login to write a blog',
                    redirect: ()=>{setRedirectLogin(true)}
                },                
            }); 
            // alert("Not logged in. Please login");
            // setRedirectLogin(true);
        }
    }
    useEffect(()=>{
        getProfileData();
    },[])

    //New collection for blog post
    const collectionRef = collection(database, "blogContent");
    function submitBlog(){
        //Mantine notification
        showNotification({
            id: 'load-data',
            loading: true,
            title: 'Uploading your blog',
            message: 'Your blog is being uploaded to the server',
            autoClose:false,
            disallowClose: true,
        });

        addDoc(collectionRef,{
            Author: authorName,
            Content: textData,
        }).then(()=>{
            setTimeout(()=>{

                updateNotification({
                    id: 'load-data',
                    color: 'teal',
                    title: 'Success',
                    message: 'Your blog has been successfully uploaded',
                    icon: <IconCheck size={16} />,
                    autoClose: 2000,
                  });
                //Resetting blog text data

                setTextData("");

            },1000)
            
            setTimeout(()=>{
                setRedirectMainBlog(true);
            },1700);

           //Redirecting to login page
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