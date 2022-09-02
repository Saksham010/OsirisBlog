import "./profile.css";
import { useCookies } from 'react-cookie';
import {database} from "../../firebaseConfig";
import {collection,doc, getDoc, getDocs} from "firebase/firestore";
import {useState,useEffect} from "react";
import {Navigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function Profile(){
    
    const [userName, setuserName] = useState("");
    const [cookies,removeCookie] = useCookies(['userId']); 
    const [writtenBlogs,setwrittenBlogs] = useState([]);
    const [redirectLogin,setRedirectLogin] = useState(false);

    function getProfileData(){
    
        if(cookies.sessionId != undefined && cookies.sessionId != null){
    
            // Database Collection
            const documentRef = doc(database, "Users", cookies.sessionId);
    
            getDoc(documentRef).then(docsnap=>{
                const data = docsnap.get('Username');
                setuserName(data);

                //Getting blogs data
                getWrittenBlogs(data);
            }).catch((err)=>{
                console.log("Unable to fetch data due to: ",err.message);
            })
        }
        else{
            alert("Not logged in. Please login");
            setRedirectLogin(true);
        }
    }

    function getWrittenBlogs(thisName){
   
        if(cookies.sessionId != undefined && cookies.sessionId != null){
    
            const collectionRef = collection(database, 'blogContent');
            getDocs(collectionRef).then((response)=>{
                // console.log("Response: ",response.obj);
                const blogArr = [];
                response.docs.map((item)=>{
                    const obj = item.data();
                    console.log(obj);
                    const blogUsername = obj.Author; 
                    // con
                    console.log(blogUsername, thisName);
                    if(blogUsername == thisName){
                        console.log("Running");
                        const blogdata = obj.Content;
                        blogArr.push(blogdata);

                    }
                });
                setwrittenBlogs(blogArr);
            })
        }
    }

    useEffect(()=>{
        getProfileData();
    },[])

    console.log(writtenBlogs);

    const myposts = writtenBlogs.map((data,key)=>{
        return(
            <div className='userPosts' key={key}>
                <h1>{data}</h1>
            
            </div>
        )
    })

    return(
        
        <>
            {redirectLogin && <Navigate to="/login"/>}
            <Navbar/>
            <h1>Dashboard</h1>
            <h2>Username:{userName} </h2>          
            <div>
                <h2>Your blogs: </h2>
                    {myposts}
            </div>  
        </>
    )
}
export default Profile;