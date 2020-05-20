import React from 'react';
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Row,
    Col,
    Button
} from "reactstrap";


function ExAddConfigs1(props){
    
    if(props.methods.sin || props.methods.hom){
        return(
            <p>one sel</p>
        );
    } 
    
    
    
    else if(props.methods.het || props.methods.hyb) {
        return(
            <p>n sels</p>
        );
    } 
    
    
    
    else {
        return (<></>);
    }
}

export default ExAddConfigs1;