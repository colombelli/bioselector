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
    ListGroup,
    ListGroupItem
  } from "reactstrap";
  import { v4 as uuidv4 } from 'uuid';

  const electron = window.require('electron');
  const { ipcRenderer } = electron;
  
  

export class Datasets extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            datasets: [],
            removable: false,
            changeable: false,
            cursor: "auto"
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

    removeRow(id) {
        
        let datasets = this.state.datasets

        if (this.state.removable) {
            
            let updated_datasets = []
            datasets.map((dataset, index) => {
                if(dataset.id !== id){
                    updated_datasets.push(dataset)
                }
            });

            this.setState({
                datasets: updated_datasets
            })

        } else {
            return
        }
    }

    changeTitle(id) {

      if (this.state.changeable) {

        let datasets = this.state.datasets
        let updated_datasets = datasets.map((dataset, index) => {
                if(dataset.id === id){
                  let title = ipcRenderer.sendSync('ASK_DATASET_TITLE', dataset.path)
                  if(title !== null){dataset.title = title}
                }
                return dataset
            });

        this.setState({
          datasets: updated_datasets
        })

      } else {
        return
      }
    }


    changePath(id) {

      if (this.state.changeable) {

        let datasets = this.state.datasets
        let updated_datasets = datasets.map((dataset, index) => {
                if(dataset.id === id){
                  let path = ipcRenderer.sendSync('BROWSE_FILE', dataset.path)
                  if(path !== null){dataset.path = path}
                }
                return dataset
            });

        this.setState({
          datasets: updated_datasets
        })

      } else {
        return
      }
    }


    renderDatasetsTable() {
        return this.state.datasets.map((dataset, index) => {
           const { id, title, path } = dataset
           return (
                <tr key={id} id={id} onClick={() => this.removeRow(id)}
                style={{cursor: this.state.cursor}}>
                    <td onClick={() => this.changeTitle(id)}>{title}</td>
                    <td className="text-right" onClick={() => this.changePath(id)}>{path}</td>
                </tr>
           )
        })
     }



    addDataset = () => {
        ipcRenderer.send('BROWSE_FILES');
    }
    

    deleteDataset = () => {

        let updated_cursor

        if(this.state.removable){  // then removable will turn to false later
            updated_cursor = "auto"
        }else{
            updated_cursor = "pointer"
        }

        this.setState({
            removable : !this.state.removable,
            changeable: false,
            cursor: updated_cursor
        })

        /*
        console.log('deleting')
        const datasetID = 'saf132fnj'
        ipcRenderer.send('deleteDataset', datasetID);
        */

    }

    changeDataset = () => {

        let updated_cursor

        if(this.state.changeable){
            updated_cursor = "auto"
        }else{
            updated_cursor = "pointer"
        }

        this.setState({
            removable : false,
            changeable: !this.state.changeable,
            cursor: updated_cursor
        })

        //ipcRenderer.send('count-win', 'a')
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
                            <i className="fas fa-info-circle" style={{color:'white'}} /> See expected format
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                    <Col>
                        <div onClick={this.changeDataset}>
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
                  hover={this.state.removable || this.state.changeable} 
                  bordered={this.state.removable || this.state.changeable}>
                    <thead className="text-success">
                      <tr>
                        <th>TITLE</th>
                        <th className="text-right">PATH</th>
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
        )
    }
}

export default Datasets
