import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MyConst from "./MyConst";

function ManageReservationDelete() {
    const {reservationId} = useParams();
    const [reservation, setReservation] = useState(null);
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        let requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
                'Authorization': `token ${localStorage.getItem("token")}`
            }
        };
        fetch(`${MyConst.BaseURL}/api/reservations/${reservationId}/`, requestOptions)
            .then(response => response.json())
            .then(data => setReservation(data))
            .catch(err => setErr(err));
    },[reservationId]);

    function handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
            headers: {
                'Authorization': `token ${localStorage.getItem("token")}`
            }
        };

        fetch(`${MyConst.BaseURL}/api/reservations/${reservationId}/`, requestOptions)
            .then((response) => response.text())
            .then((result) => setInfo(result))
            .then(() => window.location.href = '/management/reservations/')
            .catch((error) => setErr(error));
    }

    if (!reservation) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-6 border border-1 border-secondary p-4 rounded">
                    <form onSubmit={handleSubmit} method="post">
                        <p>Are you sure you want to delete this reservation?</p>
                        <p>Room: <strong>{reservation.room_name}</strong></p>
                        <p>Title: <strong>{reservation.title}</strong></p>
                        <p>Client: <strong>{reservation.client_fname} {reservation.client_lname}</strong></p>
                        <p>Check-In: <strong>{reservation.check_in_datetime}</strong></p>
                        <p>Check-Out: <strong>{reservation.check_out_datetime}</strong></p>
                        <p>Description: <strong>{reservation.desc}</strong></p>

                        <div className="form-group row">
                            &nbsp;{err instanceof Error && <p style={{'color': 'red'}}>{err.message}</p>}
                            {info !== "" && <p style={{'color': 'green'}}>Succesful!</p>}
                        </div>
                        <button type="submit" className="btn btn-danger"> Delete </button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn btn-secondary"
                                        onClick={() => window.location.href = '/management/reservations/'}> Back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ManageReservationDelete;