import { Button } from "react-bootstrap";
import { useState , useEffect } from "react";
import { useNavigate} from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { carActions } from "../../store/car";
import "./CarApprove.css";
import axios from "axios";
import Footer from "../../components/footer/Footer";

function CarApprove() {
    let token = localStorage.getItem("token");
    const listDetailPartnerCars = useSelector((state) => state.car.listDetailPartnerCars);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{
        axios.get("/api/partners",
        {headers: {Authorization : `Bearer ${token}`}}
        ).then((res)=>{
            dispatch(carActions.listDetailPartnerCars(res.data.data));
            setIsLoading(false);
        });
    },[dispatch]);

    function toPartnerCar(partnerId){
        navigate('/admin/partner/detail/car/'+partnerId)
    }
    function goBack(){
        navigate("/admin/dashboard");
    }

    const columns = [
        {
            name: "Partner Name",
            selector: row => row.partner_name,
            sortable: true,
        },
        {
            name: "Action",
            selector: row => {
            return <Button variant="primary" 
                    size="sm" onClick={()=> toPartnerCar(row.partner_id)}>Detail</Button>
        },
            sortable: true,
        },
    ];

    return(
        <>
        <p className="p-allTR"> Cars Need Approve </p>
        <hr className="garis-tr" />
        <div id="container-approveCar">
        <DataTable
        columns={columns}
        data={listDetailPartnerCars}
        progressPending={isLoading}
        pagination
        />
            <Button variant="primary" 
                style={{float:"left", marginTop:"10px", borderRadius:"10px"}} 
                onClick={goBack}> Back </Button>
        </div>
        <Footer />
        </>
    )
}

export default CarApprove;