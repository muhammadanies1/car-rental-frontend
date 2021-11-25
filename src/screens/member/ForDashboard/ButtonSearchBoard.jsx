import { Button, FormControl, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import SearchBoard from "./SearchBoard";
import "./CustomDashboard.css";
import Swal from "sweetalert2";
let token = localStorage.getItem("token");

function ButtonSearchBoard(props) {
    console.log(props.search);

    const [search, setSearch] = useState("");

    function buttonSearchHandler(events) {
        axios.get(`/api/car/city/` + search,
        {headers: {Authorization : `Bearer ${token}`}})
            .then(res => {
                if(res.data.data.length  !== 0){
                    props.setCars(res.data.data)
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'data not found!',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });    
                }
            }, (error) => {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: 'please enter city name!',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            })
    }

    function searchHandler(events) {
        setSearch(events.target.value);
    };

    return (
        <div className="input-search">
            <Form className="d-flex search-input">
                <FormControl type="search" placeholder="I need a car at" className="me-2" aria-label="Search" onChange={searchHandler} />
                <Button variant="outline-success" onClick={buttonSearchHandler}> Search </Button>
            </Form>
        </div>
    )
}

export default ButtonSearchBoard;