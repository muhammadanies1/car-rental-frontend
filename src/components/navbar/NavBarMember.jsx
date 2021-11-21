import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavBarMember(){
    
    let navigate = useNavigate();
    let username = localStorage.getItem("username");

    function toDashboard(events) {
        events.preventDefault();
        navigate("/member/dashboard");
    }

    function toHistory(events) {
        events.preventDefault();
        navigate("/member/history");
    }

    function joinPartner(events){
        events.preventDefault();
        navigate("/partner/register");
    }
    
    function logout(events){
        events.preventDefault();
        navigate("/");
        localStorage.clear();
    }

    return (

        <div>
        <>
        <Navbar bg="light" variant="light" expand="lg" className="navbar-member">
            <Container>
                <Navbar.Brand href="#home"><h4>RentCar</h4></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navbar-ul">
                            <Nav.Link onClick={ toDashboard }>Dashboard</Nav.Link>
                            <Nav.Link href="#link">About Us</Nav.Link>
                            <NavDropdown title="Member" id="basic-nav-dropdown">
                                <NavDropdown.Item disabled >{ username }</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ joinPartner } >Join Partner</NavDropdown.Item>
                                <NavDropdown.Item onClick={ toHistory }>History</NavDropdown.Item>
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

export default NavBarMember;