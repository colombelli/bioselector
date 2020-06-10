import React, { useContext, useReducer } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Table
} from "reactstrap";
import {DatasetsContext} from '../../Store.js';
import {SelectedDatasetsContext} from './ExAdd.jsx';

function ExAddDatasets(props){
    
    const [datasets, ] = useContext(DatasetsContext);
    const [selectedDatasets, setSelectedDatasets] = useContext(SelectedDatasetsContext);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    function addToSelectedDatasetsDict(id){
        
        if (!selectedDatasets[id]){     // if there isn't already this entry or there is but it is false
            selectedDatasets[id] = false;
        } // else don't change the value of the key
        return
    };


    function renderDatasetsTable() {
        return datasets.map((dataset, index) => {
        const { id, title, path } = dataset
        addToSelectedDatasetsDict(id);

        return (
                <tr key={id} id={id} onClick={() => toggleDatasetSelection(id)}
                    style={{cursor: "pointer", backgroundColor: getRowBgColor(id)}}>

                    <td>{title}</td>
                    <td className="text-right">{path}</td>
                </tr>
        )
        });

    };


    function toggleDatasetSelection(id){

        selectedDatasets[id] = !selectedDatasets[id];
        setSelectedDatasets(selectedDatasets);
        forceUpdate();
        return
    }


    function getRowBgColor(id){

        if(selectedDatasets[id]){
            return "#6bd098";
        } else{
            return "white";
        }

    }


    if( props.methods.het || props.methods.hyb || 
        props.methods.sin || props.methods.hom){
        
        return(
            <>
                <Card body>
                <CardTitle tag="h5">Available Datasets</CardTitle>
                <CardBody>

                    <Table 
                    hover={true}>
                        <thead className="text-success">
                        <tr>
                            <th>TITLE</th>
                            <th className="text-right">PATH</th>
                        </tr>
                        </thead>
                        <tbody>
                            {renderDatasetsTable()}
                        </tbody>
                    </Table>
                    
                </CardBody>
                </Card>
            </>
        );   
    } else {return(<></>)}
}

export default ExAddDatasets;