import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavBarPartner() {
    
    let navigate = useNavigate();
    let username = localStorage.getItem("username");

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
                <Navbar.Brand href="#home" style={{color:'white',fontFamily: 'MonteCarlo, cursive',fontSize:'2.5rem'}}><h4>Wheelosity</h4></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navbar-ul">
                            <Nav.Link onClick={ toDashboard } style={{color:'white'}}>Dashboard</Nav.Link>
                            <Nav.Link href="#link" style={{color:'white'}}>About Us</Nav.Link>
                            <NavDropdown title="Partner" id="basic-nav-dropdown">
                                <NavDropdown.Item disabled >{username}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ toReturnboard }>MyRent</NavDropdown.Item>
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