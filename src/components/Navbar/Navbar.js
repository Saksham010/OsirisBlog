import {Link} from "react-router-dom";
import "./navbar.css";
export default function Navbar(){
    return(

        <div className="navbar-container">
        <Link className="navbarbox" to="/">Home</Link>
        <Link className="navbarbox" to="/postcontent">Post</Link>
        <Link className="navbarbox" to="/profile">Profile</Link>
        <Link className="navbarbox" to="/login">Login</Link>
        <Link className="navbarbox" to="/signup">Signup</Link>

        </div>
    )
}