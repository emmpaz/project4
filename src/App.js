import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './Home';
import HomeAuth from './HomeAuth';
import { API, Storage, Auth } from 'aws-amplify';
import Login from './Login';
import SignUp from './SignUp';

function App() {
    return(
        <div>
       <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/user" element={<HomeAuth/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;