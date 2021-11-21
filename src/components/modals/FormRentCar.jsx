import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function FormRentCar(props) {
    let carID = props.carId;
    let userID = props.userId;
    let navigate = useNavigate();

    const [form, setForm] = useState({
        loan_time:"",
        booking_date:"",
        user:{user_id: 0},
        car:{car_id: 0}
    });

    function addTransaction(){
        console.log(form);
        axios.post(`/api/membertransaction/add`,form).then((res) => {
            alert("Transaksi berhasil ditambahkan!");
            navigate("/member/dashboard");
            window.location.reload();
            
        });
    }

    function formHandler(events){
        console.log(events.target.value);
        return setForm({
            ...form,
            [events.target.name]: events.target.value,
            user:{user_id: userID},
            car:{car_id: carID}
        });
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Form Rent Car </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  className="d-grid gap-2">
                <FloatingLabel controlId="floatingInput" label="Loan Time" className="mb-2">
                    <Form.Control name="loan_time" type="number" placeholder="Enter loan time" onChange={formHandler} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Booking Date" className="mb-2">
                    <Form.Control name="booking_date" type="date" placeholder="Enter booking date"onChange={formHandler} />
                </FloatingLabel>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ addTransaction }>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormRentCar;