import React, { useState} from "react";

function ManageRoomCreate() {
    const [room, setRoom] = useState({
    title: '',
    room_number: '',
    desc: '',
  });
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");


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
            return;
        }

        const form_data = new FormData();
        form_data.append("title", room.title);
        form_data.append("room_number", room.room_number);
        form_data.append("desc", room.desc);

        const requestOptions = {
          method: "POST",
          body: form_data,
          redirect: "follow"
        };

        fetch(`https://wad-as-2-backend.vercel.app/api/rooms/`, requestOptions)
          .then((response) => response.text())
          // .then((result) => setInfo(result))
          .then(() => window.location.href = '/management/rooms/')
          .catch((error) => setErr(error));
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="border border-1 border-secondary p-4 rounded">
                <div><p>Room Create</p></div>

                <form onSubmit={handleSubmit} className="form-horizontal">

                        <div className="form-group row">
                            <label htmlFor="title" className="col-12 col-form-label Txt-left">
                                Title
                            </label>
                            <div className="col-12">
                                <input type="text"  name="title" id="title" className="form-control"
                                       onChange={(e)=> handleChange('title', e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="room_number" className="col-12 col-form-label Txt-left">
                                Room Number
                            </label>
                            <div className="col-12">
                                <input type="text"  name="room_number" id="room_number" className="form-control"
                                       onChange={(e)=> handleChange('room_number', e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="desc" className="col-12 col-form-label Txt-left">
                                Description
                            </label>
                            <div className="col-12">
                                <input type="text"  name="desc" id="desc" className="form-control"
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
    );
}

export default ManageRoomCreate