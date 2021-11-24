import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

function CeklistReturn(props) {
    console.log(props.trID);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [choice, setChoice] = useState([]);
    const [total, setTotal] = useState([]);
    let trId = props.trID;
    let token = localStorage.getItem("token");
    
    let result;
    function forTotal(){
        let loopValue = choice.forEach((el) => {
            total.push(el.value);
        })
        
        result = total.reduce((prevs,current) => {
            return prevs+current;
        })
        console.log(result)
        axios.put(`/api/car/waiting/${trId}`, { "penaltyCarCondition": result },
        {headers: {Authorization : `Bearer ${token}`}}
        )
        .then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Done!',
                text: 'Confirmation succes',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
            window.location.reload();
        });
    }

    const [kondisi, setKondisi] = useState([
        {
            id:1,
            kondisi_name: "Are the stnk and key back secure?",
            value: 0,
        },
        {
            id:2,
            kondisi_name: "Is there any scratches on the car body?",
            value: 0,
        },
        {
            id:3,
            kondisi_name: "Are the tires in good condition?",
            value: 0,
        },
    ]);

    function formHandlerYes(events){
        let id = events.target.value;
        let searchData = kondisi.find((el) => el.id == id);
        let found = choice.some((el) => el.id == id);

        if (!found) {
            setChoice(prevValue => {
                prevValue.push(searchData)
                return [...prevValue]
            })
        } else {
            choice.forEach((el, i) => {
                if (el.id == id) {
                    setChoice((prevsValue) => {
                        prevsValue[i].value = 0
                        return [...prevsValue]
                    })
                }
            })
        }
    }
    
    function formHandlerNo(events){
        let id = events.target.value;
        let searchData = kondisi.find((el) => el.id == id);
        let found = choice.some((el) => el.id == id);

        if (!found) {
            setChoice(prevValue => {
                searchData.value = 30000
                prevValue.push(searchData)
                return [...prevValue]
            })
        } else {
            choice.forEach((el, i) => {
                if (el.id == id) {
                    setChoice((prevsValue) => {
                        prevsValue[i].value = 30000
                        return [...prevsValue]
                    })
                }
            })
        }
    }

    console.log(choice);
return (
    <>
        <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title> Return Confirmation </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {kondisi.map((value) => {
                return (
                    <>
                    <Form>
                        <Form.Label>{value.kondisi_name}</Form.Label>
                    <div>
                        <Form.Check inline label="Yes" 
                        name="group1" 
                        type="radio"
                        onChange={formHandlerYes}
                        value={value.id}/>
                        
                        <Form.Check inline label="No" 
                        name="group1" 
                        type="radio" 
                        onChange={formHandlerNo}
                        value={value.id}/>
                    </div>
                    </Form>
                    </>
                );
            })}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            {" "}
            Close{" "}
            </Button>
            <Button variant="primary" onClick={forTotal}> Save Changes
        </Button>
        </Modal.Footer>
        </Modal>
    </>
);
}

export default CeklistReturn;
