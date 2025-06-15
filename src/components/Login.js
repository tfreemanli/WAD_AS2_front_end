import React, {useContext, useState} from "react";
import myConst from "./MyConst";
import axios from "axios";
import {AuthContext} from "../AuthContext";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [info, setInfo] = useState('');
    const { myLogin } = useContext(AuthContext);

    function handleSubmit(event) {

        setErr("Logining... please wait.");

        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: myConst.BaseURL + '/api/auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                (async () => {
                    await myLogin(response.data.token);
                    window.location.href = "/";
                })();
                //setInfo(response.data.token);

            })
            //.then(()=> window.location.href = "/")
            .catch((error) => {
                console.log(error);
                setErr("Login Error.");
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="col-4 Txt-left border border-1 border-secondary p-4 rounded">
                <div><h2>Login</h2></div>


                    <div className="form-group row">
                        <label htmlFor="username" className="col-12 col-form-label Txt-left">
                            Username
                        </label>
                        <div className="col-12">
                            <input type="text"  name="username" id="username" className="form-control" required
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password" className="col-12 col-form-label Txt-left">
                            Password
                        </label>
                        <div className="col-12">
                            <input type="password" name="password" id="password"
                                   className="form-control"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        {err}
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}> OK</button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Login;