import React, { useContext, useReducer } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
  } from "reactstrap";

import { NavLink } from 'react-router-dom';
import {ExperimentsContext} from '../../Store';


function ExRoot(props) {

    return (
        <>
        <div className="content">
                <Row>
                    <Col>
                    <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
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
                                <CardTitle tag="p">Add Experiment {props.test}</CardTitle> 
                            </div>
                            </Col>
                        </Row>
                        </CardBody>
                        <CardFooter>
                        <hr />
                        <div className="stats">
                            <i className="fas fa-info-circle" style={{color:'white'}} /> Load datasets before adding exps
                        </div>
                        </CardFooter>
                        </Card>
                    </NavLink>
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
                                <CardTitle tag="p">Delete Experiment</CardTitle> 
                            </div>
                            </Col>
                        </Row>
                        </CardBody>
                        <CardFooter>
                        <hr />
                        <div className="stats">
                        <br></br>
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
  };

  export default ExRoot;