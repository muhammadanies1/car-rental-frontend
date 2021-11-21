import { Card, Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import FormRentCar from "../../components/modals/FormRentCar";
import RoomIcon from "@mui/icons-material/Room";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { carActions } from "../../store/car";
import axios from "axios";
import "./RentCar.css";

const RentCar = () => {
    const [modalShow, setModalShow] = useState(false);
    const [detailCar, setDetailCar] = useState({});
    const [city, setCity] = useState("");
    const [partnerName, setPartnerName] = useState("");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [place, setPlace] = useState(null);
    const objCar = useSelector((state) => state.car);
    const dispatch = useDispatch();
    const [showPopup, togglePopup] = useState(true);

    let param = useParams();
    let userID = localStorage.getItem("user_id");
    let car_id = param.car_id;
    useEffect(() => {
        axios.get(`/api/car/id/${car_id}`)
            .then(res => {
                dispatch(carActions.getCarByCarId(res.data.data));
                setDetailCar(res.data.data);
                setCity(res.data.data.partner.city);
                setPartnerName(res.data.data.partner.partner_name);
                setLat(parseFloat(res.data.data.partner.latitude));
                setLong(parseFloat(res.data.data.partner.longtitude));
            });
            
    }, [dispatch,setDetailCar]);

    // function bookNow(carId){
    //     axios.get(`/api/car/id/${car_id}`).then((res) => {
    //         setDetailCar(res.data.data);
    //             setCity(res.data.data.partner.city);
    //             setPartnerName(res.data.data.partner.partner_name);
    //             setLat(parseFloat(res.data.data.partner.latitude));
    //             setLong(parseFloat(res.data.data.partner.longtitude));
    //     });
    // }

    const [viewport, setViewport] = useState({
        width: "57vw",
        height: "73vh",
        latitude: -6.261058,
        longitude: 106.642164,
        zoom: 10
    });
    
    return(
        <>
            <p className="name-partner">Jonathan RentCar</p>
            <Row>
                <Col sm={4}>
                <Card className="card-detail-car" style={{ width: '25rem' }}>
                    <Card.Img className="card-img" variant="top" src={detailCar.image} />
                    <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title className="name-car" >{detailCar.merk}</Card.Title>
                            <Card.Subtitle className="card-subtitle">{city}, { partnerName }</Card.Subtitle>
                        </Col>
                        <Col md="auto">
                            <Card.Text className="price"> Rp {detailCar.price} </Card.Text>
                            <Button className="btn-book" variant="primary" onClick={() => setModalShow(true)}>Book Now</Button></Col>
                    </Row>
                    <Row className="description">
                        <Col>{detailCar.description}</Col>
                    </Row>
                    </Card.Body>
                </Card>
                </Col>
                <Col sm={8}>
                    <Card className="card-maps">
                        <Card.Body>
                            <div>
                            <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoibXVoYW1tYWQtYW5pZXMxIiwiYSI6ImNrdzFsOXdqamEzdGgzMHFwdXVncWdtengifQ.kulWbTY0gS5iPELC-iOWGA"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapStyle="mapbox://styles/muhammad-anies1/ckw4bf05v0ezn14nuofdmayiv"
                    >
                    
                    <Marker 
                        latitude={-6.261058} 
                        longitude={106.642164} 
                        offsetLeft={-20} 
                        offsetTop={-10}>
                        <RoomIcon className="marker" onClick={() => togglePopup(true)} style={{ fontSize:viewport.zoom * 5, color: "slateblue" }}/>
                    </Marker>
                    {
                        showPopup &&
                        <Popup latitude={-6.261058} 
                        longitude={106.642164} 
                        closeButton={true} 
                        closeOnClick={false} 
                        anchor="right" 
                        onClose={() => togglePopup(false) }
                        >
                        <div className="card-pop-up">
                            <label>Name Partner</label>
                                <p>{partnerName}</p>
                            <label>City</label>
                                <p>{city}</p>
                        </div>
                        </Popup>
                    }
                </ReactMapGL>
                            </div> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <FormRentCar userId={userID} carId={car_id} show={modalShow} onHide={() => setModalShow(false)} />
        </>
        
    )
}

export default RentCar;