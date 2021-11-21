import {Table } from "react-bootstrap";
import {Button as BtnBoo} from "react-bootstrap"
import {useState , useEffect} from "react";
import "./CarApprove.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { Button } from '@mui/material';

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
        <div id="container-approveCar">
            <Button className="balance" variant="secondary" size="lg" disabled>
                Balance: Rp 50.000.000
            </Button>
            <hr />
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
                            <BtnBoo variant="primary" size="sm" onClick={()=> toPartnerCar(value.partner_id)}>Detail</BtnBoo>
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