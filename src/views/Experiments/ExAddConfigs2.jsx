import React, { useContext } from 'react';
import {
    FormGroup,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";
import {AggregatorsContext} from '../../Store.js';

const electron = window.require('electron');
const { ipcRenderer } = electron;


function ExAddConfigs2(props){
    
    const [aggregators, setAggregators] = useContext(AggregatorsContext);

    function getFileNameFromPath(path){
        return path.split('\\').pop().split('/').pop().split('.')[0];
    }

    
    function addAggregator(ensembleAggInfo) {
        
        let path = ipcRenderer.sendSync('BROWSE_FILE_METHOD');
        if(path.length === 1){ // if some file was selected

            let fileName = getFileNameFromPath(path[0]);
            let values = ipcRenderer.sendSync("ASK_AGGREGATOR_INFO", ensembleAggInfo)

            if (values !== null && values.name){

                let scriptAddition = ipcRenderer.sendSync('addAggregator', path);
                //TO-DO: if scriptAddition[0] == "ERR": warn user  
                
                var newAgg = {label: values.name, fileName:fileName};
                var newAggs = {...aggregators}
                
                
                if(values.level === "1"){
                    newAggs.lvl1.push(newAgg);
                } else if (values.level === "2"){
                    newAggs.lvl2.push(newAgg);
                } else {
                    newAggs.oneAgg.push(newAgg);
                }
                
                setAggregators(newAggs);
            }
        }
        return
    }


    function renderRightForm(aggregations, name) {

        return(
            aggregations.map((method, index) => {

                return(
                    <label className="configs" key={index}>
                        {method.label}
                        <input type="radio" name={name} value={method.fileName} ref={props.register({ required: true })}/>{' '}
                        <span className="checkmark"></span>
                    </label>
                );
            })
        );
    }


    if (props.methods.het ||  props.methods.hom){
        
        return(
            <Col>
                <Card body>
                <CardTitle tag="h5">Aggregators:</CardTitle>
                <CardBody>
                    
                    <FormGroup row>
                    <Col>
                        {renderRightForm(aggregators.oneAgg, "oneAgg")}
                    </Col>
                    </FormGroup>
                </CardBody>
                <Button color="secundary" onClick={() => addAggregator("oneAggInfo")}>Add New</Button>
                </Card>
            </Col>
        );   
    } else if (props.methods.hyb) {
        return(
            <Col>
                <Card body>
                <CardTitle tag="h5">Aggregators:</CardTitle>
                <CardBody>
                    
                    <FormGroup row>
                    <Col>
                        <CardTitle tag="h6">Level 1:</CardTitle>
                        <hr />
                        {renderRightForm(aggregators.lvl1, "lvl1")}
                        <br></br>
                        <CardTitle tag="h6">Level 2:</CardTitle>
                        <hr />
                        {renderRightForm(aggregators.lvl2, "lvl2")}
                    </Col>
                    </FormGroup>
                </CardBody>
                <Button color="secundary" onClick={() => addAggregator("hybAggInfo")}>Add New</Button>
                </Card>
            </Col>
        );
    }
    
    else {return(<></>)}
}

export default ExAddConfigs2;