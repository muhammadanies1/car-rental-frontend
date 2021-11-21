import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { carActions } from "../../store/car";
import StatusFinish from "./ForDashboard/StatusFinish";
import "./DashboardMember.css";
import axios from "axios";
import SearchBoard from "./ForDashboard/SearchBoard";
import ButtonSearchBoard from "./ForDashboard/ButtonSearchBoard";

function DashboardMember() {
    const listCar = useSelector((state) => state.car);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [carProcess, setCarProcess] = useState(null);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [userTransaction, setUserTransaction] = useState();

    function bookHandler(carId) {
        // events.preventDefault();
        navigate("/member/rentcar/" + carId);
        window.location.reload();

    }

    useEffect(() => {
        axios.get(`/api/process/${user_id}`)
            .then(res => {
                setCarProcess(res.data.data);
                if (carProcess != null) {
                    setUserTransaction(res.data.data.user.user_id);
                }
            })

        axios.get(`/api/cars/status/true`)
            .then(res => {
                dispatch(carActions.getAllCarTrue(res.data))
                setCars(res.data.data)
            })

    }, [dispatch])

    function searchHandler(events) {
        setSearch(events.target.value);
    };

    function buttonReturnAndPaymentHandler(events) {
        console.log(carProcess.transaction_id);
        if (carProcess.paid_status == "Reserved") {
            axios.put("/api/transaction/return/" + carProcess.transaction_id)
                .then(res => {
                    window.location.reload();
                })
        } else if (carProcess.paid_status == "Waiting for payment") {
            console.log(" sampun mlebet" + carProcess.transaction_id);
            axios.put("/api/transaction/paidoff/" + carProcess.transaction_id)
                .then(res => {
                    window.snap.pay(res.data.message);
                })
        }

    }

    return (
        <>
            <StatusFinish cars={cars} />
            <div id="container-dashboard">
                <ButtonSearchBoard setCars={setCars} />
                <h4>More than 100+ cars</h4>
                <hr className="more" />
                {cars.length !== 0 ?
                    <SearchBoard cars={cars} />
                    :
                    ""
                }

                {/* <div id="container-car">
                        
                        </div> */}
            </div>
        </>

    )
}

export default DashboardMember;