import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function ManageRooms() {
    const [rooms, setRooms] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        fetch('https://wad-as-2-backend.vercel.app/api/rooms/')
            .then(response => response.json())
            .then(data => setRooms(data !== null ?data:[]))
            .catch(err => setErr(err));
    }, []);

    if (!rooms) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center ">
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <div className="col-9 border border-1 border-secondary p-2 rounded">
                            <strong>* Room management</strong>
                            {err instanceof Error && <p>{err.message}</p>}
                        </div>
                    </div>

                    <table className="table table-striped mt-4" >
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Room Number</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.map( (room) => (
                            <tr key={room.id}>
                                <td>{room.title}</td>
                                <td>{room.room_number}</td>
                                <td>{room.desc}</td>
                                <td>
                                    <Link to={'/management/rooms/' + room.id}><i className="bi bi-pencil me-2"></i></Link>
                                    <Link to={'/management/rooms/' + room.id}><i className="bi bi-trash me-2"></i></Link>
                                    {/*<a href="{% url 'management_room_delete' room.id %}"><i*/}
                                    {/*    className="bi bi-trash me-2"></i></a>*/}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" style={{ 'text-align': 'left'}}>
                                {/*<a href="{% url 'management_room_create' %}" className="btn btn-primary">Add</a>*/}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageRooms;