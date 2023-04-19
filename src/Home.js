import './App.css';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, Auth } from 'aws-amplify';
import {
  Button,
  Heading,
  Text,
  View,
  Image,
  TextField,
  Flex,
  Menu, MenuItem, MenuButton

} from "@aws-amplify/ui-react";
import { listNotes } from './graphql/queries';

import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation
} from './graphql/mutations';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderComponent from './HeaderComponent';

Amplify.configure(config);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
    getUser();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      }
      ));
    setNotes(notesFromAPI);
  }

  async function getUser() {
    Auth.currentAuthenticatedUser().then(value => {
      setUsername(value.username)
    }).catch((err) => {
      if (err)
        setUsername("Welcome guest!")
    });
  }
  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name
    }
    if (!!data.image)
      await Storage.put(data.name, image);

    await API.graphql({
      query: createNoteMutation,
      variables: { input: data }
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } }
    })
  }

  const handleSignIn = () => navigate("/login")

  const handleSignUp = () => navigate("/signup")

  const handleSignOut = () => {
    Auth.signOut().then((value) => {
      navigate(0);
    })
  }

  return (
    <View className="App">
      <HeaderComponent />
      <Heading level={1}>Cy Selling</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          {(username !== "Welcome guest!") &&
            <div>
              <TextField
                name="name"
                placeholder='Note name'
                label="Note name"
                labelHidden
                variation='quiet'
                required></TextField>
              <TextField
                name="description"
                placeholder='Note description'
                label="Note description"
                labelHidden
                variation='quiet'
                required></TextField>
              <View
                name="image"
                as="input"
                type="file"
                style={{ alignSelf: "end" }}></View>
            </div>
          }
        </Flex>
      </View>
      <div className='menuContainer'>
        <Menu
          trigger={
            <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
              Housing
            </MenuButton>
          }
        >
          <MenuItem onClick={() => navigate("/housingwanted")}>Housing wanted</MenuItem>
          <MenuItem>Sublets/Temporary</MenuItem>
          <MenuItem>Vacation rentals</MenuItem>
          <MenuItem>Real estate for sale</MenuItem>
          <MenuItem>Parking/Storage</MenuItem>
        </Menu>
        <Menu
          trigger={
            <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
              For Sale
            </MenuButton>
          }
        >
          <MenuItem>Cars & Trucks</MenuItem>
          <MenuItem>Motorcycles</MenuItem>
          <MenuItem>Computers</MenuItem>
          <MenuItem>Books</MenuItem>
          <MenuItem>Furniture</MenuItem>
        </Menu>
        <Menu
          trigger={
            <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
              Services
            </MenuButton>
          }
        >
          <MenuItem>Automotive</MenuItem>
          <MenuItem>Computer</MenuItem>
          <MenuItem>Financial</MenuItem>
          <MenuItem>Labor/Move</MenuItem>
          <MenuItem>Pets</MenuItem>
        </Menu>
        <Menu
          trigger={
            <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
              Jobs
            </MenuButton>
          }
        >
          <MenuItem>Admin/Office</MenuItem>
          <MenuItem>Education</MenuItem>
          <MenuItem>Transportation</MenuItem>
          <MenuItem>Security</MenuItem>
          <MenuItem>General Labor</MenuItem>
        </Menu>
        <Menu
          trigger={
            <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
              Community
            </MenuButton>
          }
        >
          <MenuItem>Activities</MenuItem>
          <MenuItem>Child care</MenuItem>
          <MenuItem>Classes</MenuItem>
          <MenuItem>Lost & Found</MenuItem>
          <MenuItem>Volunteer</MenuItem>
        </Menu>
      </div>
      <Heading level={2}>Current Postings</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>{note.name}</Text>
            <Text as="span">{note.description}</Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${notes.name}`}
                style={{ width: 400 }}
              ></Image>
            )}
            {(username !== "Welcome guest!") &&
              <Button variation="link" onClick={() => deleteNote(note)}>
                Delete note
              </Button>}
          </Flex>
        ))}
      </View>
    </View>
  );
}

export default App;
