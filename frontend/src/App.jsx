// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// ... rest of your imports and code

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePostForm from './pages/CreatePost';
import PostList from './pages/PostList';
import PostDetail from "./pages/PostDetail";
import PostUpdate from './pages/PostUpdate';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import ChangePassword from "./pages/ChangePassword";
import UpdateProfile from "./pages/UpdateProfile";

// inside <Routes>



function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="/profile/change-password" element={<ChangePassword />} />
    <Route path="/profile/update" element={<UpdateProfile />} />

     <Route path="service" element={<Service/>}/>
     <Route path="contact" element={<Contact/>}/>
     <Route path="post-list" element={<PostList/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="create-post" element={<CreatePostForm/>}/>
    <Route path="/posts/:id" element={<PostDetail />} />
    <Route path="/posts/:id/edit" element={<PostUpdate />} />


    </Route>
   </Routes>
   
   </BrowserRouter> 
  )
}

export default App