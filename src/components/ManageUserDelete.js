import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MyConst from "./MyConst";
import axios from "axios";

function ManageUserDelete() {
    const {userId} = useParams();
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        let requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
                'Authorization': `token ${localStorage.getItem("token")}`
            }
        };
        fetch(`${MyConst.BaseURL}/api/users/${userId}/`, requestOptions)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(err => setMsg(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: MyConst.BaseURL +`/api/users/${user.id}/`,
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .then(()=>{window.location.href = "/management/users/"})
            .catch((error) => {
                console.log(error);
                setMsg(error);
            });
    };

    if (!user) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="col-6 border border-1 p-4 rounded mt-4">
                <form onSubmit={handleSubmit}>
                    <p>Are you sure you want to delete this User?</p>
                    <p><strong>{user.username}</strong></p>
                    <p><strong>{user.first_name}</strong></p>
                    <p><strong>{user.last_name}</strong></p>
                    <p><strong>{user.email}</strong></p>
                    <p>{msg}</p>
                    <input type="submit" value="Delete" className="btn btn-danger"/>
                    <a href="/management/users/" className="btn btn-secondary">Cancel</a>
                </form>
            </div>
        </div>
    );
}

export default ManageUserDelete;