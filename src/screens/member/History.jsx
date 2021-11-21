import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./History.css";

function History() {

    const [transaction, setTransaction] = useState([]);
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    useEffect(() => {
        axios.get(`/api/member_transaction/${user_id}`)
            .then(res => {
                // console.log(res);
                setTransaction(res.data.data)
                // console.log(res.data);
            })

    }, [])

    let i = 0;
    return (
        <>
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

        {/* // <Card className="card-car" style={{ width: '25rem' }}>
        //     <Card.Img className="card-img" variant="top" src={value.car.image} />
        //     <Card.Body>
        //         <Row>
        //             <Col>
        //                 <Card.Title className="car-name">{value.car.merk}</Card.Title>
        //                 <Card.Subtitle className="card-subtitle">{value.car.partner.city}, {value.car.partner.partner_name}</Card.Subtitle>
        //             </Col>
        //             <Col md="auto">
        //                 <Card.Text className="car-price"> Rp {value.car.price} </Card.Text>
        //                 <span>{value.paid_status}</span>
        //                 </Col>
        //         </Row>
        //     </Card.Body>
        // </Card> */}

        </>
    )
}

export default History;