import './App.css';
import './formContainer.css';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
  Heading, View, Menu, MenuItem, MenuButton, Image
} from "@aws-amplify/ui-react";
import { listForSales, listHousings, listServices, listJobs, listCommunities } from './graphql/queries';
import { getUser } from './getUser';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderComponent from './HeaderComponent';

Amplify.configure(config);

const App = () => {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
    getUser(setUsername);
  }, []);

  async function fetchNotes() {
    const apiData1 = await API.graphql({ query: listCommunities });
    const apiData2 = await API.graphql({ query: listForSales });
    const apiData3 = await API.graphql({ query: listHousings });
    const apiData4 = await API.graphql({ query: listJobs });
    const apiData5 = await API.graphql({ query: listServices });
    const communitesAPI = apiData1.data.listCommunities.items;
    const ForSalesAPI = apiData2.data.listForSales.items;
    const HousingsAPI = apiData3.data.listHousings.items;
    const JobsAPI = apiData4.data.listJobs.items;
    const ServicesAPI = apiData5.data.listServices.items;
    await Promise.all(
      communitesAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.title);
          note.image = url;
        }
        return note;
      }
      ),
      ForSalesAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.title);
          note.image = url;
        }
        return note;
      }
      ),
      HousingsAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.title);
          note.image = url;
        }
        return note;
      }
      ),
      JobsAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.title);
          note.image = url;
        }
        return note;
      }
      ),
      ServicesAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.title);
          note.image = url;
        }
        return note;
      }
      )


    );
    console.log([...communitesAPI, ...ForSalesAPI, ...HousingsAPI, ...JobsAPI, ...ServicesAPI]);
    setList([...communitesAPI, ...ForSalesAPI, ...HousingsAPI, ...JobsAPI, ...ServicesAPI]);
  }

  return (
    <div>
      <View className="App">
        <HeaderComponent username={username} />
        <Heading level={1} style={{marginBottom: "30px"}}>Cy Selling</Heading>
        <div className='menuContainer'>
          <Menu
            trigger={
              <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
                Housing
              </MenuButton>
            }
          >
            <MenuItem onClick={() => navigate("/housingwanted")}>Housing wanted</MenuItem>
            <MenuItem onClick={() => navigate("/sublets")}>Sublets/Temporary</MenuItem>
            <MenuItem onClick={() => navigate("/vacationrentals")}>Vacation rentals</MenuItem>
            <MenuItem onClick={() => navigate("/realestate")}>Real estate for sale</MenuItem>
            <MenuItem onClick={() => navigate("/parking_storage")}>Parking/Storage</MenuItem>
          </Menu>
          <Menu
            trigger={
              <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
                For Sale
              </MenuButton>
            }
          >
            <MenuItem onClick={() => navigate("/carandtrucks")}>Cars & Trucks</MenuItem>
            <MenuItem onClick={() => navigate("/motorcycles")}>Motorcycles</MenuItem>
            <MenuItem onClick={() => navigate("/computers")}>Computers</MenuItem>
            <MenuItem onClick={() => navigate("/books")}>Books</MenuItem>
            <MenuItem onClick={() => navigate("/furniture")}>Furniture</MenuItem>
          </Menu>
          <Menu
            trigger={
              <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
                Services
              </MenuButton>
            }
          >
            <MenuItem onClick={() => navigate("/automotive")}>Automotive</MenuItem>
            <MenuItem onClick={() => navigate("/computer")}>Computer</MenuItem>
            <MenuItem onClick={() => navigate("/financial")}>Financial</MenuItem>
            <MenuItem onClick={() => navigate("/labor_move")}>Labor/Move</MenuItem>
            <MenuItem onClick={() => navigate("/pets")}>Pets</MenuItem>
          </Menu>
          <Menu
            trigger={
              <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
                Jobs
              </MenuButton>
            }
          >
            <MenuItem onClick={() => navigate("/admin_office")}>Admin/Office</MenuItem>
            <MenuItem onClick={() => navigate("/education")}>Education</MenuItem>
            <MenuItem onClick={() => navigate("/transportation")}>Transportation</MenuItem>
            <MenuItem onClick={() => navigate("/security")}>Security</MenuItem>
            <MenuItem onClick={() => navigate("/generallabor")}>General Labor</MenuItem>
          </Menu>
          <Menu
            trigger={
              <MenuButton variation='primary' size='medium' width="10%" minWidth="100px">
                Community
              </MenuButton>
            }
          >
            <MenuItem onClick={() => navigate("/activites")}>Activities</MenuItem>
            <MenuItem onClick={() => navigate("/childcare")}>Child care</MenuItem>
            <MenuItem onClick={() => navigate("/classes")}>Classes</MenuItem>
            <MenuItem onClick={() => navigate("/lostandfound")}>Lost & Found</MenuItem>
            <MenuItem onClick={() => navigate("/volunteers")}>Volunteer</MenuItem>
          </Menu>
        </div>
        <Heading level={2} style={{marginTop : "30px"}}>Current Postings</Heading>
      </View>
      <div className='HomeContentContainer'>
        {list.map((item) => {
          return (
            <div className='HomeItem' key={item.id || item.title}>
              <h2>{item.title}</h2>
              <h3>{item.date}</h3>
              <p>{item.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
