import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBarPartner() {
    
    let navigate = useNavigate();

    function toDashboard(events) {
        events.preventDefault();
        navigate("/partner/dashboard");
    }

    function logout(events){
        events.preventDefault();
        navigate("/");
        localStorage.clear();
    }

    function toReturnboard(events) {
        events.preventDefault();
        navigate("/partner/returncar");
    }
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
                            <NavDropdown title="Member Name" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" >Partner Name</NavDropdown.Item>
                                <NavDropdown.Item onClick={ toReturnboard }>MyRent</NavDropdown.Item>
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

export default NavBarPartner;