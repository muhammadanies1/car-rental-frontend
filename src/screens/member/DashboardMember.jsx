// import Header from "../../components/headers/Header";
import "./DashboardMember.css";
import { Form,FormControl, Card, Button, Col, Row } from "react-bootstrap";
import gambar from './mcqueen.jpg';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getData } from "../../api/AuthApi";

function DashboardMember(){
    let navigate = useNavigate();

    function bookHandler(events){
        events.preventDefault();
        navigate("/member/rentcar");
    }

    // useEffect(() => {
    //     getData(`/api/cars`).then((response) => {

    //     })
    // }, [input])

    return (
    <>
        <Form className="d-flex search-input">
            <FormControl type="search" placeholder="I need a car at" className="me-2" aria-label="Search" />
            <Button variant="outline-success"> Search </Button>
        </Form>
        <p className="title">More than 100+ cars</p>
        <Card className="card-car" style={{ width: '25rem' }}>
            <Card.Img className="card-img" variant="top" src={gambar} />
            <Card.Body>
            <Row>
                <Col>
                    <Card.Title className="car-name">Avanza New Gen</Card.Title>
                    <Card.Subtitle className="card-subtitle">Gading Serpong, Jonathan</Card.Subtitle>
                </Col>
                <Col md="auto">
                    <Card.Text className="car-price"> Rp 100.000 </Card.Text>
                    <Button className="btn-book" variant="primary" onClick={bookHandler}>Book Now</Button></Col>
            </Row>
            </Card.Body>
        </Card>
    </>
        
    )
}

export default DashboardMember;