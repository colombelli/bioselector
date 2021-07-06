import React from 'react'
import {
    Card,
    CardImg,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";


function About() {
    return(
        <>
        <div className="content">
        <Row>
            <Col>
            <Card>
            <CardHeader>
                <CardTitle tag="h4">The project</CardTitle>
            </CardHeader>
            <CardBody>
                The present software blablabla...
            </CardBody>
            </Card>
            </Col>
        </Row>

        <Row>
            <Col>
            <Card>
            <CardHeader>
                <CardTitle tag="h4">Who we are</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                <Col>
                <Card>
                    <CardImg top src={require("assets/img/felipe.png")} />
                    <CardHeader><CardTitle tag="h6">Felipe Colombelli</CardTitle></CardHeader>
                    <CardBody>Undergraduate student blablabla</CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                    <CardImg top src={require("assets/img/mariana.jpg")} />
                    <CardHeader><CardTitle tag="h6">Mariana Recamonde Mendoza</CardTitle></CardHeader>
                    <CardBody>Professor Phd blablabla</CardBody>
                </Card>
                </Col>
                </Row>
            </CardBody>
            </Card>
            </Col>
        </Row>

        </div>
        </>

    );
}

export default About;