import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { carActions } from "../../store/car";
import StatusFinish from "./ForDashboard/StatusFinish";
import "./DashboardMember.css";
import './ForDashboard/NotFinish'
import axios from "axios";
import NotFinish from "./ForDashboard/NotFinish";
import SearchBoard from "./ForDashboard/SearchBoard";
import ButtonSearchBoard from "./ForDashboard/ButtonSearchBoard";

function DashboardMember() {
    const listCar = useSelector((state) => state.car);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [cekSearch, setCekSearch] = useState("");
    const [carProcess, setCarProcess] = useState(null);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [userTransaction, setUserTransaction] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/api/process/${user_id}`)
            .then(res => {
                setCarProcess(res.data.data);
                if (carProcess != null) {
                    setUserTransaction(res.data.data.user.user_id);
                }
            })

        axios.get(`/api/cars/status/true`)
            .then(res => {
                console.log(res);
                dispatch(carActions.getAllCarTrue(res.data))
                setCars(res.data.data)
            })
        setIsLoading(false);
    }, [dispatch])


    console.log(cars);
    return (
        <>
            {carProcess != null && carProcess.paid_status != "Finish" ?
                    <NotFinish />
                :
                cars.length != 0 ?
                    <div>
                        <ButtonSearchBoard setCars={setCars} />
                        <StatusFinish cars={cars} />
                    </div>
                    :
                    <div>
                        <ButtonSearchBoard setCars={setCars} />
                            <StatusFinish cars={cars} />
                    </div>
            }
        </>

    )
}

export default DashboardMember;