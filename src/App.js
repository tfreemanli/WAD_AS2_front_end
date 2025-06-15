import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./components/Menu";
import ManageRooms from "./components/ManageRooms";
import ManageRoomDetail from "./components/ManageRoomDetail";
import ManageRoomCreate from "./components/ManageRoomCreate";
import ManageRoomDelete from "./components/ManageRoomDelete";
import ManageReservations from "./components/ManageReservations";
import ManageReservationCreate from "./components/ManageReservationCreate";
import ManageReservationDetail from "./components/ManageReservationDetail";
import ManageReservationDelete from "./components/ManageReservationDelete";
import MyReservations from "./components/MyReservations";
import MyReservationDelete from "./components/MyReservationDelete";
import MyReservationDetail from "./components/MyReservationDetail";
import MyReservationCreate from "./components/MyReservationCreate";
import MyReservationPickARoom from "./components/MyReservationPickARoom";
import MyReservationPressOK from "./components/MyReservationPressOK";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import {AuthProvider} from './AuthContext';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <header className="App-header">
                    <p>
                        WAD 2025S1 Assignment2 by Chengfeng Li #1602741
                    </p>
                </header>
                <Menu></Menu>
                <BrowserRouter><Routes>
                    <Route path="/" element={<h1>Home</h1>}></Route>
                    <Route path="/booking" element={<MyReservationPickARoom/>}></Route>
                    <Route path="/booking/create/" element={<MyReservationPressOK/>}></Route>
                    <Route path="/reservations" element={<MyReservations/>}></Route>
                    <Route path="/reservations/create" element={<MyReservationCreate/>}></Route>
                    <Route path="/reservations/:reservationId" element={<MyReservationDetail/>}></Route>
                    <Route path="/reservations/delete/:reservationId" element={<MyReservationDelete/>}></Route>
                    <Route path="/management/rooms" element={<ManageRooms/>}></Route>
                    <Route path="/management/rooms/create" element={<ManageRoomCreate/>}></Route>
                    <Route path="/management/rooms/:roomId" element={<ManageRoomDetail/>}></Route>
                    <Route path="/management/rooms/delete/:roomId" element={<ManageRoomDelete/>}></Route>
                    <Route path="/management/reservations" element={<ManageReservations/>}></Route>
                    <Route path="/management/reservations/create" element={<ManageReservationCreate/>}></Route>
                    <Route path="/management/reservations/:reservationId" element={<ManageReservationDetail/>}></Route>
                    <Route path="/management/reservations/delete/:reservationId"
                           element={<ManageReservationDelete/>}></Route>
                    <Route path="/management/users" element={<h1>Users</h1>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes></BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
