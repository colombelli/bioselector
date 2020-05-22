import React, { useRef, useLayoutEffect, useState, useInput } from 'react';
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Row,
    Col,
    Button,
    Form,Input, FormGroup
} from "reactstrap";

import {useForm} from "react-hook-form";

import {ExperimentsContext} from '../../Store.js';
import ExAddConfigs1 from './ExAddConfigs1.jsx';

function ExAdd(){

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });
    const [selectedMethod, setSelectedMethod] = useState(selectedMethodToggler());
    const [configs1, setConfigs1] = useState();
    const {register, handleSubmit} = useForm();
    
  
    // holds the timer for setTimeout and clearInterval
    let movement_timer = null;

    // the number of ms the window size must stay the same size before the
    // dimension state variable is reset
    const RESET_TIMEOUT = 100;

    // every time the window is resized, the timer is cleared and set again
    // the net effect is the component will only reset after the window size
    // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
    // redrawing of the component for more complex components such as charts
    window.addEventListener('resize', ()=>{
        clearInterval(movement_timer);
        movement_timer = setTimeout(testDimensions, RESET_TIMEOUT);
    });
    
    const testDimensions = () => {
        // For some reason targetRef.current.getBoundingClientRect was not available
        // I found this worked for me, but unfortunately I can't find the
        // documentation to explain this experience
        if (targetRef.current) {
          setDimensions({
            width: targetRef.current.offsetWidth,
            height: targetRef.current.offsetHeight + 1.8
          });
        }
    }

    // This sets the dimensions on the first render
    useLayoutEffect(() => {
        testDimensions();
    }, []);


    function selectedMethodToggler(selected) {

        var base = {
            sin: false,
            hom: false,
            het: false,
            hyb: false
        };
    
        if (selected === "sin"){
            base.sin = true;
        } else if (selected === "hom") {
            base.hom = true;
        } else if (selected === "het") {
            base.het = true;
        } else if (selected === "hyb") {
            base.hyb = true;
        } else {
            return base;
        }
    
        setSelectedMethod(base);
        return
    }


    function getMethodCardClass(method) {

        var cardClass = "card-method";

        if (method){
            return cardClass + " selected";
        } else {
            return cardClass;
        }
    }


    const onSubmit = (data) => {
        console.log(data)};

    return(
    <>
    <div className="content">
        <Row>
            <Col>
                <Card 
                className={getMethodCardClass(selectedMethod.sin)} body
                style={{height:dimensions.height}}
                >
                <CardTitle tag="h5">Single Feature Selectior</CardTitle>
                <hr></hr>
                <CardBody>
                <CardText>
                    This method uses a simple feature selection process with 
                    just one feature selection algorithm.
                </CardText>
                </CardBody>
                <Button onClick={() => {
                    selectedMethodToggler("sin");
                }}>Pick</Button>
                </Card>
            </Col>

            <Col>
                <Card 
                className={getMethodCardClass(selectedMethod.het)} body
                style={{height:dimensions.height}}
                >
                <CardTitle tag="h5">Heterogeneous Ensemble</CardTitle>
                <hr></hr>
                <CardBody>
                <CardText>
                    This method uses a heterogeneous ensemble feature selection process
                    with chosen feature selection methods
                </CardText>
                </CardBody>
                <Button onClick={() => {
                    selectedMethodToggler("het");
                }}>Pick</Button>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col>
                <div ref={targetRef} className="shadow">
                <Card className={getMethodCardClass(selectedMethod.hom)} body>
                <CardTitle tag="h5">Homogeneous Ensemble</CardTitle>
                <hr></hr>
                <CardBody>
                <CardText>
                    This method uses a homogeneous ensemble feature selection process
                    with one feature selection method and a given number of bootstraps.
                </CardText>
                </CardBody>
                <Button onClick={() => {
                    selectedMethodToggler("hom");
                }}>Pick</Button>
                </Card>
                </div>
            </Col>

            <Col>
                <Card 
                className={getMethodCardClass(selectedMethod.hyb)} body
                style={{height:dimensions.height}}
                >
                <CardTitle tag="h5">Hybrid Ensemble</CardTitle>
                <hr></hr>
                <CardBody>
                <CardText>
                    This method uses a hybrid ensemble feature selection process
                    with chosen feature selection methods and a given number of bootstraps.   
                </CardText>
                </CardBody>
                <Button onClick={() => {
                    selectedMethodToggler("hyb");
                }}>Pick</Button>
                </Card>
            </Col>

        </Row>

        <Row>
        
            <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ExAddConfigs1 
                methods={selectedMethod} 
                configs={configs1} 
                setConfigs={setConfigs1}
                register={register}/>
                <Button>Submit</Button>
            </Form>
            </Col>
        
        </Row>

    </div>
        
    </>
    );
}

export default ExAdd;