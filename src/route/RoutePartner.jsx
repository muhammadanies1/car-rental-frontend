import { Route, Routes } from "react-router-dom";
import NavBarPartner from "../components/navbar/NavBarPartner";
import RegisterPartner from "../screens/partner/RegisterPartner";
import DashboardPartner from "../screens/partner/DashboardPartner";

function RoutePartner(){
    return(
        <>
            <NavBarPartner />
            <Routes>
                <Route path="/partner/register" element={<RegisterPartner />} />
                <Route path="/partner/dashboard" element={<DashboardPartner />} />
            </Routes>
        </>
    )
}

export default RoutePartner;