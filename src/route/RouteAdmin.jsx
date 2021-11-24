import { Routes, Route } from "react-router-dom";
import NavBarAdmin from "../components/navbar/NavBarAdmin";
import DashboardAdmin from "../screens/admin/DashboardAdmin";
import CarApprove from "../screens/admin/CarApprove";
import PartnerApprove from "../screens/admin/PartnerApprove";
import DetailPartner from "../screens/admin/DetailPartner";
import TransactionAdmin from "../screens/admin/TransactionAdmin";
import Balance from "../screens/admin/Balance";
import ShowPartners from "../screens/admin/ShowPartners";
import ShowCarsByDetailPartners from "../screens/admin/ShowCarsByDetailPartners";
import ShowCars from "../screens/admin/ShowCars";
import Footer from "../components/footer/Footer";

function RouteAdmin(){
    return(
        <>
            <NavBarAdmin />
            <Balance />
            <Routes>
                <Route path="/" element={<DashboardAdmin />} />
                <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/admin/cars" element={<CarApprove />} />
                <Route path="/admin/partners" element={<PartnerApprove />} />
                <Route path="/admin/partner/detail/car/:partnerId" element={<DetailPartner />} />
                <Route path ="admin/transaction" element={<TransactionAdmin />} />
                <Route path ="/admin/allpartners" element={<ShowPartners />} />
                <Route path="/admin/partner/detail/allcar/:partnerId" element={<ShowCarsByDetailPartners />} />    
                <Route path="/admin/allcars" element={<ShowCars />} />
            </Routes>
        </>
    )
}

export default RouteAdmin;