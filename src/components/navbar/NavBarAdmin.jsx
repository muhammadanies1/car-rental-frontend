import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBarAdmin(){
    let navigate = useNavigate();

    function toDashboard(events){
        events.preventDefault();
        navigate("/admin/dashboard");
    }

    function toPartner(events){
        events.preventDefault();
        navigate("/admin/partners");
    }

    function toCar(events){
        events.preventDefault();
        navigate("/admin/cars");
    }
    
    function logout(events){
        events.preventDefault();
        navigate("/");
        localStorage.clear();
    }
    let admin = localStorage.getItem("username");
    return(
        <div>
        <>
        <Navbar bg="light" expand="lg" className="navbar-member">
            <Container>
                <Navbar.Brand href="#home">RentCar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={ toDashboard }>Dashboard</Nav.Link>
                            <Nav.Link href="#link">About Us</Nav.Link>
                        </Nav>
                        <Nav className="me-auto">
                            <NavDropdown title={admin} id="basic-nav-dropdown" style={{marginLeft:"680px"}}>
                                <NavDropdown.Item onClick={ toPartner } >Rentals</NavDropdown.Item>
                                <NavDropdown.Item onClick={ toCar }>Cars</NavDropdown.Item>
                                <NavDropdown.Divider />
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