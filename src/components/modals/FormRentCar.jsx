import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

import { useState } from "react";

function FormRentCar(props) {
    const [form, setForm] = useState(0);
    let user_id = localStorage.getItem("user_id");
    console.log(user_id);

    function formHandler(events){
        console.log(events.target.value);
        return setForm({
            ...form,
            [events.target.name]: events.target.value,
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
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormRentCar;