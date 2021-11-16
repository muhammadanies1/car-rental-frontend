import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

function FormRentCar(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Form Rent Car </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  className="d-grid gap-2">
                        <FloatingLabel controlId="floatingInput" label="Fullname" className="mb-2">
                            <Form.Control name="fullname" type="text" placeholder="Enter your name" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Address" className="mb-2">
                            <Form.Control name="address" type="text" placeholder="Enter your address" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-2">
                            <Form.Control name="phone" type="text" placeholder="Enter your phone number" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Loan Time" className="mb-2">
                            <Form.Control name="loan" type="number" placeholder="Enter your time loan" />
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