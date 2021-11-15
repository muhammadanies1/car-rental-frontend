// import Header from "../../components/headers/Header";
import "./DashboardMember.css";
import { Form, Container, Card, Button, Col, Row } from "react-bootstrap";
import gambar from './mcqueen.jpg';



function DashboardMember(){
    return (
        <div>
            <Container className="container">
                <Form.Control type="text" placeholder="I need a car at" readOnly />
                <p>More than 100+ cars</p>
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={gambar} />
                    <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>Avanza New Gen</Card.Title>
                            <Card.Subtitle className="card-subtitle">Gading Serpong, Jonathan</Card.Subtitle>
                        </Col>
                        <Col md="auto">
                            <Card.Text> Rp 100.000 </Card.Text>
                            <Button variant="primary">Book Now</Button></Col>
                    </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
        
    )
}

export default DashboardMember;