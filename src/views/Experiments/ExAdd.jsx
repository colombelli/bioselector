import React, { useRef, useLayoutEffect, useState, useContext } from 'react';
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Row,
    Col,
    Button,
    Form
} from "reactstrap";

import {useForm} from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import {ExperimentsContext, DatasetsContext, SelectorsContext} from '../../Store.js';
import ExAddConfigs1 from './ExAddConfigs1.jsx';
import ExAddConfigs2 from './ExAddConfigs2.jsx';
import ExAddConfigs3 from './ExAddConfigs3.jsx';
import ExAddDatasets from './ExAddDatasets.jsx';

export const SelectedDatasetsContext = React.createContext({});

function ExAdd(){

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });
    const [selectedMethod, setSelectedMethod] = useState(selectedMethodToggler());
    const {register, handleSubmit, unregister, getValues} = useForm();
    const [selectedDatasets, setSelectedDatasets] = useState({});

    const [availableDatasets, ] = useContext(DatasetsContext);
    const [availableSelectors, ] = useContext(SelectorsContext);
    const [experiments, setExperiments] = useContext(ExperimentsContext);
  
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


    function clearRegisteredData(){
        
        let registeredNames = Object.keys(getValues());
        registeredNames.forEach(name => {
            unregister(name);
        });
        
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
        clearRegisteredData(); 
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


    const getSelectedMethod = () => {

        for (var method in selectedMethod){
            if(selectedMethod[method] === true){
                return method;
            }
        }
    }


    const getSelectorInfo = (selector) => {

        const selectorDict = availableSelectors.find((sel, _) => {
            if(sel.fileName === selector){
                return sel;
            }
        });
        
        return [selectorDict.fileName, 
                selectorDict.lang, 
                selectorDict.rankingFile];
    }


    const getSelectors = (data, experimentType) => {

        const selectors = [];

        if((experimentType === "hom") || (experimentType === "sin")){
            selectors.push(getSelectorInfo(data.selector));
            return selectors
        } else {  // hyb/het: more than one selector

            for(let dataKey in data){
                if(data[dataKey] === dataKey) {
                    selectors.push(getSelectorInfo(dataKey));
                }
            }
            return selectors;
        }
    }

    const getAggregators = (data, experimentType) => {
        
        if(experimentType === "sin"){
            return [" "];
        } else if(experimentType === "hyb") {
            return [data["lvl1"], data["lvl2"]];
        } else {  // hom/het
            return [data["oneAgg"]];
        }
    }


    const getSelectedDatasets = () => {
        
        const paths = [];
        for (let arrayElement in availableDatasets) {
            
            let dataset = availableDatasets[arrayElement]; 
            let id = dataset["id"]; 
            if (selectedDatasets[id]) {
                paths.push(dataset["path"]);
            }
        }
        return paths;
    }


    const mountExperimentDataStructure = (data) => {
        
        const experimentType = getSelectedMethod();
        const selectors = getSelectors(data, experimentType);
        const aggregators = getAggregators(data, experimentType);
        const datasets = getSelectedDatasets();

        const experiment = {
            "type": experimentType,
            "selectors": selectors,
            "aggregators": aggregators,
            "datasets": datasets,
        }        
        
        return experiment;
    }


    const onSubmit = (data) => {

        //if at least one dataset was selected
        for (var id in selectedDatasets) {
            if (selectedDatasets[id] === true) { // if at least one dataset was chosen, then do the magic
                
                let experimentDS = mountExperimentDataStructure(data);
                experimentDS["id"] = uuidv4();

                
                const newExperiments = {...experiments};
                newExperiments["list"].push(experimentDS);
                newExperiments["view"] = "root";
                setExperiments(newExperiments)
                return;
            }
        }

        //else
        //TO-DO: "you must select at least one dataset to be part of the experiment"
        
    };

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
        
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
            
            <Col>
                <ExAddConfigs1 
                methods={selectedMethod}
                register={register}/>
            </Col>
                <ExAddConfigs2 
                methods={selectedMethod}
                register={register} />
        
        </Row>

        <Row>
            <ExAddConfigs3 
            methods={selectedMethod}
            register={register}/>
        </Row>

        <Row>
            <SelectedDatasetsContext.Provider value={[selectedDatasets, setSelectedDatasets]}>
            <ExAddDatasets 
                methods={selectedMethod}
                register={register}/>
            </SelectedDatasetsContext.Provider>
        </Row>

        <Button>Submit</Button>
        </Form>
    </div>
        
    </>
    );
}

export default ExAdd;