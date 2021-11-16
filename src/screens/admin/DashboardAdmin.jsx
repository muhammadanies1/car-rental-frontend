import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./DashboardAdmin.css";

function DashboardAdmin () {
    let navigate = useNavigate();

    function toPartners(){
        navigate("/admin/partners");
    }

    function toCars(){
        navigate("/admin/cars");
    }
    
    return (
        <>
            <Button className="balance" variant="secondary" size="lg" disabled>
                Balance: Rp 50.000.000
            </Button>
            <div className="flex-container">
                <Card className="card-approve-partner" onClick={toPartners}>
                    <Card.Body>
                        <p>Partner</p>
                        <div className="total">
                            <p> 0 </p>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="card-approve-car" onClick={toCars}>
                    <Card.Body>
                        <p>Car</p>
                        <div className="total">
                            <p> 0 </p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            
        </>
    )
}

export default DashboardAdmin;