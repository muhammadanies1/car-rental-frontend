import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import "./ReturnCar.css";
import CeklistReturn from "../../components/modals/CeklistReturn";
import { useNavigate } from "react-router-dom";

function ReturnCar(){

    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState([]);
    const [partner, setPartner] = useState({});
    const [cars, setCars] = useState([]);
    let navigate = useNavigate();
    let token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [transID, setTransID] = useState(0);

    useEffect(() => {
        axios.get(`/api/partner/user/${user_id}`,
        {headers: {Authorization : `Bearer ${token}`}}
        )
            .then(res => {
                setPartner(res.data.data)
                axios.get(`/api/transaction/partner/${res.data.data.partner_id}`,
                {headers: {Authorization : `Bearer ${token}`}}
                )
                .then(res => {
                    setTransaction(res.data.data);
                })
            })
            
    }, [dispatch])

    console.log(transaction);
    

    function detailModal(transaction_id){
        setTransID(transaction_id);
        setModalShow(true);
    }

    console.log(transID);
    return(
        <>
        <p className="pMoreThan" style={{ textAlign:'center', marginLeft:'0px', marginRight:'0px' }}>Partner Transaction</p>
        <hr className="garis-hr"/>
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
                            <>
                            <Button variant="primary" size="sm" onClick={()=> detailModal(value.transaction_id) }>
                                Detail
                            </Button>
                            </>
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
        <CeklistReturn trID={transID} show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}

export default ReturnCar;