import React from 'react';
import {
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap";


function ExAddConfigs2(props){

    function hasBootstraps(){

        if (props.methods.hyb ||  props.methods.hom){
            return(
                <Col>
                <FormGroup>
                    <Label>Bootstrap samples</Label>
                    <Input 
                        type="number" 
                        name="bootstraps"
                        placeholder="Ex: 50" 
                        innerRef={props.register({ required: true })}/>
                </FormGroup> 
                </Col>
            );
        }

    }

    

        if (props.methods.hyb ||  props.methods.hom ||
            props.methods.sin ||  props.methods.het){
            return(
                <Card body>
                <CardBody>
                
                <Row>
                
                {hasBootstraps()}
                    
                <Col>
                <FormGroup>
                    <Label>Folds</Label>
                    <Input 
                        type="number" 
                        name="folds"
                        placeholder="Ex: 5" 
                        innerRef={props.register({ required: true })}/>
                </FormGroup> 
                </Col>

                <Col>
                <FormGroup>
                    <Label>Thresholds</Label>
                    <Input 
                        type="text" 
                        name="thresholds"
                        placeholder="Ex: 1,5,10,25,50,100" 
                        innerRef={props.register({ required: true })}/>
                </FormGroup> 
                </Col>

                <Col>
                <FormGroup>
                    <Label>Seed</Label>
                    <Input 
                        type="number" 
                        name="seed"
                        placeholder="Ex: 42" 
                        innerRef={props.register({ required: true })}/>
                </FormGroup> 
                </Col>
                </Row>
                </CardBody>
                </Card>
            );
        } 

        else {
            return(<></>);
        }
    
}

export default ExAddConfigs2;