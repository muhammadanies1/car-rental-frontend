import { Routes, Route } from "react-router-dom";
import NavBarMember from "../components/navbar/NavBarMember";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";


function UnregisteredRoute(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}

export default UnregisteredRoute;