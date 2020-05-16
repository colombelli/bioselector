import React, { useContext, useReducer } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Table,
    Row,
    Col,
    ListGroup,
    ListGroupItem
  } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';
import {DatasetsContext} from '../Store';

const electron = window.require('electron');
const { ipcRenderer } = electron;  

var removable = false;
var changeable = false;
var cursor = "auto";

function Datasets() {
    
    const [datasets, setDatasets] = useContext(DatasetsContext);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    
      //Set listeners
      ipcRenderer.once('LOADED_FILE', (event, dsPaths) => {
        const updatedDatasets = [...datasets];

          dsPaths.map((dsPath, index) => {
            updatedDatasets.push({
              id: uuidv4(), 
              title: ipcRenderer.sendSync('ASK_DATASET_TITLE', dsPath), 
              path: dsPath})
          });

        setDatasets(updatedDatasets);
      });

      /*
      ipcRenderer.on('deleteDatasetBG_MESSAGE', (event, args) => {
          console.log("received a message from background")
          console.log(args)
      });

      ipcRenderer.on('count-win', (event, args) => {
          console.log("windows count")
          console.log(args)
      });
      */




    function removeRow(id) {
    
      if (removable) {
          
          let updatedDatasets = []
          datasets.map((dataset, index) => {
              if(dataset.id !== id){
                updatedDatasets.push(dataset);
              };
          });
    
          setDatasets(updatedDatasets);
    
      } else {
          return;
      };
    };
    

    function changeTitle(id) {
    
      if (changeable) {
        let updatedDatasets = datasets.map((dataset, index) => {
          if(dataset.id === id){
            let title = ipcRenderer.sendSync('ASK_DATASET_TITLE', dataset.path);
            if(title !== null){dataset.title = title};
          }
          return dataset;
        });
      
        setDatasets(updatedDatasets);

      } else {
        return;
      };
    };
    
    
    function changePath(id) {
    
      if (changeable) {
        
        let updatedDatasets = datasets.map((dataset, index) => {
          if(dataset.id === id){
            let path = ipcRenderer.sendSync('BROWSE_FILE', dataset.path);
            if(path !== null){dataset.path = path};
          }
          return dataset
        });
      
        setDatasets(updatedDatasets);
      
      } else {
        return;
      };
    };
    
    
    function renderDatasetsTable() {
      return datasets.map((dataset, index) => {
         const { id, title, path } = dataset
         return (
              <tr key={id} id={id} onClick={() => removeRow(id)}
              style={{cursor: cursor}}>
                  <td onClick={() => changeTitle(id)}>{title}</td>
                  <td className="text-right" onClick={() => changePath(id)}>{path}</td>
              </tr>
         )
      })
    };
    
    
    
    function addDataset () {
        ipcRenderer.send('BROWSE_FILES');
    };
    
    
    function deleteDataset() {
    
      if(removable){  // then removable will turn to false later
          cursor = "auto";
      }else{
          cursor = "pointer";
      };

      removable = !removable;
      changeable = false;
      forceUpdate();

    
      /*
      console.log('deleting')
      const datasetID = 'saf132fnj'
      ipcRenderer.send('deleteDataset', datasetID);
      */
    
    };
    
    function changeDataset() {
    
      let updatedCursor;
    
      if(changeable){
        updatedCursor = "auto";
      }else{
        updatedCursor = "pointer";
      }
    
      removable = false;
      changeable = !changeable;
      cursor = updatedCursor;
      forceUpdate();
      //ipcRenderer.send('count-win', 'a')
    };
    
  
  return (
          <>
            <div className="content">
                <Row>
                    <Col>
                        <div onClick={addDataset}>
                        <Card className="card-button add">
                        <CardBody>
                        <Row>
                            <Col>
                            <div className="icon-big text-center">
                                <i className="nc-icon nc-simple-add" />
                            </div>
                            </Col>
                            <Col>
                            <div className="numbers">
                                <CardTitle tag="p">Add</CardTitle> 
                            </div>
                            </Col>
                        </Row>
                        </CardBody>
                        <CardFooter>
                        <hr />
                        <div className="stats">
                            <i className="fas fa-info-circle" style={{color:'white'}} /> See expected format
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                    <Col>
                        <div onClick={changeDataset}>
                        <Card className="card-button add">
                        <CardBody>
                        <Row>
                            <Col>
                            <div className="icon-big text-center">
                                <i className="nc-icon nc-refresh-69" />
                            </div>
                            </Col>
                            <Col>
                            <div className="numbers">
                                <CardTitle tag="p">Change</CardTitle> 
                            </div>
                            </Col>
                        </Row>
                        </CardBody>
                        <CardFooter>
                        <hr />
                        <div className="stats">
                            <i className="fas fa-info-circle" style={{color:'white'}} /> Title or path
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                    <Col>
                        <div onClick ={deleteDataset}>
                        <Card className="card-button add">
                        <CardBody>
                        <Row>
                            <Col>
                            <div className="icon-big text-center">
                                <i className="nc-icon nc-simple-remove" />
                            </div>
                            </Col>
                            <Col>
                            <div className="numbers">
                                <CardTitle tag="p">Delete</CardTitle> 
                            </div>
                            </Col>
                        </Row>
                        </CardBody>
                        <CardFooter>
                        <hr />
                        <div className="stats">
                            <i className="fas fa-info-circle" style={{color:'white'}} /> Entire row
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                </Row>
            
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Datasets to select from</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table 
                    hover={removable || changeable} 
                    bordered={removable || changeable}>
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
              </Col>
            </Row>

            <Row id="expected_format">
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Expected format</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table striped>
                    <thead className="text-success">
                      <tr>
                        <th> </th>
                        <th>GEN1</th>
                        <th>GEN2</th>
                        <th>GEN3</th>
                        <th>GEN4</th>
                        <th>GEN5</th>
                        <th>...</th>
                        <th className="text-right">class</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Patient 1</td>
                        <td>1.4654</td>
                        <td>3.733</td>
                        <td>1.1001</td>
                        <td>7.893</td>
                        <td>-2.3452</td>
                        <td>...</td>
                        <td className="text-right">0</td>
                      </tr>
                      <tr>
                        <td>Patient 2</td>
                        <td>0.000</td>
                        <td>1.3928</td>
                        <td>1.2397</td>
                        <td>5.46</td>
                        <td>0.238</td>
                        <td>...</td>
                        <td className="text-right">0</td>
                      </tr>
                      <tr>
                        <td>Patient 3</td>
                        <td>2.3298</td>
                        <td>4.403</td>
                        <td>5.2983</td>
                        <td>-2.438</td>
                        <td>1.122</td>
                        <td>...</td>
                        <td className="text-right">1</td>
                      </tr>
                      <tr>
                        <td>Patient 4</td>
                        <td>0.2387</td>
                        <td>2.8395</td>
                        <td>-1.439</td>
                        <td>7.120</td>
                        <td>0.238</td>
                        <td>...</td>
                        <td className="text-right">1</td>
                      </tr>
                      <tr>
                        <td>Patient 5</td>
                        <td>0.44</td>
                        <td>-4.568</td>
                        <td>1.0923</td>
                        <td>6.328</td>
                        <td>2.4654</td>
                        <td>...</td>
                        <td className="text-right">0</td>
                      </tr>
                      <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td className="text-right">...</td>
                        </tr>
                      <tr>
                        <td>Patient n</td>
                        <td>1.238</td>
                        <td>-1.128</td>
                        <td>2.347</td>
                        <td>4.2373</td>
                        <td>2.547</td>
                        <td>...</td>
                        <td className="text-right">1</td>
                      </tr>
                    </tbody>
                  </Table>

                  <ListGroup>
                      <ListGroupItem color="success">* Patients in the rows</ListGroupItem>
                      <ListGroupItem color="success">* Genes in the columns</ListGroupItem>
                      <ListGroupItem color="success">* There must be a column named "class" in the last position</ListGroupItem>
                      <ListGroupItem color="success">* class column must have only 0 or 1 vlaues</ListGroupItem>
                      <ListGroupItem color="success">* A log-transformation is recommended before running any experiment</ListGroupItem>
                  </ListGroup>

                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </>
    );
    
}

export default Datasets;
