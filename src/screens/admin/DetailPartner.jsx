import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {carActions} from '../../store/car'
const DetailPartner = () => {
  let param = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const listCarByPartnerId = useSelector((state) => state.car.listCarByPatnerId);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    axios.get(`/api/car/` + param.partnerId).then((res) => {
      // setCar(res.data.data);
      console.log(res);
      dispatch(carActions.getCarByPartnerId(res.data.data));
      setIsLoading(false)
    });
  }, [dispatch]);
  console.log(listCarByPartnerId);
  const columns = [
    {
      name: "Merek",
      selector: row => row.merk,
      sortable: true,
    },
    {
      name: "Stnk Number",
      selector: row => row.stnk_number,
      sortable: true,
    },
    {
      name: "Car Image",
      selector: row => {
        return <img alt="blom ada" src={row.image} width="100" height="100"></img>
      },
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: row => row.description,
      sortable: true,
    },  
    {
      name: "Status Acc",
      selector: row => {
        let data = row.status_acc ? 
        <span style={{cursor:"auto" , color:"green"}}>Accepted</span>
        : 
        <span style={{cursor:"auto",color:"red"}}>Not Acc</span>
        return data;
      },
      sortable: true,
    },
    {
      name: "Action",
      selector: row => {
       return <button className="btn btn-secondary btn-md" onClick={()=> updateStatus(row.car_id)}>Acc Car</button>
      },
      sortable: true,
    },
  ];
  function updateStatus(carId) {
    axios
    .put("/api/car/status_acc/"+carId)
    .then((res)=>{
      alert("berhasil update status acc")
      window.location.reload();
      navigate("/admin/partner/detail/car/"+param.partnerId);
    })
  }
  function goBack(){
    navigate("/admin/cars");
  }
  return (
    <>
    <DataTable
      title="Partner Cars"
      columns={columns}
      data={listCarByPartnerId}
      progressPending={isLoading}
      pagination
    />
    <Button variant="contained" color="primary" style={{float:"left"}} onClick={goBack}>Back</Button>
    </>
  );
};

export default DetailPartner;
