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


function ExAddConfigs1(props){
    
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

    function addMethod(){
        let path = ipcRenderer.sendSync('BROWSE_FILE_METHOD');
        if(path.length === 1){ // if some file was selected
            

            let fileName = getFileNameFromPath(path[0]);
            let lang = getScriptLangFromPath(path[0]);
            
            let values = ipcRenderer.sendSync('ASK_SELECTOR_INFO');
            if(values === null){
                return
            }

            let scriptAddition = ipcRenderer.sendSync('addSelector', path);
            //TO-DO: if scriptAddition[0] == "ERR": warn user  
            
            const newSelector = {label: values.label, fileName: fileName, 
                                lang: lang, rankingFile: values.ranking};
            const newSelectors = [...selectors];
            newSelectors.push(newSelector);
            setSelectors(newSelectors);
        }
        return
    }


    function renderRightForm() {
            
        if(props.methods.sin || props.methods.hom){
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

        else if(props.methods.het || props.methods.hyb) {
            return(

                selectors.map((method, index) => {
                    return(
                            <label className="configs" key={index}>
                                {method.label}
                                <input type="checkbox" name={method.fileName} value={method.fileName} ref={props.register()} />{' '}
                                <span className="checkmark"></span>
                            </label>
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