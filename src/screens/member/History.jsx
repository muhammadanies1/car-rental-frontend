import { Card, Button, Col, Row } from "react-bootstrap";

import gambar from './mcqueen.jpg';
import "./History.css";

function History (){
    return(
        <>
            <Card className="card-history" style={{ width: '25rem' }}>
                <Card.Img className="card-img" variant="top" src={ gambar } />
                <Card.Body>
                <Row>
                    <Col>
                        <Card.Title className="car-name">Avanza New Gen</Card.Title>
                        <Card.Subtitle className="card-subtitle">Gading Serpong, Jonathan</Card.Subtitle>
                    </Col>
                    <Col md="auto">
                        <Card.Text className="car-price"> Rp 100.000 </Card.Text>
                        <Button variant="primary" className="btn-status" disabled> Paid Off </Button>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default History;