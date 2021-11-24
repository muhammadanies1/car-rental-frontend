import "./PartnerApprove.css";
import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { partnerActions } from '../../store/partner';
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import axios from "axios";


function PartnerApprove() {

  const listPartnerAcc = useSelector((state) => state.partner.listPartnerAcc);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/partner/false").then((res) => {
      dispatch(partnerActions.getListPartnerAcc(res.data.data));
      setIsLoading(false);
    });
  }, [dispatch]);
  
  function updateStatusAccPartner(partnerId) {
    axios.put("/api/partner/acc/" + partnerId).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Done!',
        text: 'Partner approved!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
      window.location.reload();
      navigate("/admin/partners");
    });
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
    </>
  );
}

export default PartnerApprove;
