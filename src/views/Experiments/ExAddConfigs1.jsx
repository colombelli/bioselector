import React from 'react';
import {
    Form,
    FormGroup,
    Input,
    Col,
    Card,
    CardBody,
    CardTitle
} from "reactstrap";


function ExAddConfigs1(props){
    
    var availableMethods = [

        {label:"ReliefF", fileName: "reliefF", lang: "python", rankingFile: "rf"},
        {label:"Characteristic Direction", fileName: "geoDE", lang: "python", rankingFile: "gd"},
        {label:"Gain Ratio", fileName: "gain-ratio", lang: "r", rankingFile: "gr"},
        {label:"Symmetrical Uncertainty", fileName: "symmetrical-uncertainty", lang: "r", rankingFile: "su"},
        {label:"One Rule", fileName: "oneR", lang: "r", rankingFile: "or"}

    ]

    function renderRightForm() {
            
        if(props.methods.sin || props.methods.hom){
            return(
                availableMethods.map((method, index) => {

                    return(
                        <FormGroup check>
                            <div style={{paddingLeft:"12px"}}>
                            <Input type="radio" name="selected" />{' '}
                            {method.label}
                            </div>
                        </FormGroup>
                    );
                })
            );
        }

        else if(props.methods.het || props.methods.hyb) {
            return(

                availableMethods.map((method, index) => {
                    return(
                        <FormGroup check>
                            <div style={{paddingLeft:"12px"}}>
                            <Input bsSize="10" type="radio" name={method.fileName} />{' '}
                            {method.label}
                            </div>
                        </FormGroup>
                    );
                })
            );
        }   

    }

    if( props.methods.het || props.methods.hyb || 
        props.methods.sin || props.methods.hom){
        
        return(
            <>
                <Card body>
                <CardTitle tag="h5">Selectors:</CardTitle>
                <CardBody>
                    <Form>
                    <FormGroup row>
                    <Col>
                        {renderRightForm()}
                    </Col>
                    </FormGroup>
                    </Form>
                </CardBody>
                </Card>
            </>
        );   
    } else {return(<></>)}
}

export default ExAddConfigs1;