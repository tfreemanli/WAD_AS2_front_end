import React, {useEffect, useState} from 'react';
import axios from "axios";
import myConst from "./MyConst";
import {Link} from "react-router-dom";

function ManageUsers() {

    const [users, setUsers] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: myConst.BaseURL + '/api/users/',
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
          }
        };

        axios.request(config)
        .then((response) => {
          setUsers(response.data);
          //console.log(JSON.stringify(response.data));
          //setMsg('Success.');
        })
        .catch((error) => {
          console.log(error);
          setMsg('Error in Reading Users list.');
        });
    }, []);


    if(!users){
        return (<p>Loading...</p>);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <div className="col-9 border border-1 border-secondary p-2 rounded">
                            <strong>* Users management</strong><br/>
                            {msg}
                        </div>
                    </div>
                    <table className="table table-striped mt-4">
                        <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((usr)=>{
                            if(usr.is_staff){return;}
                            return (
                                <tr key={usr.id}>
                                    <td className="col-sm-1">{usr.username}</td>
                                    <td className="col-sm-1">{usr.first_name}</td>
                                    <td className="col-sm-1">{usr.last_name}</td>
                                    <td className="col-sm-1">{usr.email}</td>
                                    <td className="col-sm-2">
                                        <Link to={"/management/users/" + usr.id} className="primary"><i
                                            className="bi bi-pencil me-2"></i></Link>
                                        <Link to={"/management/users/delete/" + usr.id} className="danger"><i
                                            className="bi bi-trash me-2"></i></Link>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan="5" className="Txt-left">
                                <a href="/management/users/create" className="btn btn-primary"> Add </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;