import { Button, FormControl, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SearchBoard from "./SearchBoard";

function ButtonSearchBoard(props) {
    console.log(props.search);

    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");

    function buttonSearchHandler(events) {
        axios.get(`/api/car/city/` + search)
            .then(res => {
                props.setCars(res.data.data)
            }, (error) => {
                alert("Masukan data pencarian");
            })
    }

    function searchHandler(events) {
        setSearch(events.target.value);
    };

    return (
        <div>
            <Form className="d-flex search-input">
                <FormControl type="search" placeholder="I need a car at" className="me-2" aria-label="Search" onChange={searchHandler} />
                <Button variant="outline-success" onClick={buttonSearchHandler}> Search </Button>
                {/* <SearchBoard cars={cars}/> */}
            </Form>
        </div>
    )
}

export default ButtonSearchBoard;