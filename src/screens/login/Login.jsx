import axios from "axios";
import { useState } from "react";
import { Card, Button, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Login.css";

function Login(){

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const state = useSelector((state) => {
        return state.login;
    });
    
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    function formHandler(events){
        console.log(events.target.value);
        return setForm({
            ...form,
            [events.target.name]: events.target.value,
        });
    };

    function loginHandler(events){
        events.preventDefault();
        let username = form.username;
            let password = form.password;

            if(username === "" && password === ""){
                alert("tidak boleh kosong ya!");
            } else{
                axios.post(`/api/authenticate`,form).then((response) => {
                    let token = response.data.data;
                    localStorage.setItem("token", token);
                    
                    let decoded = jwt_decode(token);
                    localStorage.setItem("username", decoded.sub);
                    localStorage.setItem("user_id", decoded.user_id);
                    localStorage.setItem("role_id", decoded.role_id);
                    alert("Login berhasil.")
                    navigate("/member/dashboard");        
                }, (error) => {
                    alert("Username atau password salah!");
                });
            }
    }   

    function toRegister(events){
        events.preventDefault();
        navigate("/register");
    }

    return(
        <div className="container">
            <Card className="card-login">
                <Card.Body>
                    <Card.Title className="login-title">Login</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted login-subtitle">Sign in to yout account</Card.Subtitle>
                    <Form  className="d-grid gap-2">
                        <FloatingLabel controlId="floatingInput" label="Username" className="mb-2">
                            <Form.Control name="username" type="email" placeholder="Masukkan Username" onChange={formHandler}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2" onChange={formHandler}>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </FloatingLabel>
                        <Button variant="primary" size="lg" onClick={loginHandler}> Login </Button>
                        <div className="forget-pass"> I forgot my password. Click here to reset. <i class="fas fa-arrow-right"></i> </div>
                        <Button variant="outline-primary" size="lg" className="register-new" onClick={toRegister}> Register New Account </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login;