import React, { useState } from 'react';
import {
    FormGroup,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";

const electron = window.require('electron');
const { ipcRenderer } = electron;  

function ExAddConfigs1(props){
    
    var implementedMethods = [

        {label:"ReliefF", fileName: "reliefF", lang: "python", rankingFile: "rf"},
        {label:"Characteristic Direction", fileName: "geoDE", lang: "python", rankingFile: "gd"},
        {label:"Gain Ratio", fileName: "gain-ratio", lang: "r", rankingFile: "gr"},
        {label:"Symmetrical Uncertainty", fileName: "symmetrical-uncertainty", lang: "r", rankingFile: "su"},
        {label:"One Rule", fileName: "oneR", lang: "r", rankingFile: "or"}

    ]

    const [availableMethods, setMethods] = useState(implementedMethods);


    function getFileNameFromPath(path){
        return path.split('\\').pop().split('/').pop().split('.')[0];
    }

    function getScriptLangFromPath(path){
        let extension = path.split('\\').pop().split('/').pop().split('.').pop();
        if(extension === "py"){return "python"}
        else if(extension === "r"){return "r"}
        return
    }

    function addMethod(){
        let path = ipcRenderer.sendSync('BROWSE_FILE_METHOD');
        if(path.length === 1){ // if some file was selected
            
            //TODO: copy the file to the scripts/engine/etc etc folder

            let fileName = getFileNameFromPath(path[0]);
            let lang = getScriptLangFromPath(path[0]);
            
            let label = ipcRenderer.sendSync('ASK_SELECTOR_INFO', "label");
            if(label === null){return};
            let rankingFile = ipcRenderer.sendSync('ASK_SELECTOR_INFO', "ranking");
            if(rankingFile === null){return};
            
            const newMethod = {label: label, fileName: fileName, lang: lang, rankingFile: rankingFile};
            const newMethods = [...availableMethods];
            newMethods.push(newMethod);
            setMethods(newMethods);
        }
        return
    }


    function renderRightForm() {
            
        if(props.methods.sin || props.methods.hom){
            return(
                availableMethods.map((method, index) => {

                    return(
                        <FormGroup check>
                            <div style={{paddingLeft:"12px"}}>
                            <input type="radio" name="same" value={method.fileName} ref={props.register}/>{' '}
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
                            <div style={{paddingLeft:"12px"}}>
                            <input type="radio" name={method.fileName} value="selected" ref={props.register} />{' '}
                            {method.label}
                            </div>
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
                    
                    <FormGroup row>
                    <Col>
                        {renderRightForm()}
                    </Col>
                    </FormGroup>
                </CardBody>
                <Button color="secundary" onClick={addMethod}>Add New</Button>
                </Card>
            </>
        );   
    } else {return(<></>)}
}

export default ExAddConfigs1;