const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');



let alertWin;

ipcMain.on('ASK_AGGREGATOR_INFO', (event, type) => {

    var winHeight;
    if(type === "oneAggInfo"){
        winHeight = 296;
    } else if (type === "hybAggInfo") {
        winHeight = 313;
    }

    const alertHtml = url.format({
        pathname: path.join(__dirname, `../alert_views/${type}.html`),
        protocol: 'file:',
        slashes: true,
    });

    alertWin = new BrowserWindow({
        width: 317,
        height: winHeight,
        resizable: false,
        frame: false,
        show: true,
		webPreferences: {
			nodeIntegration: true,
		},
    });

    alertWin.loadURL(alertHtml);

    alertWin.on('closed', () => {
        alertWin = null;
    });


    ipcMain.once('NEW_AGG_INFO_PROVIDED', (_, aggInfo) => {
        alertWin.close();
        event.returnValue = aggInfo;
    });
});


ipcMain.on('ASK_SELECTOR_INFO', (event, _) => {

    const alertHtml = url.format({
        pathname: path.join(__dirname, `../alert_views/selectorInfo.html`),
        protocol: 'file:',
        slashes: true,
    });

    alertWin = new BrowserWindow({
        width: 317,
        height: 377,
        resizable: false,
        frame: false,
        show: true,
		webPreferences: {
			nodeIntegration: true,
		},
    });

    alertWin.loadURL(alertHtml);

    alertWin.on('closed', () => {
        alertWin = null;
    });


    ipcMain.once('NEW_SELECTOR_INFO_PROVIDED', (_, selectorInfo) => {
        alertWin.close();
        event.returnValue = selectorInfo;
    });
});



ipcMain.on('ASK_DATASET_INFO', (event, _) => {

    const alertHtml = url.format({
        pathname: path.join(__dirname, `../alert_views/datasetInfo.html`),
        protocol: 'file:',
        slashes: true,
    });

    alertWin = new BrowserWindow({
        width: 317,
        height: 296,
        resizable: false,
        frame: false,
        show: true,
		webPreferences: {
			nodeIntegration: true,
		},
    });

    alertWin.loadURL(alertHtml);

    alertWin.on('closed', () => {
        alertWin = null;
    });


    ipcMain.once('NEW_DATASET_INFO_PROVIDED', (_, datasetTitle) => {
        alertWin.close();
        event.returnValue = datasetTitle;
    });
});


ipcMain.on('OPEN_PROGRESS_BAR_WINDOW', (event, checkpoints) => {

    const alertHtml = url.format({
        pathname: path.join(__dirname, `../alert_views/expProgressBar.html`),
        protocol: 'file:',
        slashes: true,
    });

    alertWin = new BrowserWindow({
        width: 420,
        height: 456,
        resizable: false,
        frame: false,
        show: true,
		webPreferences: {
			nodeIntegration: true,
		},
    });

    alertWin.loadURL(alertHtml);

    alertWin.on('closed', () => {
        alertWin = null;
    });


    ipcMain.once('CANCEL_EXPERIMENTS_RUNNING', (event, _) => {
        alertWin.close();
        event.returnValue = null;
    });

    ipcMain.once('CLOSE_EXPERIMENTS_PROGRESS_WINDOW', (event, _) => {
        alertWin.close();
        event.returnValue = null;
    });
});