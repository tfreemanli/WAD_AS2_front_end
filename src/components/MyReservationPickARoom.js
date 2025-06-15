import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyConst from "./MyConst";

function MyReservationPickARoom() {
    const [rooms, setRooms] = useState(null);
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");
    const [orderBy, setOrderBy] = useState("updated_at");
    const [sortDirection, setSortDirection] = useState('desc');
    // const [sortedRooms, setSortedRooms] = useState(null);

    const [startDT, setStartDT] = useState("");
    const [endDT, setEndDT] = useState("");
    // const [count, setCount] = useState(0);

    useEffect(() => {
        let config = {
            method: 'get',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            }
        };
        fetch(MyConst.BaseURL + '/api/rooms/', config)
            .then(response => response.json())
            .then(data => setRooms(data !== null ? data : []))
            .catch(err => setErr(err));
    }, []);

    // useMemo(()=>{
    //     if(rooms) {
    //         setCount(rooms.length);
    //     }
    // },[rooms]);


    const sortedRooms = useMemo(() => {
        if (!rooms) return null;
        return [...rooms].sort((a, b) => {

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
    }, [rooms, orderBy, sortDirection]);


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

    const validateForm = () => {

        if (!startDT) {
            setErr({message: "Please select a Check-In datetime."});
            return false;
        }
        if (!endDT) {
            setErr({message: "Please select a Check-Out datetime."});
            return false;
        }

        // 转换为Date对象进行比较
        const startDate = new Date(startDT);
        const endDate = new Date(endDT);
        const now = new Date();

        // 验证逻辑
        if (startDate >= endDate) {
            setErr({message: 'Check-Out date must be after Check-In date.'});
            return;
        }

        if (startDate < now) {
            setErr({message: 'Check-In date cannot be in the past.'});
            return;
        }
        return true;
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const getstr = MyConst.BaseURL + "/api/pickaroom/?startDT=" + startDT + "&endDT=" + endDT;


        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            }
        };

        fetch(getstr, requestOptions)
            .then((response) => response.json())
            .then(data => {
                //sortedRooms = (data !== null ? data : []);
                setRooms(data !== null ? data : []);
                console.log(getstr);
                setInfo("Search successfully.");
                setErr(null);
            })
            .catch((error) => {
                setErr(error);
                setInfo(null);
            });


    };

    if (!sortedRooms) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center ">
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <div className="col-11 border border-1 border-secondary p-2 rounded">
                            <strong>* Pick A Room</strong>
                        </div>
                    </div>

                    <div className=" Txt-left">
                        <form onSubmit={handleSubmit} className="form-horizontal">
                            <div className="row col-sm-12 mt-4"><p>Pick your CheckIn and CheckOut date and time.</p>
                            </div>
                            <div>
                                Check In :<input type="datetime-local" name="startDT" id="startDT"
                                                 onChange={(e) => setStartDT(e.target.value)}/>
                                Check Out:<input type="datetime-local" name="endDT" id="endDT"
                                                 onChange={(e) => setEndDT(e.target.value)}/>
                                <input className="btn btn-primary" type="submit" value="Check Available"/>
                            </div>
                        </form>
                        <div>
                            <strong>{err && err.message && <p style={{'color': 'red'}}>{err.message}</p>}{info}</strong> Available Room Count: {rooms.length}
                        </div>
                    </div>

                    <table className="table table-striped mt-4">
                        <thead>
                        <tr>
                            <th scope="col"><Link onClick={() => handleSort('title')}>Title</Link></th>
                            <th scope="col"><Link onClick={() => handleSort('room_number')}>Room Number</Link></th>
                            <th scope="col"><Link onClick={() => handleSort('desc')}>Description</Link></th>
                            <th scope="col"><Link onClick={() => handleSort('updated_at')}>Action</Link></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedRooms.map((room) => (
                            <tr key={room.id}>
                                <td>{room.title}</td>
                                <td>{room.room_number}</td>
                                <td>{room.desc}</td>
                                <td>{info &&
                                    <Link to={'/booking/create/?id=' + room.id + '&startDT='+ startDT +'&endDT=' + endDT} className="btn btn-primary">Pick Me</Link> }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyReservationPickARoom;