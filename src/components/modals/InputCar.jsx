import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

function InputCar(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Form Input New Car </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  className="d-grid gap-2">
                        <FloatingLabel controlId="floatingInput" label="Car Merk" className="mb-2">
                            <Form.Control name="merk" type="text" placeholder="Enter your merk name" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Stnk Number" className="mb-2">
                            <Form.Control name="stnk" type="text" placeholder="Enter your stnk number" />
                        </FloatingLabel>
                        <Form.Control name="image" type="file" placeholder="Choose your car photos" />
                        <FloatingLabel controlId="floatingInput" label="Description" className="mb-2">
                            <Form.Control name="loan" type="text" placeholder="Enter your car description" />
                        </FloatingLabel>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InputCar;