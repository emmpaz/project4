import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listServices } from "../graphql/queries";
import { getUser } from '../getUser';
import "@aws-amplify/ui-react/styles.css";
import { Storage } from 'aws-amplify';
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

const Pets = () => {
    const [username, setUsername] = useState("");
    const [Pets_list, setPets_list] = useState([]);

    useEffect(() => {
        getUser(setUsername);
        getPets();
    }, []);

    async function getPets() {
        const apiData = await API.graphql({ query: listServices, variables: { filter: { type: { eq: "pets" } } } });
        const listData = apiData.data.listServices.items;
        await Promise.all(
            listData.map(async (house) => {
                if (house.image) {
                    const url = await Storage.get(house.title);
                    house.image = url;
                }
                return house;
            })
        )
        setPets_list(listData);
    }

    async function createService(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            type: "pets",
            title: form.get("title"),
            description: form.get("description"),
            date: form.get("date"),
            time: form.get("time"),
            phone_number: form.get("phone_number"),
            location: form.get("location"),
            image: image.name,
            user: username
        }
        if (!!data.image){
            await Storage.put(data.title, image).then((value) => {
                console.log(value);
            });
        }
        await API.graphql({
            query: createServicesMutation,
            variables: { input: data }
        });
        getPets();
        event.target.reset();
    }

    async function deleteService({ id, title }) {
        const newHousing = Pets_list.filter((house) => house.id !== id);
        setPets_list(newHousing);
        await Storage.remove(title);
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
                                placeholder='Job title'
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
                            <View
                                name="image"
                                as="input"
                                type="file"
                                style={{ alignSelf: "end" }}></View>
                            <Button type="submit" variation="primary" style={{margin: "20px"}}>
                                Create Posting
                            </Button>
                        </div>
                    }
                </div>
            </View>
            <div className="contentContainer">
                <h1>Pets Service Postings</h1>
                {Pets_list.map((estate) => (
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
                            {estate.image && (
                                <Image
                                    src={estate.image}
                                    alt={`visual aid for ${estate.title}`}
                                    style={{ width: "20%" }}
                                ></Image>
                            )}
                             {(username !== "") && (estate.user === username) &&
                                <Button type="submit" variation="primary" style={{height : "fit-content"}} onClick={() => deleteService(estate)}>
                                    Delete Posting
                                </Button>}
                        </div>
                ))}
            </div>
        </div>);
}

export default Pets;