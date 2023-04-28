import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listHousings } from "../graphql/queries";
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
    createHousing as createHousingMutation,
    deleteHousing as deleteHousingMutation
} from '../graphql/mutations';

const RealEstate = () => {
    const [username, setUsername] = useState("");
    const [realestate_list, setRealestate_list] = useState([]);

    useEffect(() => {
        getUser(setUsername);
        getRealEstate();
    }, []);

    async function getRealEstate() {
        const apiData = await API.graphql({ query: listHousings, variables: { filter: { type: { eq: "realestate" } } } });
        const listData = apiData.data.listHousings.items;
        
        setRealestate_list(listData);
    }

    async function createEstate(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            type: "realestate",
            title: form.get("title"),
            description: form.get("description"),
            price: form.get("price"),
            date: form.get("date"),
            time: form.get("time"),
            phone_number: form.get("phone_number"),
            location: form.get("location"),
            
            user: username
        }
       
        await API.graphql({
            query: createHousingMutation,
            variables: { input: data }
        });
        getRealEstate();
        event.target.reset();
    }

    async function deleteEstate({ id, title }) {
        const newHousing = realestate_list.filter((house) => house.id !== id);
        setRealestate_list(newHousing);
       
        await API.graphql({
            query: deleteHousingMutation,
            variables: { input: { id } }
        })
    }


    return (
        <div>
            <HeaderComponent username={username} />
            <View as="form" margin="3rem 0" onSubmit={createEstate}>
                <div className="Estate-Form-Container">
                    {(username !== "") &&
                        <div>
                            <TextField
                                name="title"
                                placeholder='House title'
                                label="House title"
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
                                name="price"
                                placeholder='price'
                                label="price"
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
                                Create Estate
                            </Button>
                        </div>
                    }
                </div>
            </View>
            <div className="contentContainer">
                <h1 className="contentTitle">Real Estate Listings</h1>
                {realestate_list.map((estate) => (
                        <div className="ItemContainer"
                            key={estate.id || estate.title}
                        >
                            <h1 fontWeight={700} style={{height : "fit-content"}}>{estate.title}</h1>
                            <div className="ItemDetailsContainer">
                            <Text as="span" style={{height : "fit-content"}}>Description : {estate.description}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Price : ${estate.price}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Date : {estate.date}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Time : {estate.time}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Phone : {estate.phone_number}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Location : {estate.location}</Text>
                            </div>
                            
                             {(username !== "") && (estate.user === username) &&
                                <Button type="submit" variation="primary" style={{height : "fit-content"}} onClick={() => deleteEstate(estate)}>
                                    Delete Posting
                                </Button>}
                        </div>
                ))}
            </div>
        </div>);
}

export default RealEstate;