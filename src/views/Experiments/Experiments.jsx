import React, { useContext } from 'react';

import {ExperimentsContext} from '../../Store';
import ExRoot from './ExRoot.jsx';
import ExAdd from './ExAdd.jsx';


function Experiments() {

    const [experiments, ] = useContext(ExperimentsContext);

    if(experiments.view === "root"){
        return(<ExRoot />);
    } else if(experiments.view === "add") {
        return (<ExAdd />)
    } else {
        return (<><p>else</p></>);
    }
        
            
  };

  export default Experiments;