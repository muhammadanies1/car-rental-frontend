import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import DetailCars from "../../components/modals/DetailCars";
import "./CarApprove.css";


function CarApprove() {
    const [modalShow, setModalShow] = useState(false);
    return(
        <>
            <Button className="balance" variant="secondary" size="lg" disabled>
                Balance: Rp 50.000.000
            </Button>
            <div className="table-cars">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Partner Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => setModalShow(true)}> Details </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            </div>
            <DetailCars show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default CarApprove;