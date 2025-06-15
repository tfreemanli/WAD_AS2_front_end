import axios from "axios";
import MyConst from "./MyConst";
import React, {useState} from "react";

function Logout() {

    const [err, setErr] = useState('');

    function handleSubmit(event) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: MyConst.BaseURL + '/api/auth/logout/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setErr("Logout success.");
                localStorage.removeItem("token");
                window.location.href = "/";
            })
            .catch((error) => {
                console.log(error);
                setErr("Logout failure.");
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="col-4 border border-1 border-secondary p-4 rounded">
                <div><h1>Logout</h1></div>

                    <div className="col-md-12 mb-3">
                        {err || err.message}
                        <input type="button" value="Logout" onClick={handleSubmit}/>
                    </div>
            </div>
        </div>


    );
}

export default Logout;