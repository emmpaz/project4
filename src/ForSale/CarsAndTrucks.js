import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listForSales } from "../graphql/queries";
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
    createForSale as createForSaleMutation,
    deleteForSale as deleteForSaleMutation
} from '../graphql/mutations';

const CarsAndTrucks = () => {
    const [username, setUsername] = useState("");
    const [CarsAndTrucks_list, setCarsAndTrucks_list] = useState([]);

    useEffect(() => {
        getUser(setUsername);
        getCarsAndTrucks();
    }, []);

    async function getCarsAndTrucks() {
        const apiData = await API.graphql({ query: listForSales, variables: { filter: { type: { eq: "carsandtrucks" } } } });
        const listData = apiData.data.listForSales.items;
        
        setCarsAndTrucks_list(listData);
    }

    async function createItem(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            type: "carsandtrucks",
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
            query: createForSaleMutation,
            variables: { input: data }
        });
        getCarsAndTrucks();
        event.target.reset();
    }

    async function deleteItem({ id, title }) {
        const newHousing = CarsAndTrucks_list.filter((house) => house.id !== id);
        setCarsAndTrucks_list(newHousing);
       
        await API.graphql({
            query: deleteForSaleMutation,
            variables: { input: { id } }
        })
    }


    return (
        <div>
            <HeaderComponent username={username} />
            <View as="form" margin="3rem 0" onSubmit={createItem}>
                <div className="Estate-Form-Container">
                    {(username !== "") &&
                        <div>
                            <TextField
                                name="title"
                                placeholder='Vehicle title'
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
                                Create Posting
                            </Button>
                        </div>
                    }
                </div>
            </View>
            <div className="contentContainer">
                <h1 className="contentTitle">Car and Truck Postings</h1>
                {CarsAndTrucks_list.map((estate) => (
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
                                <Button type="submit" variation="primary" style={{height : "fit-content"}} onClick={() => deleteItem(estate)}>
                                    Delete Posting
                                </Button>}
                        </div>
                ))}
            </div>
        </div>);
}

export default CarsAndTrucks;