import { Routes, Route } from "react-router-dom";
import Landingpage from "../components/landingpage/Landingpage";
import Aboutus from "../screens/aboutus/Aboutus";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";


function UnregisteredRoute(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/aboutus" element={<Aboutus />} />
            </Routes>
        </>
    )
}

export default UnregisteredRoute;