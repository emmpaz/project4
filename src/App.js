import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import HousingWanted from './Housing/HousingWanted';
import Sublets_Temp from './Housing/Sublets_Temp';
import VacationRentals from './Housing/VacationRentals';
import RealEstate from './Housing/RealEstate';
import Parking_Storage from './Housing/Parking_Storage';
import CarsAndTrucks from './ForSale/CarsAndTrucks';
import Motor from './ForSale/Motor';
import Computers from './ForSale/Computers';
import Books from './ForSale/Books';
import Furniture from './ForSale/Furniture';
import Automotive from './Services/Automotive';
import Financial from './Services/Financial';
import Labor_move from './Services/Labor_move';
import Pets from './Services/Pets';
import Admin_Office from './Jobs/Admin_Office';
import Education from './Jobs/Education';
import Transportation from './Jobs/Transportation';
import Security from './Jobs/Security';
import GeneralLabor from './Jobs/GeneralLabor';
import Activities from './Community/Activites';
import ChildCare from './Community/ChildCare';
import Classes from './Community/Classes';
import LostAndFound from './Community/LostAndFound';
import Volunteers from './Community/Volunteers';
import Computer from './Services/Computer';

function App() {
    return(
        <div>
       <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/housingwanted" element={<HousingWanted/>}/>
                <Route path="/sublets" element={<Sublets_Temp/>}/>
                <Route path="/vacationrentals" element={<VacationRentals/>}/>
                <Route path="/realestate" element={<RealEstate/>}/>
                <Route path="/parking_storage" element={<Parking_Storage/>}/>
                <Route path="/carandtrucks" element={<CarsAndTrucks/>}/>
                <Route path="/motorcycles" element={<Motor/>}/>
                <Route path="/computers" element={<Computers/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/furniture" element={<Furniture/>}/>
                <Route path="/automotive" element={<Automotive/>}/>
                <Route path="/computer" element={<Computer/>}/>
                <Route path="/financial" element={<Financial/>}/>
                <Route path="/labor_move" element={<Labor_move/>}/>
                <Route path="/pets" element={<Pets/>}/>
                <Route path="/admin_office" element={<Admin_Office/>}/>
                <Route path="/education" element={<Education/>}/>
                <Route path="/transportation" element={<Transportation/>}/>
                <Route path="/security" element={<Security/>}/>
                <Route path="/generallabor" element={<GeneralLabor/>}/>
                <Route path="/activites" element={<Activities/>}/>
                <Route path="/childcare" element={<ChildCare/>}/>
                <Route path="/classes" element={<Classes/>}/>
                <Route path="/lostandfound" element={<LostAndFound/>}/>
                <Route path="/volunteers" element={<Volunteers/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;