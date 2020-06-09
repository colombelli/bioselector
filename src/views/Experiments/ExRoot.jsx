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

import {ExperimentsContext, DatasetsContext, SelectorsContext, AggregatorsContext} from '../../Store';

var removable = true;
var cursor = "auto";

function ExRoot() {

    const [experiments, setExperiments] = useContext(ExperimentsContext);
    const [datasets, ] = useContext(DatasetsContext);
    const [selectors, ] = useContext(SelectorsContext);
    const [aggregators, ] = useContext(AggregatorsContext);
    
    function addExperiments(){

        const expList = [...experiments.list];
        const addExperimentView = "add";
        
        setExperiments({view: addExperimentView, list: expList});
    }


    const removeExperiment = (id) => {
        return
    }


    const getExperimentTypeString = (type) => {
        
        switch(type){
            case "sin": return "Single FS";
            case "hom": return "Homogeneous";
            case "het": return "Heterogeneous";
            case "hyb": return "Hybrid";
            default: return "";
        }
    }


    const getDatasetsTitlesByPath = (paths) => {   //yes, the id is being totally ignored, problem for the future

        const datasetNames = [];
        for (let ds in datasets){
            if(paths.includes(datasets[ds].path))
                datasetNames.push(datasets[ds].title);
        }

        let datasetsString = "";
        for (let i in datasetNames){
            datasetsString += datasetNames[i] + ", ";
        }
        
        return datasetsString.slice(0, -2);  //chop the last ', ' characters
    }

    const getSelectorsLabelsByFileName = (fileNames) => {

        const selectorLabels = [];
        for (let sel in selectors){
            if(fileNames.includes(selectors[sel].fileName))
                selectorLabels.push(selectors[sel].label);
        }

        let selectorsString = "";
        for (let i in selectorLabels){
            selectorsString += selectorLabels[i] + ", ";
        }

        return selectorsString.slice(0, -2);
    }

    const getAggregatorsLabelsByFileName = (fileNames) => {
        
        const aggregatorLabels = [];
        for (let typeAgg in aggregators){
            for (let i in aggregators[typeAgg]){
                if(fileNames.includes(aggregators[typeAgg][i].fileName) &&
                    !aggregatorLabels.includes(aggregators[typeAgg][i].label))
                        aggregatorLabels.push(aggregators[typeAgg][i].label);
                 //not so optimized but works
            }
        }

        let aggregatorsString = "";
        for (let i in aggregatorLabels){
            aggregatorsString += aggregatorLabels[i] + ", ";
        }

        return aggregatorsString.slice(0, -2);
    }


    const renderExperiments = () => {

            return experiments["list"].map((experiment, index) => {
                let { type, selectors, aggregators, datasets, id } = experiment
                let exSelectorsFileNames = selectors.map((lst) => {return lst[0]});

                return (
                    <tr key={id} id={id} onClick={() => removeExperiment(id)}
                    style={{cursor: cursor}}>
                        <td>{getExperimentTypeString(type)}</td>
                        <td>{getDatasetsTitlesByPath(datasets)}</td>
                        <td>{getSelectorsLabelsByFileName(exSelectorsFileNames)}</td>
                        <td>{getAggregatorsLabelsByFileName(aggregators)}</td>
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
                striped={!removable}
                hover={removable}
                bordered={removable}>
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