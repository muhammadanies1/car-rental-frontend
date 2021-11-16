import { Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Register.css";


function Register() {
    let navigate = useNavigate();

    function toLogin(){
        navigate("/");
    }

    return (
        <Card className="card-daftar">
            <Card.Body>
                <Card.Title className="title-daftar">Create your account</Card.Title>
                <Card.Subtitle className="mb-2 text-muted login-subtitle">Enter your personal details to create account</Card.Subtitle>
                <Form  className="d-grid gap-2">
                    <FloatingLabel controlId="floatingInput" label="Your Name" className="mb-2">
                        <Form.Control type="text" placeholder="Enter your fullname" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Address" className="mb-2">
                        <Form.Control type="text" placeholder="Enter your address" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-2">
                        <Form.Control type="text" placeholder="Enter your phone number" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-2">
                        <Form.Control type="email" placeholder="Enter your username" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                        <Form.Control type="password" placeholder="Enter your password" />
                    </FloatingLabel>
                    <Button variant="primary" size="lg"> SUBMIT </Button>
                    <div className="to-login" onClick={toLogin}> Have an account? <strong>Login</strong> <i class="fas fa-arrow-right"></i> </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Register;