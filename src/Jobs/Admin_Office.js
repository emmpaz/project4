import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listJobs } from "../graphql/queries";
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
    createJobs as createJobsMutation,
    deleteJobs as deleteJobsMutation
} from '../graphql/mutations';

const Admin_Office = () => {
    const [username, setUsername] = useState("");
    const [AdminOffice_list, setAdminOffice_list] = useState([]);

    useEffect(() => {
        getUser(setUsername);
        getAdminOffice();
    }, []);

    async function getAdminOffice() {
        const apiData = await API.graphql({ query: listJobs, variables: { filter: { type: { eq: "admin_office" } } } });
        const listData = apiData.data.listJobs.items;
        await Promise.all(
            listData.map(async (house) => {
                if (house.image) {
                    const url = await Storage.get(house.title);
                    house.image = url;
                }
                return house;
            })
        )
        setAdminOffice_list(listData);
    }

    async function createJob(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
            type: "admin_office",
            title: form.get("title"),
            description: form.get("description"),
            pay: form.get("pay"),
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
            query: createJobsMutation,
            variables: { input: data }
        });
        getAdminOffice();
        event.target.reset();
    }

    async function deleteJob({ id, title }) {
        const newHousing = AdminOffice_list.filter((house) => house.id !== id);
        setAdminOffice_list(newHousing);
        await Storage.remove(title);
        await API.graphql({
            query: deleteJobsMutation,
            variables: { input: { id } }
        })
    }


    return (
        <div>
            <HeaderComponent username={username} />
            <View as="form" margin="3rem 0" onSubmit={createJob}>
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
                                name="pay"
                                placeholder='pay'
                                label="pay"
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
                <h1>Admin/Office Job Postings</h1>
                {AdminOffice_list.map((estate) => (
                        <div className="ItemContainer"
                            key={estate.id || estate.title}
                        >
                            <h1 fontWeight={700} style={{height : "fit-content"}}>{estate.title}</h1>
                            <div className="ItemDetailsContainer">
                            <Text as="span" style={{height : "fit-content"}}>Description : {estate.description}</Text>
                            <Text as="span" style={{height : "fit-content"}}>Pay : ${estate.price}</Text>
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
                                <Button type="submit" variation="primary" style={{height : "fit-content"}} onClick={() => deleteJob(estate)}>
                                    Delete Posting
                                </Button>}
                        </div>
                ))}
            </div>
        </div>);
}

export default Admin_Office;