import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
  import { v4 as uuidv4 } from 'uuid';

  const electron = window.require('electron');
  const { ipcRenderer } = electron;
  
  

export class Datasets extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            datasets: [
                
            ]
        }
    }

    componentDidMount()
    {
        //Set listeners
        ipcRenderer.on('LOADED_FILE', (event, dsPaths) => {

            
            let updated_datasets = this.state.datasets;
            dsPaths.map((dsPath, index) => {
                updated_datasets.push({
                    id: uuidv4(), 
                    title: ipcRenderer.sendSync('ASK_DATASET_TITLE', dsPath), 
                    path: dsPath})
            });

            this.setState({datasets: updated_datasets});
            console.log(this.state.datasets)
            
        });

        ipcRenderer.on('loadDatasetBG_MESSAGE', (event, args) => {
            console.log('a message from bg:')
            console.log(args)
        });


        ipcRenderer.on('deleteDatasetBG_MESSAGE', (event, args) => {
            console.log("received a message from background")
            console.log(args)
        });

        ipcRenderer.on('count-win', (event, args) => {
            console.log("windows count")
            console.log(args)
        });
    }


    renderDatasetsTable() {
        return this.state.datasets.map((dataset, index) => {
           const { id, title, path } = dataset
           return (
                <tr key={id}>
                    <td>{title}</td>
                    <td className="text-right">{path}</td>
                </tr>
           )
        })
     }



    addDataset = () => {
        ipcRenderer.send('BROWSE_FILE');
    }
    

    deleteDataset = () => {

        console.log('deleting')
        const datasetID = 'saf132fnj'
        ipcRenderer.send('deleteDataset', datasetID);


    }

    countWindows = () => {

        ipcRenderer.send('count-win', 'a')


    }

    render() {
        return (
            <>
            <div className="content">
                <Row>
                    <Col>
                        <div onClick={this.addDataset}>
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
                            <i className="fas fa-info-circle" style={{color:'white'}} /> See accepted format
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                    <Col>
                        <div onClick={this.countWindows}>
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
                            <i className="fas fa-info-circle" style={{color:'white'}} /> See accepted format
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                    <Col>
                        <div onClick ={ this.deleteDataset }>
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
                        
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                </Row>
            
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Datasets to select the genes from</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table striped hover>
                    <thead className="text-success">
                      <tr>
                        <th>Title</th>
                        <th className="text-right">Path</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.renderDatasetsTable()}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Datasets format</CardTitle>
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
              </CardBody>
            </Card>
          </Col>
        </Row>

        </div>
        </>
        )
    }
}

export default Datasets
