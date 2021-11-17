import { Route, Routes } from "react-router-dom";
import NavBarMember from "../components/navbar/NavBarMember";
import DashboardMember from "../screens/member/DashboardMember";
import RentCar from "../screens/member/RentCar";
import History from "../screens/member/History";


function RouteMember(){
    return(
        <>
            <NavBarMember />
            <Routes>
                <Route path="/member/dashboard" element={<DashboardMember />} />
                <Route path="/member/rentcar" element={<RentCar />} />
                <Route path="/member/history" element={<History />} />
            </Routes>
        </>
    )
}

export default RouteMember;