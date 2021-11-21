import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function SearchBoard(){
    const [cars, setCars] = useState([]);
    
    function buttonSearchHandler(events) {
        axios.get(`/api/car/city/` + search)
            .then(res => {
                setCars(res.data.data)
            }, (error) => {
                // alert("Tidak ada");
            })
    }
    return(

    )
}