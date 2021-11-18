import {Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./PartnerApprove.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
function PartnerApprove() {
  const [partner, setPartner] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/partner/false").then((res) => {
      setPartner(res.data.data);
    });
  }, []);

  function updateStatusAccPartner(partnerId) {
    axios.put("/api/partner/acc/" + partnerId).then((res) => {
      alert("berhasil update status");
      window.location.reload();
      navigate("/admin/partners");
    });
  }
  return (
    <>
      <Container fluid>
        <Button className="balance" variant="secondary" size="lg" disabled>
          Balance: Rp 50.000.000
        </Button>
        <div className="justify-content-center mt-3 m-3">
          <Table striped bordered hover size="md">
            <thead>
              <tr>
                <th>No</th>
                <th>Partner Name</th>
                <th>City</th>
                <th>Status Acc</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {partner.map((value, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{value.partner_name}</td>
                    <td>{value.city}</td>
                    <td>{"" + value.status_acc + ""}</td>
                    <td>
                      <Button variant="contained" color="success"  onClick={() => updateStatusAccPartner(value.partner_id)}>
                        Acc Partner
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button variant="contained" color="primary" style={{float:"left"}}>Back</Button>
        </div>
      </Container>
    </>
  );
}

export default PartnerApprove;
