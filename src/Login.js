import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify';
import {
    Button, View, TextField,
    Flex
} from "@aws-amplify/ui-react";

import React from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    async function handleSignIn(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        Auth.signIn(
            {
                username: form.get("username"),
                password: form.get("password")

            }).then((value) => {
                navigate("/")
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="sign_up_page_container">
            <div className="sign_up_container">
                <View as="form" margin="3rem 0" onSubmit={handleSignIn}>
                    <Flex direction="column" justifyContent="center">
                        <TextField
                            name="username"
                            placeholder='username'
                            label="username"
                            labelHidden
                            required></TextField>
                        <TextField
                            type='password'
                            name="password"
                            placeholder='password'
                            label="password"
                            labelHidden
                            required></TextField>
                        <Button type="submit" variation='primary'>Login</Button>
                    </Flex>
                </View>
            </div>
        </div>
    )
}

export default Login;