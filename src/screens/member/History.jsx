import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./History.css";
import Kosong from "../../components/helper/Kosong";
let token = localStorage.getItem("token");

function History() {

    const [transaction, setTransaction] = useState([]);
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    useEffect(() => {
        axios.get(`/api/member_transaction/${user_id}`,
        {headers: {Authorization : `Bearer ${token}`}})
            .then(res => {
                setTransaction(res.data.data)
            })

    }, [])

    let i = 0;
    return (
        <>
        <Kosong />
        <p className="pMoreThan" style={{ textAlign:'center', marginLeft:'0px', marginRight:'0px' }}>History Transaction</p>
        <hr className="garis-hr"/>
        <div className="column-history">
            <Table className="table-history" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Rent Name</th>
                        <th>City</th>
                        <th>Total payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody >
                    {transaction.map((value) => {
                        return (
                            value.paid_status == "Finish" ?
                            <tr>
                                <td>{++i}</td>
                                <td>{value.car.partner.partner_name}</td>
                                <td>{value.car.partner.city}</td>
                                <td>{value.total_payment + value.penalty}</td>
                                <td>{value.paid_status}</td>
                            </tr>
                            :
                            ""
                            );
                        })}
                </tbody>
            </Table>
        </div>

        </>
    )
}

export default History;