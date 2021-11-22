import { Route, Routes } from "react-router-dom";
import NavBarPartner from "../components/navbar/NavBarPartner";
import DashboardPartner from "../screens/partner/DashboardPartner";
import ReturnCar from "../screens/partner/ReturnCar";

function RoutePartner(){
    return(
        <>
            <NavBarPartner />
            <Routes>
                <Route path="/" element={<DashboardPartner />} />
                <Route path="/partner/dashboard" element={<DashboardPartner />} />
                <Route path="/partner/returncar" element={<ReturnCar />} />
            </Routes>
        </>
    )
}

export default RoutePartner;