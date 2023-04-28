import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listServices } from "../graphql/queries";
import { getUser } from '../getUser';
import "@aws-amplify/ui-react/styles.css";
import {
    View, TextField,
    Button,
    Text,
    Image
} from "@aws-amplify/ui-react";

import HeaderComponent from '../HeaderComponent';
import '../formContainer.css';

import {
    createServices as createServicesMutation,
    deleteServices as deleteServicesMutation
} from '../graphql/mutations';

const Automotive = () => {
    const [username, setUsername] = useState("");
    const [Automotive_list, setAutomotive_list] = useState([]);

    useEffect(() => {
        getUser(setUsername);
        getAutomotive();
    }, []);

    async function getAutomotive() {
        const apiData = await API.graphql({ query: listServices, variables: { filter: { type: { eq: "automotive" } } } });
        const listData = apiData.data.listServices.items;
        
        setAutomotive_list(listData);
    }

    async function createService(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            type: "automotive",
            title: form.get("title"),
            description: form.get("description"),
            date: form.get("date"),
            time: form.get("time"),
            phone_number: form.get("phone_number"),
            location: form.get("location"),
            
            user: username
        }
       
        await API.graphql({
            query: createServicesMutation,
            variables: { input: data }
        });
        getAutomotive();
        event.target.reset();
    }

    async function deleteService({ id, title }) {
        const newHousing = Automotive_list.filter((house) => house.id !== id);
        setAutomotive_list(newHousing);
       
        await API.graphql({
            query: deleteServicesMutation,
            variables: { input: { id } }
        })
    }


    return (
        <div>
            <HeaderComponent username={username} />
            <View as="form" margin="3rem 0" onSubmit={createService}>
                <div className="Estate-Form-Container">
                    {(username !== "") &&
                        <div>
                            <TextField
                                name="title"
                                placeholder='Service title'
                                label="Job title"
                                labelHidden
                                variation='quiet'
                                required></TextField>
                            <TextField
                                name="description"
                                placeholder='description'
                                label="description"
                                labelHidden
                                variation='quiet'
                                required></TextField>
                                <TextField
                                name="date"
                                placeholder='date (MM/DD/YYYY)'
                                label="date"
                                labelHidden
                                variation='quiet'
                                required></TextField>
                                <TextField
                                name="time"
                                placeholder='time (HH:MM PM/AM)'
                                label="time"
                                labelHidden
                                variation='quiet'
                                required></TextField>
                                <TextField
                                name="phone_number"
                                placeholder='phone_number'
                                label="phone number"
                                labelHidden
                                variation='quiet'
                                required></TextField>
                                <TextField
                                name="location"
                                placeholder='location'
                                label="location"
                                labelHidden
                                variation='quiet'
                                required></TextField>
                            
                            <Button type="submit" variation="primary" style={{margin: "20px"}}>
                                Create Posting
                            </Button>
                        </div>
                    }
                </div>
            </View>
            <div className="contentContainer">
                <h1 className="contentTitle">Automotive Service Postings</h1>
                {Automotive_list.map((estate) => (
                        <div className="ItemContainer"
                            key={estate.id || estate.title}
                        >
                            <h1 fontWeight={700} style={{height : "fit-content"}}>{estate.title}</h1>
                            <div className="ItemDetailsContainer">
                            <Text as="span" style={{height : "fit-content"}}>Description : {estate.description}</Text>
                            {/* <Text as="span" style={{height : "fit-content"}}>Price : ${estate.price}</Text> */}
                            <Text as="span" style={{height : "fit-content"}}>Date : {estate.date}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Time : {estate.time}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Phone : {estate.phone_number}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Location : {estate.location}</Text>
                            </div>
                            
                             {(username !== "") && (estate.user === username) &&
                                <Button type="submit" variation="primary" style={{height : "fit-content"}} onClick={() => deleteService(estate)}>
                                    Delete Posting
                                </Button>}
                        </div>
                ))}
            </div>
        </div>);
}

export default Automotive;