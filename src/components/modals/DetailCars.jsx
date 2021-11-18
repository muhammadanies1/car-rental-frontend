import axios from "axios";
import { Button, Modal, Form, FloatingLabel, Card} from "react-bootstrap";
import {useState , useEffect} from "react";
function DetailCars(props){
    // console.log(props.car_id);
    // const partnerId = props.car_id;
    const [Car, setCar] = useState([]);
    useEffect(() => {
        // console.log(props.car_id);
        axios.get(`/api/car/${props.car_id}`)
        .then((res) => {
            // console.log(res.data.data);
            // car = res.data.data;
            setCar(...res.data.data);
        })
    });

    console.log(Car);
    return(
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Cars need approve </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  className="d-grid gap-2">
                        <FloatingLabel controlId="floatingInput" label="brand" className="mb-2">
                            <Form.Control name="brand" type="text" value={Car.merk}/>
                        </FloatingLabel>
                        <Card>
                            <Card.Body disabled>
                            <img
                                src={Car.image}
                                alt="Gambar blom ada"
                                height="300px"
                                width="100%"
                                className="mt-4"
                                />
                            </Card.Body>
                        </Card>
                        <FloatingLabel controlId="floatingInput" label="stnk number" className="mb-2">
                            <Form.Control name="stnk" type="text" disabled value={Car.stnk_number}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="description" className="mb-2">
                            <Form.Control as="textarea" rows={5} name="description" disabled value={Car.description}/>
                        </FloatingLabel>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Approve</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailCars;