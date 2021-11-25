import "./Aboutus.css";
import "../admin/FooterDashboard";
import FooterDashboard from "../admin/FooterDashboard";
import { Card } from "react-bootstrap";
import Headers from "../../components/landingpage/Headers";
import { useNavigate } from "react-router-dom";
import Kosong from "../../components/helper/Kosong";

function Aboutus(){
    let navigate = useNavigate();
    const navbarLinks = [
        { navigate: "/", title: "Home" },
        { navigate: "/aboutus", title: "About Us" },
        { navigate: "/login", title: "Login" },
    ];
    return(
        <>
        <Headers navbarLinks = {navbarLinks} />
        <Kosong/>
            <div className="container-aboutUs">
                <Card className="text-left">
                <Card.Header>About Us</Card.Header>
                    <Card.Body>
                    <Card.Title>Welcome to Wheelosity</Card.Title>
                    <Card.Subtitle>That wonderful feeling – you start the engine and your adventure begins…</Card.Subtitle>
                    <Card.Text>
                        At Wheelosity everything we do is about giving you the freedom to discover more. 
                        We’ll move mountains to find you the right rental car, and bring you a smooth, 
                        hassle-free experience from start to finish. Here you can find out more about how 
                        we work.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <FooterDashboard />
        </>
    )
}

export default Aboutus;