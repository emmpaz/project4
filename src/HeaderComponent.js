import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify';
import {
    Button
} from "@aws-amplify/ui-react";

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './HeaderComponent.css';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const guest = "guest";


    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        Auth.currentAuthenticatedUser().then(value => {
            setUsername(value.username)
        }).catch((err) => {
            if (err)
                setUsername("")
        });
    }

    const handleSignIn = () => navigate("/login")

    const handleSignUp = () => navigate("/signup")

    const handleSignOut = () => {
        Auth.signOut().then((value) => {
            navigate(0);
        })
    }

    return (
        <div className='HeaderContainer'>
            <h3>
                Hello {(username === "") ? guest : username}!
            </h3>
            {(username === "") &&
                <div className="Header_Buttons_Container">
                    <Button type="submit" variation='primary' onClick={handleSignIn}>Login In</Button>
                    <Button type="submit" variation='primary' onClick={handleSignUp}>Sign Up</Button>
                </div>
            }
            {(username !== "") &&
                <div className='Header_Buttons_Container '>
                    <Button type="submit" variation='primary' onClick={handleSignOut}>Sign Out</Button>
                </div>
            }
        </div>
    )
}

export default HeaderComponent;