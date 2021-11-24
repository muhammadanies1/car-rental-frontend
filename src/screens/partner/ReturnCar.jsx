import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import "./ReturnCar.css";
import { useNavigate } from "react-router-dom";

function ReturnCar(props){

    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState([]);
    const [partner, setPartner] = useState({});
    const [cars, setCars] = useState([]);
    let navigate = useNavigate();
    let token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    let headers = { 'Authorization': 'Bearer ' + token };
    const requestOptions = {
        headers: headers,
    };
    useEffect(() => {
        axios.get(`/api/partner/user/${user_id}`,requestOptions)
            .then(res => {
                setPartner(res.data.data)
                axios.get(`/api/transaction/partner/${res.data.data.partner_id}`,requestOptions)
                .then(res => {
                    setTransaction(res.data.data);
                })
            })
            
    }, [dispatch])

    console.log(transaction);
    
    function updateStatusReturnCar(transaction_id) {
        // axios.put("/api/car/waiting/" + transaction_id).then((res) => {
        //     console.log(res);
        //     window.location.reload();
        // });
    }

    return(
        <>
        <div className="container-return">
        <Table className="table-cars" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Car Merk</th>
                        <th>Partner Name</th>
                        <th>Total payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {transaction.map((value,index)=>{
                        return (
                            <tr>
                        <td>{index +1}</td>
                        <td>{value.car.merk}</td>
                        <td>{value.car.partner.partner_name}</td>
                        <td>Rp. {value.total_payment + value.penalty}</td>
                        <td>{value.paid_status}</td>
                        <td>
                            {value.paid_status === "Return"
                            ?
                            <Button variant="primary" size="sm" onClick={()=> updateStatusReturnCar(value.transaction_id)}>
                                {value.paid_status}
                            </Button>
                            :
                            value.paid_status == "Finish"
                            ?
                            <>Transaction is complete</>
                            :
                            <p></p>
                        }
                        </td>
                    </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default ReturnCar;