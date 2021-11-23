import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function CeklistReturn(props) {
    // console.log(props.trID);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [choice, setChoice] = useState([]);
    const [total, setTotal] = useState([]);
    
    const [payloadPinalty, setPayloadPinalty] = useState({
        penalty:0,
    });
    
    let result;
    function forTotal(){
        let loopValue = choice.forEach((el) => {
            total.push(el.value);
        })
        result = total.reduce((prevs,current) => {
            return prevs+current;
        })
        
        // setPinalty(result);
        setPayloadPinalty({
            penalty:result,
        });

        axios.put(`/api/car/waiting/${props.trID}`,payloadPinalty)
        .then((res) => {
            window.location.reload();
        });

    }

    // function updateStatusReturnCar(transaction_id) {
    //     axios.put("/api/car/waiting/" + transaction_id).then((res) => {
    //         window.location.reload();
    //     });
    // }



    const [kondisi, setKondisi] = useState([
        {
            id:1,
            kondisi_name: "Apakah surat dan kunci kembali?",
            value: 0,
        },
        {
            id:2,
            kondisi_name: "Apakah ada body mobil Anda ada yang lecet atau penyok?",
            value: 0,
        },
        {
            id:3,
            kondisi_name: "Apakah ban dalam kondisi baik baik saja?",
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
                searchData.value = 20
                prevValue.push(searchData)
                return [...prevValue]
            })
        } else {
            choice.forEach((el, i) => {
                if (el.id == id) {
                    setChoice((prevsValue) => {
                        prevsValue[i].value = 20
                        return [...prevsValue]
                    })
                }
            })
        }
    }

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
