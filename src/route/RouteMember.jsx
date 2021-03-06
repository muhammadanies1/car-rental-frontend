import { Route, Routes } from "react-router-dom";
import NavBarMember from "../components/navbar/NavBarMember";
import DashboardMember from "../screens/member/DashboardMember";
import RentCar from "../screens/member/RentCar";
import History from "../screens/member/History";
import RegisterPartner from "../screens/partner/RegisterPartner";
import Kosong from "../components/helper/Kosong";
import Footer from "../components/footer/Footer";

function RouteMember(){
    return(
        <>
            <NavBarMember />
            <Kosong/>
            <Routes>
                <Route path="/" element={<DashboardMember />} />
                <Route path="/member/dashboard" element={<DashboardMember />} />
                <Route path="/member/rentcar/:car_id" element={<RentCar />} />
                <Route path="/member/history" element={<History />} />
                <Route path="/partner/register" element={<RegisterPartner />} />
            </Routes>
            <Kosong />
            <Footer />
        </>
    )
}

export default RouteMember;