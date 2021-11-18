import { Button, Table } from "react-bootstrap";
import {useState , useEffect} from "react";
// import DetailCars from "../../components/modals/DetailCars";
import "./CarApprove.css";
import axios from "axios";
import { useParams ,useNavigate} from "react-router-dom";

function CarApprove() {
    let navigate = useNavigate();

    const [partner, setPartner] = useState([]);    
    useEffect(()=>{
        axios
        .get("/api/partners")
        .then((res)=>{
            // console.log(res.data.data);
            setPartner(res.data.data);
        })
    },[setPartner]);
    // console.log(partner);

    function toPartnerCar(partnerId){
        navigate('/admin/partner/detail/car/'+partnerId)
    }

    return(
        <>
            <Button className="balance" variant="secondary" size="lg" disabled>
                Balance: Rp 50.000.000
            </Button>
            <div className="table-cars">
            <Table striped bordered hover size="sm">
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
            </div>
        </>
    )
}

export default CarApprove;