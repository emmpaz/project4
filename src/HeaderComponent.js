import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify';
import {
    Button
} from "@aws-amplify/ui-react";

import { useNavigate, useLocation } from "react-router-dom";

import './HeaderComponent.css';
import { useEffect, useRef } from 'react';

const HeaderComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const guest = "guest";

    const handleSignIn = () => navigate("/login")

    const handleSignUp = () => navigate("/signup")

    const handleSignOut = () => {
        Auth.signOut().then((value) => {
            navigate(0);
        })
    }

    const handleHome = () => navigate("/");

    return (
        <div className='HeaderContainer'>
            <h3>
                Hello {(props.username === "") ? guest : props.username}!
            </h3>
            {(props.username === "") &&
                <div className="Header_Buttons_Container">
                    <Button type="submit" variation='primary' onClick={handleSignIn}>Login In</Button>
                    <Button type="submit" variation='primary' onClick={handleSignUp}>Sign Up</Button>
                    {(location.pathname !== "/") &&
                    <Button type="submit" variation="primary" onClick={handleHome}>Home</Button>}
                </div>
            }
            {(props.username !== "") &&
                <div className='Header_Buttons_Container '>
                    <Button type="submit" variation='primary' onClick={handleSignOut}>Sign Out</Button>
                    {(location.pathname !== "/") &&
                    <Button type="submit" variation="primary" onClick={handleHome}>Home</Button>}
                </div>
            }
        </div>
    )
}

export default HeaderComponent;