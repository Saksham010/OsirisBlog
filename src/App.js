import './App.css';
import {Routes, Route} from "react-router-dom";
import Signup  from './components/userForm/signup';
import Login from './components/userForm/login';
import Blog from "./components/BlogPosts/blog";
function App() {
  
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Blog />}>
          
        </Route>

        <Route path='/signup' element = {<Signup />}/> 
        <Route path='/login' element = {<Login />} />
      

      </Routes>

      {/* Home Page */}
    </div>
  );
}

export default App;
