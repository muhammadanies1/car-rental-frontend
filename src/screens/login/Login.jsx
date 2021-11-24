import { useState } from "react";
import { Card, Button, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginActions } from "../../store/login";
import { LoginApi } from "../../api/AuthApi";
import Swal from "sweetalert2";

function Login() {
    
    const isLogin = useSelector((state) => {
        return state.login.isLogin;
    });

    let navigate = useNavigate();
    const dispatch = useDispatch();
        
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
            Swal.fire({
                icon: 'info',
                title: 'Attention...',
                text: 'username and password cannot be empty!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        } else{
            LoginApi(form).then((response) => {
                let token = response.data.data;
                dispatch(loginActions.login(token));
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: 'Your login success',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed!',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            })
        }
    }   

    function toRegister(events){
        events.preventDefault();
        navigate("/register");
    }

    return(
        <>
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
                    <div className="forget-pass"> Register here to join as member <i class="fas fa-arrow-right"></i> </div>
                    <Button variant="outline-primary" size="lg" className="register-new" onClick={toRegister}> Register New Account </Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}

export default Login;