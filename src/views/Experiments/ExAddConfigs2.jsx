import React, { useContext } from 'react';
import {
    FormGroup,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";
import {SelectorsContext} from '../../Store.js';

const electron = window.require('electron');
const { ipcRenderer } = electron;  


function ExAddConfigs2(props){
    
    const [selectors, setSelectors] = useContext(SelectorsContext);

    function getFileNameFromPath(path){
        return path.split('\\').pop().split('/').pop().split('.')[0];
    }

    function getScriptLangFromPath(path){
        let extension = path.split('\\').pop().split('/').pop().split('.').pop();
        if(extension === "py"){return "python"}
        else if(extension === "r"){return "r"}
        return
    }

    function addAggregator(){
        let path = ipcRenderer.sendSync('BROWSE_FILE_METHOD');
        if(path.length === 1){ // if some file was selected
            
            //TODO: copy the file to the scripts/engine/etc etc folder

            let fileName = getFileNameFromPath(path[0]);
            let lang = getScriptLangFromPath(path[0]);
            
            let label = ipcRenderer.sendSync('ASK_SELECTOR_INFO', "label");
            if(label === null){return};
            let rankingFile = ipcRenderer.sendSync('ASK_SELECTOR_INFO', "ranking");
            if(rankingFile === null){return};
            
            const newSelector = {label: label, fileName: fileName, lang: lang, rankingFile: rankingFile};
            const newSelectors = [...selectors];
            newSelectors.push(newSelector);
            setSelectors(newSelectors);
        }
        return
    }


    function renderRightForm() {

        return(
            selectors.map((method, index) => {

                return(
                    <label className="configs" key={index}>
                        {method.label}
                        <input type="radio" name="selector" value={method.fileName} ref={props.register({ required: true })}/>{' '}
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
                        {renderRightForm()}
                    </Col>
                    </FormGroup>
                </CardBody>
                <Button color="secundary" onClick={addAggregator}>Add New</Button>
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
                        <CardTitle tag="h7">Level 1:</CardTitle>
                        {renderRightForm()}
                        <CardTitle tag="h7">Level 2:</CardTitle>
                        {renderRightForm()}
                    </Col>
                    </FormGroup>
                </CardBody>
                <Button color="secundary" onClick={addAggregator}>Add New</Button>
                </Card>
            </Col>
        );
    }
    
    else {return(<></>)}
}

export default ExAddConfigs2;