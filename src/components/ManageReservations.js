import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function ManageReservations() {

    const [reservations, setReservations] = useState(null);
    const [err, setErr] = useState("");
    const [orderBy, setOrderBy] = useState("updated_at");
    const [sortDirection, setSortDirection] = useState('desc');

    useEffect(() => {
        fetch('https://wad-as-2-backend.vercel.app/api/reservations/')
            .then(response => response.json())
            .then(data => setReservations(data !== null ? data : []))
            .catch(err => setErr(err));
    }, []);

    let sortedReservations = [];
    if(reservations) {
        sortedReservations = [...reservations].sort((a, b) => {
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
    }

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

    if (!reservations) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center ">
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <div className="col-9 border border-1 border-secondary p-2 rounded">
                            <strong>* Reservation management</strong>
                            {err instanceof Error && <p>{err.message}</p>}
                        </div>
                    </div>

                    <table className="table table-striped mt-4">
                        <thead>
                        <tr>
                            <th scope="col"><Link onClick={()=>handleSort('title')}>Title</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('client')}>Client</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('creator')}>Created By</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('room')}>Room</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('check_in_datetime')}>Check In</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('check_out_datetime')}>Check Out</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('desc')}>Description</Link></th>
                            <th scope="col"><Link onClick={()=>handleSort('updated_at')}>Action</Link></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedReservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.title}</td>
                                <td>{reservation.client_fname} {reservation.client_lname}</td>
                                <td>{reservation.creator_fname} {reservation.creator_lname}</td>
                                <td>{reservation.room_name}</td>
                                <td>{reservation.check_in_datetime}</td>
                                <td>{reservation.check_out_datetime}</td>
                                <td>{reservation.desc}</td>
                                <td>
                                    <Link to={'/management/reservations/' + reservation.id}><i
                                        className="bi bi-pencil me-2"></i></Link>
                                    <Link to={'/management/reservations/delete/' + reservation.id}><i
                                        className="bi bi-trash me-2"></i></Link>
                                    {/*<a href="{% url 'management_reservation_delete' reservation.id %}"><i*/}
                                    {/*    className="bi bi-trash me-2"></i></a>*/}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" style={{textAlign: 'left'}}>
                                <Link to="/management/reservations/create" className="btn btn-primary">Add</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageReservations;