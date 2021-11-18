import { Route, Routes } from "react-router-dom";
import NavBarPartner from "../components/navbar/NavBarPartner";
import DashboardPartner from "../screens/partner/DashboardPartner";

function RoutePartner(){
    return(
        <>
            <NavBarPartner />
            <Routes>
                <Route path="/partner/dashboard" element={<DashboardPartner />} />
            </Routes>
        </>
    )
}

export default RoutePartner;