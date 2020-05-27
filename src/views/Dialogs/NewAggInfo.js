import React from 'react';
import ReactDOM from "react-dom";
import {
    FormGroup,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";

const electron = window.require('electron');
const { ipcRenderer } = electron;  


ReactDOM.render(
    <Button color="secundary" onClick={()=>{}}>Add</Button>,
    document.getElementById("newAggInfoAlert")
);