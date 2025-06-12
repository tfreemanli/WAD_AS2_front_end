import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ManageRoomDetail() {
    const { roomId } = useParams();
    const [room, setRoom] = useState({
    roomId: '',
    title: '',
    room_number: '',
    desc: '',
  });
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        fetch(`https://wad-as-2-backend.vercel.app/api/rooms/${roomId}/`)
            .then(response => response.json())
            .then(data => setRoom(data))
            .catch(err => setErr(err));
    }, [roomId]);

    const handleChange = (fieldName, value) => {
        setRoom(prev => ({
            ...prev,
            [fieldName]: value,
        }));
        setInfo("");
        setErr({});
    };

    const validateForm = () => {
        if (!room.title.trim()) {
            setErr({message: "Title is required"});
            return false;
        }
        if(!/^-?\d+$/.test(room.room_number)) {
            setErr({message: "Room number must be an integer"});
            return false;
        }
        return true;
    };

    function handleSubmit(event) {
        event.preventDefault();

        if(!validateForm()) {
            return false;
        }

        const formdata = new FormData();
        formdata.append("title", room.title);
        formdata.append("room_number", room.room_number);
        formdata.append("desc", room.desc);

        const requestOptions = {
          method: "PUT",
          body: formdata,
          redirect: "follow"
        };

        fetch(`https://wad-as-2-backend.vercel.app/api/rooms/${roomId}/`, requestOptions)
          .then((response) => response.text())
          .then((result) => {setInfo(result); console.log(result);})
          .catch((error) => setErr(error));
    }

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Room Details</h2>

            <div className="d-flex justify-content-center align-items-center top-50">
                <div className="col-3 border border-1 border-secondary p-4 rounded">
                    <form onSubmit={handleSubmit} className="form-horizontal">

                        <div className="form-group row">
                            <label htmlFor="title" className="col-12 col-form-label Txt-left">
                                Title
                            </label>
                            <div className="col-12">
                                <input type="text" value={room.title} name="title" id="title" className="form-control"
                                       onChange={(e)=> handleChange('title', e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="room_number" className="col-12 col-form-label Txt-left">
                                Room Number
                            </label>
                            <div className="col-12">
                                <input type="text"  value={room.room_number} name="room_number" id="room_number" className="form-control"
                                       onChange={(e)=> handleChange('room_number', e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="desc" className="col-12 col-form-label Txt-left">
                                Description
                            </label>
                            <div className="col-12">
                                <input type="text" value={room.desc} name="desc" id="desc" className="form-control"
                                       onChange={(e)=> handleChange('desc', e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            &nbsp;{err.message && <p style={{'color': 'red'}}>{err.message}</p>}
                            {info !== "" && <p style={{'color': 'green'}}>Succesful!</p>}
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-10 offset-sm-2">
                                <button type="submit" className="btn btn-primary"> OK</button>
                                <button type="button" className="btn btn-secondary"
                                        onClick={() => window.location.href = '/management/rooms/'}> Back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ManageRoomDetail;