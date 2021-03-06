import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { carActions } from "../../store/car";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function InputCar(props) {
    console.log(props.partner.partner_id);
    let navigate = useNavigate();
    const listCar = useSelector((state) => state.car);
    const dispatch = useDispatch();
    let token = localStorage.getItem("token");
    let [image, setImage] = useState();
    const [photo, setPhoto] = useState({
        images:"",
    });

    const[dataPhotos, setDataPhotos] = useState();

    const [car, setCar] = useState({
        merk: "",
        stnk_number: "",
        description:"",
        images:{},
        price:"",
    });

    function formHandler(events){
        console.log(events.target.value);
        return setCar({
            ...car,
            [events.target.name]: events.target.value,
        });
    };

    function imageHandler(events){
        const filename = events.target.value.replace(/^.*\\/, "");
        setCar((prevsValue)=>{
            return {
                ...prevsValue,
                [events.target.name] :events.target.files[0]
            }
        })
        setImage(events.target.files[0]);
    }

    function inputHandler(events){
        events.preventDefault();
        const formData = new FormData();
        formData.append('images', image);
        formData.append('merk', car.merk);
        formData.append('stnk_number', car.stnk_number);
        formData.append('description', car.description);
        formData.append('price', car.price);
        console.log(props);
        let partner_id = props.partner.partner_id
        console.log(props.partner.partner_id);
        console.log(formData);
        axios.post(`/api/car/add/${partner_id}`, formData ,
        {headers: {Authorization : `Bearer ${token}`}}
        )
        .then((res)=>{
            
            Swal.fire({
                icon: 'success',
                title: 'Done!',
                text: 'Success add new car',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
                axios.get(`/api/car/${props.partner.partner_id}`,
                {headers: {Authorization : `Bearer ${token}`}}
                )
                .then(res =>{
                    dispatch(carActions.getCarByPartner(res.data))
                    props.setUlang(res.data.data)
                    console.log("ok")
                })
            props.onHide();
        })
        .catch(err => {
            alert(err)
        })
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Form Input New Car </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  className="d-grid gap-2" onSubmit={inputHandler}>
                        <FloatingLabel controlId="floatingInput" label="Car Merk" className="mb-2">
                            <Form.Control name="merk" type="text" placeholder="Enter your merk name" onChange={formHandler}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Stnk Number" className="mb-2">
                            <Form.Control name="stnk_number" type="text" placeholder="Enter your stnk number" onChange={formHandler}/>
                        </FloatingLabel>
                        <Form.Control name="images" maxLength="20" type="file" placeholder="Choose your car photos" onChange={imageHandler}/>
                        <FloatingLabel controlId="floatingInput" label="Description" className="mb-2">
                            <Form.Control name="description" type="text" placeholder="Enter your car description" onChange={formHandler}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Price" className="mb-2">
                            <Form.Control name="price" type="text" placeholder="Enter your car price" onChange={formHandler}/>
                        </FloatingLabel>
                        <Button  type="submit">Save</Button>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>
    );
}

export default InputCar;