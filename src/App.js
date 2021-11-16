import './App.css';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import DashboardMember from './screens/member/DashboardMember';
import RentCar from './screens/member/RentCar';
import Header from "./components/headers/Header";
import History from './screens/member/History';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/member/dashboard" element={<DashboardMember />} />
        <Route path="/member/rentcar" element={<RentCar />} />
        <Route path="/member/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
