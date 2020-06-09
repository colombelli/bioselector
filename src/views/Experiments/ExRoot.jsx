import React, { useContext, useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Table
  } from "reactstrap";

import {ExperimentsContext} from '../../Store';

var removable = false;
var cursor = "auto";

function ExRoot() {

    const [experiments, setExperiments] = useContext(ExperimentsContext);
    
    function addExperiments(){

        const expList = [...experiments.list];
        const addExperimentView = "add";
        
        setExperiments({view: addExperimentView, list: expList});
    }


    const removeExperiment = (id) => {
        return
    }


    const getExperimentTypeString = (type) => {
        
        if("sin")
            return "Single FS";
        else if("hom")
            return "Homogeneous";
        else if("het")
            return "Heterogeneous";
        else if("hyb")
            return "Hybrid";

        else return "";
    }


    const renderExperiments = () => {

            return experiments["list"].map((experiment, index) => {
                const { type, selectors, aggregators, datasets, id } = experiment
        
                return (
                    <tr key={id} id={id} onClick={() => removeExperiment(id)}
                    style={{cursor: cursor}}>
                        <td>{getExperimentTypeString(type)}</td>
                        <td>datasets</td>
                        <td>selectors</td>
                        <td>aggregators</td>
                    </tr>
               )
            })


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
            
            <Row>
            <Card body>
            <CardTitle tag="h5">Experiments</CardTitle>
            <CardBody>

                <Table 
                hover={true}>
                    <thead className="text-success">
                    <tr>
                        <th>TYPE</th>
                        <th>DATASETS</th>
                        <th>SELECTORS</th>
                        <th>AGGREGATORS</th>
                    </tr>
                    </thead>
                    <tbody>
                        {renderExperiments()}
                    </tbody>
                </Table>
                
            </CardBody>
            </Card>
            </Row>

            </div>
        </>
    );
  };

  export default ExRoot;