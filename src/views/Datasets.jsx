import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";

  const electron = window.require('electron');
  const { ipcRenderer } = electron;

export class Datasets extends Component {
    

    addDataset = () => {

        console.log('trying...')
        console.log('i swear...')

        ipcRenderer.send('loadDataset', {
            data: 5
        });

        ipcRenderer.on('loadDatasetBG_MESSAGE', (event, args) => {
            console.log('a message from bg:')
            console.log(args)
        });
    }
    

    deleteDataset = () => {

        console.log('yaa')
        console.log('yoo')

        ipcRenderer.send('deleteDataset', {
            data: 4
        });

        ipcRenderer.on('deleteDatasetBG_MESSAGE', (event, args) => {
            console.log("received a message from background")
            console.log(args)
        });

    }

    render() {
        return (
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
                        <div onClick={() => alert("ye")}>
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
                        <div className="stats">
                            <i className="fas fa-info-circle" style={{color:'white'}} /> See accepted format
                        </div>
                        </CardFooter>
                        </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Datasets
