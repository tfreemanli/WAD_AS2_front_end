import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MyConst from "./MyConst";

function ManageRoomDelete() {
    const {roomId} = useParams();
    const [room, setRoom] = useState({
        roomId: '',
        title: '',
        room_number: '',
        desc: '',
    });
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");
    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
            'Authorization': `token ${localStorage.getItem("token")}`
        }
    };
    useEffect(() => {
        fetch(`${MyConst.BaseURL}/api/rooms/${roomId}/`, requestOptions)
            .then(response => response.json())
            .then(data => setRoom(data))
            .catch(err => setErr(err));
    },[]);

    function handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
            headers: {
                'Authorization': `token ${localStorage.getItem("token")}`
            }
        };

        fetch(`${MyConst.BaseURL}/api/rooms/${roomId}/`, requestOptions)
            .then((response) => response.text())
            .then((result) => setInfo(result))
            .then(() => window.location.href = '/management/rooms/')
            .catch((error) => setErr(error));
    }

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-6 border border-1 border-secondary p-4 rounded">
                    <form onSubmit={handleSubmit} method="post">
                        <p>Are you sure you want to delete this room?</p>
                        <p><strong>{room.title}</strong></p>
                        <p><strong>{room.desc}</strong></p>

                        <div className="form-group row">
                            &nbsp;{err instanceof Error && <p style={{'color': 'red'}}>{err.message}</p>}
                            {info !== "" && <p style={{'color': 'green'}}>Succesful!</p>}
                        </div>
                        <button type="submit" className="btn btn-danger"> Delete</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn btn-secondary"
                                onClick={() => window.location.href = '/management/rooms/'}> Back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ManageRoomDelete;