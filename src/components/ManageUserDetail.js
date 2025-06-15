import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import MyConst from "./MyConst";
import axios from "axios";

function ManageUserDetail() {
    const {userId} = useParams();

    const [msg, setMsg] = useState('');
    const [user, setUser] = useState(null);

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


    const handleChange = (fieldName, value) => {
        setUser(prev => ({
            ...prev,
            [fieldName]: value,
        }));
        setMsg('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = JSON.stringify({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: MyConst.BaseURL + `/api/users/${user.id}/`,
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: data
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

    if(!user){
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="border border-1 border-secondary p-4 rounded">
                <div><h2>User Detail</h2><br/>{msg}</div>

                <form onSubmit={handleSubmit} className="form-horizontal">

                        <div className="form-group row">
                            <label htmlFor="username" className="col-12 col-form-label Txt-left">
                                * Username
                            </label>
                            <div className="col-12">
                                <input type="text" required={true} value={user.username} name="username" id="username" className="form-control"
                                       onChange={(e)=> handleChange('username', e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-12 col-form-label Txt-left">
                                * Email
                            </label>
                            <div className="col-12">
                                <input type="email" required={true} value={user.email} name="email" id="email" className="form-control"
                                       onChange={(e)=> handleChange('email', e.target.value)} />
                            </div>
                        </div>


                        <div className="form-group row">
                            <label htmlFor="first_name" className="col-12 col-form-label Txt-left">
                                * First Name
                            </label>
                            <div className="col-12">
                                <input type="text" required={true} value={user.first_name} name="first_name" id="first_name" className="form-control"
                                       onChange={(e)=> handleChange('first_name', e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="last_name" className="col-12 col-form-label Txt-left">
                                Last Name
                            </label>
                            <div className="col-12">
                                <input type="text" value={user.last_name} name="last_name" id="last_name" className="form-control"
                                       onChange={(e)=> handleChange('last_name', e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            {msg}
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-10 offset-sm-2">
                                <button type="submit" className="btn btn-primary"> OK</button>
                                <button type="button" className="btn btn-secondary"
                                        onClick={() => window.location.href = '/management/users/'}> Back
                                </button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    );
}

export default ManageUserDetail;