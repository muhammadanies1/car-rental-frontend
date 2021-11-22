import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./DashboardAdmin.css";
import CardTransactionAdmin from "./CardTransactionAdmin";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function DashboardAdmin () {
    let navigate = useNavigate();
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [user, setUser] = useState({});
    function toPartners(){
        navigate("/admin/partners");
    }

    function toCars(){
        navigate("/admin/cars");
    }
    
    useEffect(() => {
        axios.get(`/api/user/${user_id}`)
                    .then(res => {
                        console.log(res.data.data);
                        setUser(res.data.data)
                        // setIsLoading(false);
                    })
    },[setUser])
    return (
        <>
        <div id="container-dashboardAdmin">
            <Button className="balance" variant="secondary" size="lg" disabled>
                Balance: Rp {user.balance}
            </Button>
            <hr />
            <div className="flex-container">
                <Card className="card-approve-partner" onClick={toPartners}>
                    <Card.Body>
                        <p>Partner</p>
                        <div className="total">
                        </div>
                    </Card.Body>
                </Card>
                <Card className="card-approve-car" onClick={toCars}>
                    <Card.Body>
                        <p>Car</p>
                        <div className="total">
                        </div>
                    </Card.Body>
                </Card>
                <CardTransactionAdmin/>
            </div>    
        </div>
        </>
    )
}

export default DashboardAdmin;