import React, {useState, useEffect} from "react";
import axios from "axios";
import myConst from "./MyConst";

function ManageUserCreate() {
    const [msg, setMsg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = JSON.stringify({
            "username": username,
            "password": password,
            "email": email,
            "first_name": first_name,
            "last_name": last_name
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: myConst.BaseURL + '/api/users/',
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setMsg('Create Success.');
                console.log(JSON.stringify(response.data));
            })
            .then(()=> {
                window.location.href = "/management/users/";
            })
            .catch((error) => {
                setMsg('Create Failed.');
                console.log(error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="border border-1 border-secondary p-4 rounded">
                <div><h2>User Create</h2></div>

                <form onSubmit={handleSubmit} className="form-horizontal">

                        <div className="form-group row">
                            <label htmlFor="username" className="col-12 col-form-label Txt-left">
                                * Username
                            </label>
                            <div className="col-12">
                                <input type="text" required={true} name="username" id="username" className="form-control"
                                       onChange={(e)=> setUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-12 col-form-label Txt-left">
                                * Password
                            </label>
                            <div className="col-12">
                                <input type="password" required={true} name="password" id="password" className="form-control"
                                       onChange={(e)=> setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-12 col-form-label Txt-left">
                                * Email
                            </label>
                            <div className="col-12">
                                <input type="email" required={true}  name="email" id="email" className="form-control"
                                       onChange={(e)=> setEmail(e.target.value)} />
                            </div>
                        </div>


                        <div className="form-group row">
                            <label htmlFor="first_name" className="col-12 col-form-label Txt-left">
                                * First Name
                            </label>
                            <div className="col-12">
                                <input type="text" required={true} name="first_name" id="first_name" className="form-control"
                                       onChange={(e)=> setFname(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="last_name" className="col-12 col-form-label Txt-left">
                                Last Name
                            </label>
                            <div className="col-12">
                                <input type="text"  name="last_name" id="last_name" className="form-control"
                                       onChange={(e)=> setLname(e.target.value)} />
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

export default ManageUserCreate;