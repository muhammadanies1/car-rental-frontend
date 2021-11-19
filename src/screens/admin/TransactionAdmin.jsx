import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalShowDetail from "./ModalShowDetail";
import { useDispatch, useSelector } from "react-redux";
import { transactionActions } from "../../store/transaction";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
const TransactionAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const listTransaction = useSelector((state) => state.transaction.listTransaction);
  const [transactionId, setTransactionId] = useState();
  const [paidStatus, setpaidStatus] = useState();
  const [car, setCar] = useState({});
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`/api/transactions`).then((res) => {
    dispatch(transactionActions.getAllTransaction(res.data.data));
    setIsLoading(false);
    });
  }, []);
  // console.log(listTransaction);
  function detailTransaction(carId,transactionId,paidStatus) {
    axios.get("/api/car/id/"+carId).then((res) => {
      setCar(res.data.data)
      setTransactionId(transactionId);
      setpaidStatus(paidStatus);
    });
    setModalShow(true);
  }
  // console.log(transactionId);
  function goBack(){
    navigate("/admin/dashboard");
  }
  const columns = [
    {
      name: "Transaction Id",
      selector: (row) => row.transaction_id,
    },
    {
      name: "Loan Time",
      selector: (row) => row.loan_time + " days",
    },
    {
      name: "Penalty",
      selector: (row) => "Rp. " + row.penalty + ",00",
    },
    {
      name: "Total",
      selector: (row) => "Rp. " + row.total_payment + ",00",
    },
    {
      name: "Status",
      selector: (row) => row.paid_status,
    },
    {
      name: "Detail",
      selector: (row) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => detailTransaction(row.car.car_id,row.transaction_id,row.paid_status)}
          >
            Details
          </button>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        title="All Transaction"
        columns={columns}
        data={listTransaction}
        progressPending={isLoading}
        pagination
      />
      <ModalShowDetail
      detailcar={car} 
      paid_status={paidStatus}
      transaction_id = {transactionId}
      show={modalShow} 
      onHide={() => setModalShow(false)}
      />
      <Button variant="contained" color="primary" style={{float:"left"}} onClick={goBack}>Back</Button>
    </>
  );
};

export default TransactionAdmin;
