import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyConst from "./MyConst";

function ManageRooms() {
    const [rooms, setRooms] = useState([]);
    const [err, setErr] = useState("");
    const [orderBy, setOrderBy] = useState("room_number");
    const [sortDirection, setSortDirection] = useState('desc');


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
    },[]);

    const sortedRooms = [...rooms].sort((a, b) => {
        if (!orderBy) return 0; // 如果不排序，保持原顺序

        // 获取比较值
        const valueA = a[orderBy];
        const valueB = b[orderBy];

        // 数字排序
        if (typeof valueA === 'number') {
            return sortDirection === 'asc'
                ? valueA - valueB
                : valueB - valueA;
        }

        // 字符串排序
        if (typeof valueA === 'string') {
            return sortDirection === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }

        return 0;
    });

    // 切换排序字段和方向
    const handleSort = (field) => {
        if (orderBy === field) {
            // 如果点击已选字段，切换方向
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            // 如果点击新字段，设置字段并重置方向
            setOrderBy(field);
            setSortDirection('asc');
        }
    };

    if (!rooms) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center ">
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <div className="col-9 border border-1 border-secondary p-2 rounded">
                            <strong>* Room management</strong>
                            {err instanceof Error && <p>{err.message}</p>}
                        </div>
                    </div>

                    <table className="table table-striped mt-4">
                        <thead>
                        <tr>
                            <th scope="col"><Link onClick={()=>handleSort('title')}>Title</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('room_number')}>Room Number</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('desc')}>Description</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('updated_at')}>Action</Link></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedRooms.map((room) => (
                            <tr key={room.id}>
                                <td>{room.title}</td>
                                <td>{room.room_number}</td>
                                <td>{room.desc}</td>
                                <td>
                                    <Link to={'/management/rooms/' + room.id}><i
                                        className="bi bi-pencil me-2"></i></Link>
                                    <Link to={'/management/rooms/delete/' + room.id}><i
                                        className="bi bi-trash me-2"></i></Link>
                                    {/*<a href="{% url 'management_room_delete' room.id %}"><i*/}
                                    {/*    className="bi bi-trash me-2"></i></a>*/}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" style={{textAlign: 'left'}}>
                                <Link to="/management/rooms/create" className="btn btn-primary">Add</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageRooms;