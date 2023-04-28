import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listCommunities } from "../graphql/queries";
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
    createCommunity as createCommunityMutation,
    deleteCommunity as deleteCommunityMutation
} from '../graphql/mutations';

const LostAndFound = () => {
    const [username, setUsername] = useState("");
    const [LostAndFound_list, setLostAndFound_list] = useState([]);

    useEffect(() => {
        getUser(setUsername);
        getLostAndFound();
    }, []);

    async function getLostAndFound() {
        const apiData = await API.graphql({ query: listCommunities, variables: { filter: { type: { eq: "lostandfound" } } } });
        const listData = apiData.data.listCommunities.items;
        
        setLostAndFound_list(listData);
    }

    async function createCommunity(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            type: "lostandfound",
            title: form.get("title"),
            description: form.get("description"),
            date: form.get("date"),
            time: form.get("time"),
            phone_number: form.get("phone_number"),
            location: form.get("location"),
            
            user: username
        }
       
        await API.graphql({
            query: createCommunityMutation,
            variables: { input: data }
        });
        getLostAndFound();
        event.target.reset();
    }

    async function deleteCommunity({ id, title }) {
        const newHousing = LostAndFound_list.filter((house) => house.id !== id);
        setLostAndFound_list(newHousing);
       
        await API.graphql({
            query: deleteCommunityMutation,
            variables: { input: { id } }
        })
    }


    return (
        <div>
            <HeaderComponent username={username} />
            <View as="form" margin="3rem 0" onSubmit={createCommunity}>
                <div className="Estate-Form-Container">
                    {(username !== "") &&
                        <div>
                            <TextField
                                name="title"
                                placeholder='Community title'
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
                <h1 className="contentTitle">Lost and Found Postings</h1>
                {LostAndFound_list.map((estate) => (
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
                                <Button type="submit" variation="primary" style={{height : "fit-content"}} onClick={() => deleteCommunity(estate)}>
                                    Delete Posting
                                </Button>}
                        </div>
                ))}
            </div>
        </div>);
}

export default LostAndFound;