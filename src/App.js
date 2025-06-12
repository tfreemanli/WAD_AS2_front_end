
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./components/Menu";
import ManageRooms from "./components/ManageRooms";
import ManageRoomDetail from "./components/ManageRoomDetail";
import ManageRoomCreate from "./components/ManageRoomCreate";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          WAD 2025S1 Assignment2 by Chengfeng Li #1602741
        </p>
      </header>
      <Menu></Menu>
      <BrowserRouter><Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
        <Route path="/booking" element={<h1>booking</h1>}></Route>
        <Route path="/mybooking" element={<h1>myBooking</h1>}></Route>
        <Route path="/management/rooms" element={<ManageRooms />}></Route>
        <Route path="/management/rooms/create" element={<ManageRoomCreate />}></Route>
        <Route path="/management/rooms/:roomId" element={<ManageRoomDetail />}></Route>
        <Route path="/management/reservations" element={<h1>Reservations</h1>}></Route>
        <Route path="/management/users" element={<h1>Users</h1>}></Route>
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
