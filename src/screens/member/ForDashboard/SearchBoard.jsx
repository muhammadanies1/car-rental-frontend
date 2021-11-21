import { Card, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBoard(props){
    console.log(props.cars);
    let navigate = useNavigate();

    function bookHandler(carId) {
        // events.preventDefault();
        navigate("/member/rentcar/"+carId);
        window.location.reload();
        
    }

    return(
        <div>
            {props.cars.map((value) => {
                        return (
                            <Card className="card-car" style={{ width: '25rem' }}>
                                <Card.Img className="card-img" variant="top" src={value.image} />
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title className="car-name">{value.merk}</Card.Title>
                                            <Card.Subtitle className="card-subtitle">{value.partner.city}, {value.partner.partner_name}</Card.Subtitle>
                                        </Col>
                                        <Col md="auto">
                                            <Card.Text className="car-price"> Rp {value.price} </Card.Text>
                                            <Button className="btn-book" variant="primary" onClick={()=>bookHandler(value.car_id)}>Book Now</Button>
                                            </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )
                    })}
        </div>
            
    )
}

export default SearchBoard;