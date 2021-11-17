import { Button, Table } from "react-bootstrap";
import {useState , useEffect} from "react";
import DetailCars from "../../components/modals/DetailCars";
import "./CarApprove.css";
import axios from "axios";
import { useParams} from "react-router-dom";

function CarApprove() {
    let param = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [detailCar, setdetailCar] = useState("");

    const modalTampil = (status,car_id) => {
        setModalShow(status);
        setdetailCar(car_id)

    }
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
                            <Button variant="primary" size="sm" onClick={() => modalTampil(true,value.partner_id)}> Details </Button>
                        </td>
                    </tr>
                        );
                    })}
                </tbody>
            </Table>
            </div>
            <DetailCars show={modalShow} car_id ={detailCar} onHide={() => setModalShow(false)} />
        </>
    )
}

export default CarApprove;