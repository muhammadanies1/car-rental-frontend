import { Button } from "react-bootstrap";
import { useState,useEffect } from 'react';
import "./Balance.css";
import axios from "axios";

function Balance() {
    let user_id = JSON.parse(localStorage.getItem("user_id"));
    const [cars, setCars] = useState({});

    useEffect(() => {
        axios.get(`/api/user/${user_id}`).then(res => {
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