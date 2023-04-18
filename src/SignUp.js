import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify';
import {
    Button, View, TextField,
    Flex,
    Text
} from "@aws-amplify/ui-react";

import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [verify, setVerify] = useState(false);
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");

    const navigate = useNavigate();

   async function handleSignUp(event){
        event.preventDefault();
        const form = new FormData(event.target);
        Auth.signUp(
            {
                username : form.get("username"),
                password : form.get("password"),
                attributes : { email : form.get("email")},
                autoSignIn: {
                    enabled: true,
                  }
            
            }).then((value) => {
                setUsername(form.get("username"))
                setVerify(true)
            }).catch((err) => {
                console.log(err)
            })
   }

   async function handleCode(event){
    event.preventDefault();
    const form = new FormData(event.target)
    setCode(form.get("code"))

   }

   useEffect(() => {
    handleVerify();
   },[code])

   async function handleVerify(){
    Auth.confirmSignUp(
        {
            username : username,
            code : code
        }
    ).then(() => {
        navigate("/")
    }).catch((err) => {
        console.log()
    })
   }

    return(
        <div>
    <View as="form" margin="3rem 0" onSubmit={handleSignUp}>
        <Flex direction="column" justifyContent="center">
            <TextField
            name="email"
            placeholder='email'
            label="email"
            labelHidden
            required></TextField>
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
            <Button type="submit" variation='primary'>Sign Up</Button>
        </Flex>
    </View>
    {(verify) && 
        <View as="form" margin="3rem 0" onSubmit={handleCode}>
            <Flex direction="column" justifyContent="center">
                <Text>A code was sent to your email.</Text>
                <TextField
                    name="code"
                    placeholder='code'
                    id="code"
                    label="code"
                    labelHidden
                    required></TextField>
                <Button type="submit" variation='primary'>Verify</Button>
            </Flex>
        </View>
    }
    </div>
    )
}

export default SignUp;