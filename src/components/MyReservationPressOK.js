import React, {useEffect, useState} from "react";
import {useSearchParams } from 'react-router-dom'
import MyConst from "./MyConst";

function MyReservationPressOK() {
    const [params] = useSearchParams();
    const [reservation, setReservation] = useState({
        title: '',
        check_in_datetime: params.get('startDT'),//get from Request.get
        check_out_datetime: params.get('endDT'),//get from Request.get
        desc: '',
        client: '1',//get from session
        creator: '1',//get from session
        room: params.get('id'),//get from Request.get
    });

    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        let requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
                'Authorization': `token ${localStorage.getItem("token")}`
            }
        };
        fetch(MyConst.BaseURL+ '/api/rooms/', requestOptions)
            .then(response => response.json())
            .then(data => setRooms(data !== null ? data : []))
            .catch(err => setErr(err));
    }, []);

    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");


    const handleChange = (fieldName, value) => {
        setReservation(prev => ({
            ...prev,
            [fieldName]: value,
        }));
        setInfo("");
        setErr({});
    };

    const validateForm = () => {
        if (!reservation.title.trim()) {
            setErr({title: "Title is required"});
            return false;
        }
        return true;
    };

    function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const form_data = new FormData();
        form_data.append("title", reservation.title);
        form_data.append("client", reservation.client);
        form_data.append("creator", reservation.client);
        form_data.append("room", reservation.room);
        form_data.append("check_in_datetime", reservation.check_in_datetime);
        form_data.append("check_out_datetime", reservation.check_out_datetime);
        form_data.append("desc", reservation.desc);

        let requestOptions = {
            method: "POST",
            body: form_data,
            redirect: "follow",
            headers: {
                'Authorization': `token ${localStorage.getItem("token")}`
            }
        };

        fetch(MyConst.BaseURL + `/api/myreservations/`, requestOptions)
            .then((response) => response.text())
            // .then((result) => setInfo(result))
            .then(() => window.location.href = '/reservations/')
            .catch((error) => setErr(error));
    }

    if (!rooms) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="col-4 Txt-left border border-1 border-secondary p-4 rounded">
                <div><h2>Reservation Create</h2></div>

                <form onSubmit={handleSubmit} className="form-horizontal">

                    <div className="form-group row">
                        <label htmlFor="title" className="col-12 col-form-label Txt-left">
                            Title
                        </label>
                        <div className="col-12">
                            <input type="text"  name="title" id="title" className="form-control" required
                                   onChange={(e) => handleChange('title', e.target.value)}/>
                        </div>
                        {err.title && <p style={{'color': 'red'}}>{err.title}</p>}
                    </div>

                    <div className="form-group row">
                        <label htmlFor="desc" className="col-12 col-form-label Txt-left">
                            Description
                        </label>
                        <div className="col-12">
                            <input type="text" name="desc" id="desc" className="form-control"
                                   onChange={(e) => handleChange('desc', e.target.value)}/>
                        </div>
                        {err.desc && <p style={{'color': 'red'}}>{err.desc}</p>}
                    </div>

                    <div className="form-group row">
                        <label htmlFor="room" className="col-12 col-form-label Txt-left">
                            Room
                        </label>
                        <div className="col-12">
                            <select name="room" className="form-select" id="room" aria-readonly="true" value={reservation.room}>
                                <option value selected>----------</option>
                                {rooms.map((room)=>{
                                    return( <option value={room.id}>{room.id}-{room.title} </option>);
                                    })}
                            </select>
                        </div>
                        {err.room && <p style={{'color': 'red'}}>{err.room}</p>}
                    </div>

                    <div className="form-group row">
                        <label htmlFor="check_in_datetime" className="col-12 col-form-label Txt-left">
                            Check In Datetime
                        </label>
                        <div className="col-12">
                            <input type="datetime-local" name="check_in_datetime" id="check_in_datetime"
                                   className="form-control" value={reservation.check_in_datetime} readOnly="true" />
                        </div>
                        {err.check_in_datetime && <p style={{'color': 'red'}}>{err.check_in_datetime}</p>}
                    </div>

                    <div className="form-group row">
                        <label htmlFor="check_out_datetime" className="col-12 col-form-label Txt-left">
                            Check Out Datetime
                        </label>
                        <div className="col-12">
                            <input type="datetime-local" name="check_out_datetime" id="check_out_datetime"
                                   className="form-control"  value={reservation.check_out_datetime} readOnly="true" />
                        </div>
                        {err.check_out_datetime && <p style={{'color': 'red'}}>{err.check_out_datetime}</p>}
                    </div>

                    <div className="form-group row">
                        &nbsp;{err.message && <p style={{'color': 'red'}}>{err.message}</p>}
                        {info !== "" && <p style={{'color': 'green'}}>Succesful!</p>}
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <button type="submit" className="btn btn-primary"> OK</button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => window.location.href = '/management/reservations/'}> Back
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MyReservationPressOK