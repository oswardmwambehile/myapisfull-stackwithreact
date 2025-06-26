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

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="login" element={<Login/>}/>
     <Route path="post-list" element={<PostList/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="create-post" element={<CreatePostForm/>}/>
    <Route path="/posts/:id" element={<PostDetail />} />

    </Route>
   </Routes>
   
   </BrowserRouter> 
  )
}

export default App