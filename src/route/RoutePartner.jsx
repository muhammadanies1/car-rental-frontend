import { Route, Routes } from "react-router-dom";
import NavBarPartner from "../components/navbar/NavBarPartner";
import DashboardPartner from "../screens/partner/DashboardPartner";
import ReturnCar from "../screens/partner/ReturnCar";
import Kosong from "../components/helper/Kosong";
import Footer from "../components/footer/Footer";

function RoutePartner(){
    return(
        <>
            <NavBarPartner />
            <Kosong />
            <Routes>
                <Route path="/" element={<DashboardPartner />} />
                <Route path="/partner/dashboard" element={<DashboardPartner />} />
                <Route path="/partner/returncar" element={<ReturnCar />} />
            </Routes>
            <Kosong/>
            <Footer/>
        </>
    )
}

export default RoutePartner;