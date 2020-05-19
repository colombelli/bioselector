import React, { useContext } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
  } from "reactstrap";

import {ExperimentsContext} from '../../Store';

function ExAdd(){
    return(
    <>
        
    <div className="content">
        <Row>
            <Col>
                <div onClick={() => {}}>
                <Card className="card-button add">
                <CardBody>
                <Row>
                    <Col>
                    <div className="icon-big text-center">
                        <i className="nc-icon nc-simple-add" />
                    </div>
                    </Col>
                    <Col>
                    <div className="numbers">
                        <CardTitle tag="p">Single Feature Selector</CardTitle> 
                    </div>
                    </Col>
                </Row>
                </CardBody>
                </Card>
                </div>
            </Col>
            
            <Col>
                <div onClick ={() => {}}>
                <Card className="card-button add">
                <CardBody>
                <Row>
                    <Col>
                    <div className="icon-big text-center">
                        <i className="nc-icon nc-simple-remove" />
                    </div>
                    </Col>
                    <Col>
                    <div className="numbers">
                        <CardTitle tag="p">Homogeneous Ensemble Feature Selection</CardTitle> 
                    </div>
                    </Col>
                </Row>
                </CardBody>
                </Card>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                <div onClick={() => {}}>
                <Card className="card-button add">
                <CardBody>
                <Row>
                    <Col>
                    <div className="icon-big text-center">
                        <i className="nc-icon nc-simple-add" />
                    </div>
                    </Col>
                    <Col>
                    <div className="numbers">
                        <CardTitle tag="p">Heterogeneous Ensemble Feature Selection</CardTitle> 
                    </div>
                    </Col>
                </Row>
                </CardBody>
                </Card>
                </div>
            </Col>
            
            <Col>
                <div onClick ={() => {}}>
                <Card className="card-button add">
                <CardBody>
                <Row>
                    <Col>
                    <div className="icon-big text-center">
                        <i className="nc-icon nc-simple-remove" />
                    </div>
                    </Col>
                    <Col>
                    <div className="numbers">
                        <CardTitle tag="p">Hybrid Ensemble Feature Selection</CardTitle> 
                    </div>
                    </Col>
                </Row>
                </CardBody>
                </Card>
                </div>
            </Col>
        </Row>

    </div>
        
    </>
    );
}

export default ExAdd;