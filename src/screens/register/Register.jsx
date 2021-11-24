import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, FloatingLabel, Form, Button } from "react-bootstrap";
import "./Register.css";
import Swal from "sweetalert2";


function Register() {
    let navigate = useNavigate();

    const validName = new RegExp('[a-zA-Z]+');
    const validUsername = new RegExp('[A-Za-z0-9]+[@]+[a-z]+[.]+[c][o][m]');
    const validPhoneNumber = new RegExp('\\d+');
    const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*\-\/:-@\\[-`{-~]).{6,64}$');

    const [form, setForm] = useState({
        username: "",
        password: "",
        name:"",
        address:"",
        phone_number:"",
    });

    function formHandler(events){
        console.log(events.target.value);
        return setForm({
            ...form,
            [events.target.name]: events.target.value,
        });
    };

    function toLogin(){
        navigate("/login");
    }

    function registerHandler(events){
        events.preventDefault();
        let username = form.username;
        let password = form.password;
        let name = form.name;
        let address = form.address;
        let phone_number = form.phone_number;

            if(username === "" && password === "" && name ==="" && address==="" && phone_number === ""){
                alert("tidak boleh kosong ya!");
            }else if(!validName.test(name)){
                alert("Nama harus menggunakan huruf");
            }else if(!validUsername.test(username)){
                alert("Username harus menggunakan email");
            }else if(!validPhoneNumber.test(phone_number)){
                alert("nomor telfon harus angka");
            } else if(!validPassword.test(password)){
                alert("Password min 6 karakter 1 Huruf besar, satu simbol dan satu angka")
            } else{
                axios.post(`/api/register`,form).then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Done!',
                        text: 'Your registration success',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    
                    navigate("/login");        
                }, (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Registration Error',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                });
            }
    }

    console.log(form);
    return (
        <Card className="card-daftar">
            <Card.Body>
                <Card.Title className="title-daftar">Create your account</Card.Title>
                <Card.Subtitle className="mb-2 text-muted login-subtitle">Enter your personal details to create account</Card.Subtitle>
                <Form  className="d-grid gap-2">
                    <FloatingLabel controlId="floatingInput" label="Your Name" className="mb-2">
                        <Form.Control name="name" type="text" placeholder="Enter your fullname" onChange={formHandler}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Address" className="mb-2">
                        <Form.Control name="address" type="text" placeholder="Enter your address" onChange={formHandler}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-2">
                        <Form.Control name="phone_number" type="text" placeholder="Enter your phone number" onChange={formHandler}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-2">
                        <Form.Control name="username" type="email" placeholder="Enter your username" onChange={formHandler}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                        <Form.Control name="password" type="password" placeholder="Enter your password" onChange={formHandler}/>
                    </FloatingLabel>
                    <Button variant="primary" size="lg" onClick={registerHandler}> SUBMIT </Button>
                    <div className="to-login" onClick={toLogin}> Have an account? <strong>Login</strong> <i class="fas fa-arrow-right"></i> </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Register;