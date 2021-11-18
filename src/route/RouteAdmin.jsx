import { Routes, Route } from "react-router-dom";
import NavBarAdmin from "../components/navbar/NavBarAdmin";
import DashboardAdmin from "../screens/admin/DashboardAdmin";
import CarApprove from "../screens/admin/CarApprove";
import PartnerApprove from "../screens/admin/PartnerApprove";
import DetailPartner from "../screens/admin/DetailPartner";

function RouteAdmin(){
    return(
        <>
            <NavBarAdmin />
            <Routes>
                <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/admin/cars" element={<CarApprove />} />
                <Route path="/admin/partners" element={<PartnerApprove />} />
                <Route path="/admin/partner/detail/car/:partnerId" element={<DetailPartner />} />
            </Routes>
        </>
    )
}

export default RouteAdmin;