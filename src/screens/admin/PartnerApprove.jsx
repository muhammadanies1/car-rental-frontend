import { Button, Table , Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import DetailPartner from "../../components/modals/DetailPartner";
import "./PartnerApprove.css";
import axios from "axios";
function PartnerApprove() {
  const [modalShow, setModalShow] = useState(false);
  const [partner, setPartner] = useState([]);
  useEffect(() => {
    axios.get("/api/partners").then((res) => {
      // console.log(res.data.data);
      setPartner(res.data.data);
    });
  }, [setPartner]);
  console.log(partner);
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {partner.map((value, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{value.partner_name}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      </Container>
    </>
  );
}

export default PartnerApprove;
