import { Button } from "react-bootstrap";
import { useState,useEffect } from 'react';
import "./Balance.css";
import axios from "axios";

function Balance() {
    let user_id = JSON.parse(localStorage.getItem("user_id"));
    const [cars, setCars] = useState({});
    let token = localStorage.getItem("token");
    let headers = { 'Authorization': 'Bearer ' + token };
    const requestOptions = {
        headers: headers,
    };

    useEffect(() => {
        axios.get(`/api/user/${user_id}`, requestOptions).then(res => {
            setCars(res.data.data)
        })
    },[setCars]);

    return(
        <>
        <Button className="container-balance" variant="secondary" size="lg" disabled>
            Balance: Rp {cars.balance}
        </Button>
        </>
    )
}

export default Balance;