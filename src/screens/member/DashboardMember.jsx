import { Form, FormControl, Card, Button, Col, Row, Container } from "react-bootstrap";
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
    const [search, setSearch] = useState("");
    const [carProcess, setCarProcess] = useState(null);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [userTransaction, setUserTransaction] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // function bookHandler(carId) {
    //     // events.preventDefault();
    //     navigate("/member/rentcar/" + carId);
    //     window.location.reload();

    // }
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

    // function searchHandler(events) {
    //     setSearch(events.target.value);
    // };

    // function buttonReturnAndPaymentHandler(events) {
    //     console.log(carProcess.transaction_id);
    //     if (carProcess.paid_status == "Reserved") {
    //         axios.put("/api/transaction/return/" + carProcess.transaction_id)
    //             .then(res => {
    //                 window.location.reload();
    //             })
    //     } else if (carProcess.paid_status == "Waiting for payment") {
    //         console.log(" sampun mlebet" + carProcess.transaction_id);
    //         axios.put("/api/transaction/paidoff/" + carProcess.transaction_id)
    //             .then(res => {
    //                 window.snap.pay(res.data.message);
    //             })
    //     }

    // }

    console.log(cars);
    return (
        <>
        <ButtonSearchBoard setCars={setCars} />
            {carProcess != null && carProcess.paid_status != "Finish"
                ?
                <NotFinish />
                :
                cars.length != 0
                ?

                //     ?
                //     <>
                    // <p>Test</p>
                    <StatusFinish cars={cars} />
                //     </>
                    :
                    // <p>Test2</p>
                    <SearchBoard cars={cars} />
                    

            }
            {/* <>
            {isLoading == true ?
                <div>
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

                    </div>
                </div>
                :
                
            <NotFinish /> */}

            {/* } */}
        </>
        // <>
        //     {isLoading == false ?
        //         <>

        //     <div>
        //         <StatusFinish cars={cars} />
        //         <div id="container-dashboard">
        //             <ButtonSearchBoard setCars={setCars} />
        //             <h4>More than 100+ cars</h4>
        //             <hr className="more" />
        //             {cars.length !== 0 ?
        //                 <SearchBoard cars={cars} />
        //                 :
        //                 ""
        //             }

        //         </div>
        //         </>
        //         :
        //         <></>
        //     }

        //         {/* <div id="container-car">

        //                 </div> */}
        //     </div>
        // </>

        // </div>
        // </>
    )
}

export default DashboardMember;