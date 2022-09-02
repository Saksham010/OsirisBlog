import {database} from "../../firebaseConfig";
import {collection,docs, getDoc, getDocs} from "firebase/firestore";
import {useState,useEffect} from "react";
import {Navigate} from "react-router-dom";
import "./section.css";

export default function BlogSection(){

    const [fetchedBlogs, setfetchedBlogs] = useState([]);

    function getAllBlogs(){

        const collectionRef = collection(database, 'blogContent');
        getDocs(collectionRef).then((response)=>{
            // console.log("Response: ",response.obj);
            const blogArr = [];
            response.docs.map((item)=>{
                const obj = item.data();
                blogArr.push(obj);
            });
            setfetchedBlogs(blogArr);
        })
        
    }

    useEffect(()=>{
        getAllBlogs()
    },[]);

    const blogContent =  fetchedBlogs.map((obj,i)=>{
        return(
            <div className={`blogContainer blogContainer${i}`} key={i}>
            
                <h2>{obj.Author}</h2>
                <p>{obj.Content}</p>
            </div>
        )
    })
    console.log(blogContent);

    return(
        <>
            {blogContent}
        
        </>
    )

}