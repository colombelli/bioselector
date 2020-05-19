import React, { useContext, useReducer } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
  } from "reactstrap";

import {ExperimentsContext} from '../../Store';
import ExRoot from './ExRoot.jsx';



function Experiments() {

    const [experiments, setExperiments] = useContext(ExperimentsContext);

    if(experiments.page === "root"){
        return(<ExRoot />);
    } else {
        return (<><p>random</p></>)
    } 
        
            
  };

  export default Experiments;