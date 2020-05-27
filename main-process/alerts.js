const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');



let alertWin;

ipcMain.on('ASK_AGGREGATOR_INFO', (event, type) => {

    const alertHtml = url.format({
        pathname: path.join(__dirname, `../alert_views/hybAggInfo.html`),
        protocol: 'file:',
        slashes: true,
    });

    alertWin = new BrowserWindow({
        useContentSize: true,
        frame: false,
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