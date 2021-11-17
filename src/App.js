import './App.css';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardMember from './screens/member/DashboardMember';
import RentCar from './screens/member/RentCar';
import History from './screens/member/History';
import DashboardPartner from './screens/partner/DashboardPartner';
import DashboardAdmin from './screens/admin/DashboardAdmin';
import RegisterPartner from './screens/partner/RegisterPartner';

import Header from "./components/headers/Header";
import CarApprove from './screens/admin/CarApprove';
import PartnerApprove from './screens/admin/PartnerApprove';
import { Fragment, useEffect } from 'react';


function App() {

  
  let role_id = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  const cekAuth = () => {
    if(token && role_id == 3){
      navigate("/partner/dashboard")
    } else if(token && role_id == 2){
      navigate("/member/dashboard")
    } else if(token && role_id == 1){
      navigate("/admin/dashboard")
    } else if(!token){
      navigate("/")
    }
  }
  useEffect(() => {
    // const getCekAuth = async () => {
      cekAuth();
    // }
    // getCekAuth();
  })
  
  return (
    <Fragment>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/member/dashboard" element={<DashboardMember />} />
        <Route path="/member/rentcar" element={<RentCar />} />
        <Route path="/member/history" element={<History />} />
        <Route path="/partner/register" element={<RegisterPartner />} />
        <Route path="/partner/dashboard" element={<DashboardPartner />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/cars" element={<CarApprove />} />
        <Route path="/admin/partners" element={<PartnerApprove />} />
      </Routes>
    </Fragment>
  );
}

export default App;
