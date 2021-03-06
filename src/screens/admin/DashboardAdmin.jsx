import { Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./DashboardAdmin.css";
import FooterDashboard from "./FooterDashboard";

function DashboardAdmin () {
    let navigate = useNavigate();
    
    function toPartners(){
        navigate("/admin/partners");
    }

    function toCars(){
        navigate("/admin/cars");
    }
    
    function toTransaction(){
        navigate("/admin/transaction")
    }

    return (
        <>
        <div id="container-dashboardAdmin">
            <div className="flex-container">
                <Card className="card-approve-partner" onClick={toPartners}>
                    <Card.Body>
                        <p>Partner</p>
                        <div className="total">
                        </div>
                    </Card.Body>
                </Card>
                <Card className="card-approve-car" onClick={toCars}>
                    <Card.Body>
                        <p>Car</p>
                        <div className="total">
                        </div>
                    </Card.Body>
                </Card>

                <Card className="card-transaction" onClick={toTransaction}>
                    <Card.Body>
                        <p>Transaction</p>
                        <div className="total">
                        </div>
                    </Card.Body>
                </Card>
            </div>    
        </div>
        <FooterDashboard/>
        </>
    )
}

export default DashboardAdmin;