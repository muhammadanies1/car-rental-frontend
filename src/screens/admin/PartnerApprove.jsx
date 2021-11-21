import {Table, Container } from "react-bootstrap";
import { useEffect } from "react";
import "./PartnerApprove.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {partnerActions} from '../../store/partner';
function PartnerApprove() {
  const dispatch = useDispatch();
  const listPartnerAcc = useSelector((state) => state.partner.listPartnerAcc);
  // const [partner, setPartner] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/partner/false").then((res) => {
      // setPartner(res.data.data);
      dispatch(partnerActions.getListPartnerAcc(res.data.data));
    });
  }, [dispatch]);
  console.log(listPartnerAcc);
  function updateStatusAccPartner(partnerId) {
    axios.put("/api/partner/acc/" + partnerId).then((res) => {
      alert("berhasil update status");
      window.location.reload();
      navigate("/admin/partners");
    });
  }
  function goBack(){
    navigate("/admin/dashboard");
  }

  return (
    <>
      <div id="container-adminPartner">
        <Button className="balance" variant="secondary" size="lg" disabled>
          Balance: Rp 50.000.000
        </Button>
        <hr />
        <div className="justify-content-center mt-3 m-3">
          <Table className="table-approvePartner" striped bordered hover size="md">
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
              {listPartnerAcc.map((value, index) => {
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
          <Button variant="contained" color="primary" style={{float:"left"}} onClick={goBack}>Back</Button>
        </div>
      </div>
    </>
  );
}

export default PartnerApprove;
