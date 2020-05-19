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


function ExRoot() {

    const [experiments, setExperiments] = useContext(ExperimentsContext);

    function addExperiments(){

        const expList = [...experiments.list];
        const addExperimentView = "add";
        
        setExperiments({view: addExperimentView, list: expList});
    }

    return (
        <>
        <div className="content">
                <Row>
                    <Col>
                        <div onClick={addExperiments}>
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
                                <CardTitle tag="p">Add Experiment</CardTitle> 
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
        //TODO: RENDER EXPERIMENTS CARDS
    );
  };

  export default ExRoot;