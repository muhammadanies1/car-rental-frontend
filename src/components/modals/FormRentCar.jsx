import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'  
import moment from 'moment';
import Swal from "sweetalert2";

function FormRentCar(props) {
    let carID = props.carId;
    let userID = props.userId;
    let navigate = useNavigate();
    let token = localStorage.getItem("token");
    
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setselectedDate] = useState("");
    const [form, setForm] = useState({
        loan_time:"",
        booking_date:"",
        user:{user_id: 0},
        car:{car_id: 0}
    });

    function addTransaction(){
        if(form.loan_time === "" && form.booking_date === ""){
            Swal.fire({
                icon: 'info',
                title: 'Attention...',
                text: 'Please input loan day and booking date',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }else{
            console.log(form);
            axios.post(`/api/membertransaction/add`,form ,
            {headers: {Authorization : `Bearer ${token}`}}
            ).then((res) => {
                alert("Transaksi berhasil ditambahkan!");
                navigate("/member/dashboard");
                window.location.reload();
                
            });
        }
    }

    function dateHandler(events){
        setForm(()=>{
            setselectedDate(events);
            return(
                {
                    ...form,
                    user:{user_id: userID},
                    car:{car_id: carID},
                    booking_date:moment(new Date(events)).format("YYYY-MM-DD"), //ubah format new date ke string 2021-11-23
                }
            )
        })
    }

    function loanTimeHandler(events){

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
                <FloatingLabel controlId="floatingInput" label="Loan Day" className="mb-2">
                    <Form.Control name="loan_time" type="number" placeholder="Enter loan day" onChange={loanTimeHandler} />
                </FloatingLabel>
                    <DatePicker 
                    name="booking_date"
                    placeholderText="Please Select A Date"
                    selected={selectedDate}
                    dateFormat="yyyy-MM-dd"
                    onChange={dateHandler}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 7)} />
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ addTransaction }>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormRentCar;