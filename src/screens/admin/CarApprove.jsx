import { Table, Button } from "react-bootstrap";
import {useState , useEffect} from "react";
import { useNavigate} from "react-router-dom";
import "./CarApprove.css";
import axios from "axios";

function CarApprove() {
    let navigate = useNavigate();

    const [partner, setPartner] = useState([]);    
    useEffect(()=>{
        axios
        .get("/api/partners")
        .then((res)=>{
            setPartner(res.data.data);
        })
    },[setPartner]);
    // console.log(partner);

    function toPartnerCar(partnerId){
        navigate('/admin/partner/detail/car/'+partnerId)
    }
    function goBack(){
        navigate("/admin/dashboard");
    }

    return(
        <>
        <Button className="container-balance" variant="secondary" size="lg" disabled>
            Balance: Rp 50.000.000
        </Button>
        <div id="container-approveCar">
            <Table className="table-cars" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Partner Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {partner.map((value,index)=>{
                        return (
                            <tr>
                        <td>{index +1}</td>
                        <td>{value.partner_name}</td>
                        <td>
                            <Button variant="primary" size="sm" onClick={()=> toPartnerCar(value.partner_id)}>Detail</Button>
                        </td>
                    </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Button variant="contained" color="primary" style={{float:"left"}} onClick={goBack}>Back</Button>
            
        </div>
        </>
    )
}

export default CarApprove;