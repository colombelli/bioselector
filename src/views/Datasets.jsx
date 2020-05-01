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
    
    componentDidMount()
    {
        //Set listeners
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

    addDataset = () => {

        console.log('add clicked...');
        const loadPath = '/home/blabla/baa.txt';

        ipcRenderer.send('loadDataset', loadPath);
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
