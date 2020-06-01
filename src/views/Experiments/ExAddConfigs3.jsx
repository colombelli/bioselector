import React, { useContext } from 'react';
import {
    FormGroup,
    Col,
    Card,
    CardBody,
} from "reactstrap";
import {AggregatorsContext} from '../../Store.js';

const electron = window.require('electron');


function ExAddConfigs2(props){
    
    const [aggregators, setAggregators] = useContext(AggregatorsContext);


    
    function renderRightRemainingForm(){

        if (props.methods.hyb ||  props.methods.hom){
            return(
                <Card body>
                <CardBody>
                <FormGroup row>
                    <Col>Boots</Col>
                    <Col>Folds</Col>
                    <Col>Seed</Col>
                </FormGroup>  
                </CardBody>
                </Card>
            );
        }

        else if (props.methods.sin ||  props.methods.het) {
            return(
                <Card body>
                <CardBody>
                <FormGroup row>
                    <Col>Folds</Col>
                    <Col>Seed</Col>
                </FormGroup>  
                </CardBody>
                </Card>
            );
        }

        return
    }

    
    return(  
        <>
            {renderRightRemainingForm()}   
        </>      
    ); 
    
    
}

export default ExAddConfigs2;