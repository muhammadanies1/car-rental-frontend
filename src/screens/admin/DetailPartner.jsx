import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {carActions} from '../../store/car'
import "./DetailPartner.css";
import Swal from 'sweetalert2'

const DetailPartner = () => {
  
  const listCarByPartnerId = useSelector((state) => state.car.listCarByPatnerId);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let param = useParams();
  let token = localStorage.getItem("token");
  
  useEffect(() => {
    setIsLoading(true)
    axios.get(`/api/car/` + param.partnerId,
    {headers: {Authorization : `Bearer ${token}`}}
    ).then((res) => {
      dispatch(carActions.getCarByPartnerId(res.data.data));
      setIsLoading(false)
    });
  }, [dispatch]);
  
  const columns = [
    {
      name: "Car Merk",
      selector: row => row.merk,
      sortable: true,
    },
    {
      name: "STNK Number",
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
      name: "Description",
      selector: row => row.description,
      sortable: true,
    },  
    {
      name: "Car Status",
      selector: row => {
        let data = row.status_acc ? 
        <span style={{cursor:"auto" , color:"green"}}>Accepted</span>
        : 
        <span style={{cursor:"auto",color:"red"}}>Not Accepted</span>
        return data;
      },
      sortable: true,
    },
    {
      name: "Action",
      selector: row => {
        let data =  row.status_acc ?
        ""
        :
        <button className="btn btn-secondary btn-md" onClick={()=> updateStatus(row.car_id)}>Accept Car</button>
        return data;
      },
      sortable: true,
    },
  ];
  function updateStatus(carId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .put("/api/car/status_acc/"+carId)
        .then((res)=>{
          Swal.fire(
            'Success',
            'Car Accepted'
          )
          window.location.reload();
          navigate("/admin/partner/detail/car/"+param.partnerId);
        })
        
      }
    })
  
  }
  function goBack(){
    navigate("/admin/cars");
  }
  return (
    <>
    <p className="p-allTR"> Detail Partner Car </p>
    <hr className="garis-tr" />
    <div className="container-detailPartner">
      <DataTable
        columns={columns}
        data={listCarByPartnerId}
        progressPending={isLoading}
        pagination
        />
      <Button variant="contained" id="btn-back" 
              color="primary" 
              onClick={goBack}>Back</Button>
    </div>
    </>
  );
};

export default DetailPartner;
