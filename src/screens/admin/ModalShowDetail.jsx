import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ModalShowDetail(props) {
    let navigate = useNavigate();
    const transactionId = props.transaction_id;
    function updateBalance() {
        axios
        .put("/api/transaction/finish/"+ transactionId)
        .then((res)=>{
            alert("berhasil update balance")
            window.location.reload();
            navigate("/admin/transaction");
        })
    }
    let image =  props.detailcar.image;
    let paidStatus = props.paid_status;
    let description = props.detailcar.description;
    let merk = props.detailcar.merk;
    let stnk_number = props.detailcar.stnk_number;
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  className="d-grid gap-2">
                        <FloatingLabel controlId="floatingInput" label="Merk" className="mb-2">
                            <Form.Control name="merk" type="text" value={merk} disabled/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Stnk Number" className="mb-2">
                            <Form.Control name="stnk" type="text" value={stnk_number} disabled />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput"className="mb-2">
                            <img
                            src={image}
                            alt="Gambar blom ada"
                            height="200px"
                            width="100%"
                            className="mt-4"
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Description" className="mb-2">
                        <Form.Label></Form.Label>
                            <Form.Control as="textarea" rows={5} value={description} disabled/>
                        </FloatingLabel>
                      
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                {paidStatus === "Paid off" ?
                (
                    <Button onClick={updateBalance}>Accept</Button>
                )
                :
                (
                    ""
                )
                }
               
            </Modal.Footer>
        </Modal>
    );
}

export default ModalShowDetail;