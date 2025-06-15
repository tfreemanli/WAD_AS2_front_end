import React, {useState} from 'react'
import MyConst from "./MyConst";
import axios from "axios";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const [info, setInfo] = useState(null);
    const [err, setErr] = useState(null);


    const validateForm = () => {
        if (!username.trim()) {
            setErr("Title is required");
            return false;
        }
        if (!password.trim()) {
            setErr("password is required");
            return false;
        }
        if (!fname.trim()) {
            setErr("first_name is required");
            return false;
        }
        return true;
    };


    const handleSubmit = (event) => {
        event.preventDefault();


        if (!validateForm()) {
            return;
        }

        let data = JSON.stringify({
            "username": username,
            "password": password,
            "email": email,
            "first_name": fname,
            "last_name": lname
        });

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: MyConst.BaseURL + '/api/users/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setInfo("Register success.");
            })
            .catch((error) => {
                console.log(error);
                setErr(error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="col-4 border border-1 border-secondary p-4 rounded">
                <div><h1>User Registration</h1></div>
                <form onSubmit={handleSubmit} className="Txt-left form-horizontal">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="username" className="col-form-label">
                            * Username
                        </label>
                        <input type="text" id="username" name="username" required className="form-control"
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="password" className="col-form-label">
                            * Password
                        </label>
                        <input type="password" id="password" name="password" required className="form-control"
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="email" className="col-form-label">
                            Email
                        </label>
                        <input type="text" id="email" name="email" className="form-control"
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="first_name" className="col-form-label">
                            * First Name
                        </label>
                        <input type="text" id="first_name" name="first_name" required className="form-control"
                               onChange={(e) => setFname(e.target.value)}/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="last_name" className="col-form-label">
                            Last Name
                        </label>
                        <input type="text" id="last_name" name="last_name" className="form-control"
                               onChange={(e) => setLname(e.target.value)}/>
                    </div>

                    <div className="col-md-12 mb-3">
                        {info}
                        {err && err.message}
                        <button type="submit" className="btn btn-primary"> OK</button>
                        <a className="btn btn-secondary" href="/">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Register;