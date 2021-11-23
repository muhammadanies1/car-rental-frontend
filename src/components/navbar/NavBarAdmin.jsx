import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavBarAdmin(){
    let navigate = useNavigate();
    let username = localStorage.getItem("username");

    function toDashboard(events){
        events.preventDefault();
        navigate("/admin/dashboard");
    }

    function toPartner(events){
        events.preventDefault();
        navigate("/admin/allpartners");
    }

    function toCar(events){
        events.preventDefault();
        navigate("/admin/allcars");
    }
    
    function logout(events){
        events.preventDefault();
        navigate("/");
        localStorage.clear();
    }
    return(
        <div>
        <>
        <Navbar bg="light" expand="lg" className="navbar-member">
            <Container>
                <Navbar.Brand href="#home">RentCar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navbar-ul">
                            <Nav.Link onClick={ toDashboard }>Dashboard</Nav.Link>
                            <NavDropdown title="Admin" id="basic-nav-dropdown" >
                                <NavDropdown.Item disabled > { username } </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ toPartner } >Rentals</NavDropdown.Item>
                                <NavDropdown.Item onClick={ toCar }>Cars</NavDropdown.Item>
                                <NavDropdown.Item onClick={ logout }>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
        </div>
    )
}

export default NavBarAdmin;