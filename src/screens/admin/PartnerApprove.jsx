import "./PartnerApprove.css";
import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { partnerActions } from '../../store/partner';
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import FooterDashboard from "./FooterDashboard";

function PartnerApprove() {

  const listPartnerAcc = useSelector((state) => state.partner.listPartnerAcc);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/partner/false",
    {headers: {Authorization : `Bearer ${token}`}}
    ).then((res) => {
      dispatch(partnerActions.getListPartnerAcc(res.data.data));
      setIsLoading(false);
    });
  }, [dispatch]);
  
  function updateStatusAccPartner(partnerId) {
    Swal.fire({
      title: 'Are You Sure Want To Acc This Partner?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put("/api/partner/acc/" + partnerId,
        ).then((res) => {
          Swal.fire(
            'Success',
            'Partner Accepted!'
          )
          window.location.reload();
          navigate("/admin/partners");
        });
      }
    })
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
      name: "City",
      selector: row => row.city,
      sortable: true,
    },
    {
      name: "Status Approvement",
      selector: row =>" "+ row.status_acc + " ",
      sortable: true,
    },
    {
        name: "Action",
        selector: row => {
        return <Button variant="contained" 
                color="success" 
                onClick={()=> updateStatusAccPartner(row.partner_id)}>Acc Partner</Button>
    },
        sortable: true,
    },
];

  return (
    <>
      <p className="p-allTR"> Partners Need Approve </p>
      <hr className="garis-tr" />
      <div id="container-adminPartner">
      <DataTable
        columns={columns}
        data={listPartnerAcc}
        progressPending={isLoading}
        pagination
        />
        <Button variant="contained" id="btn-back-partner" 
          color="primary"
          onClick={goBack}>Back</Button>
      </div>
      <Footer/>
    </>
  );
}

export default PartnerApprove;
