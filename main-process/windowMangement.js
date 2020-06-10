const { ipcMain, BrowserWindow } = require('electron');
const { dialog } = require('electron');

ipcMain.on('MINIMIZE_WINDOW', (event, args) => {
	var window = BrowserWindow.getFocusedWindow();
    window.minimize();
});


ipcMain.on('BROWSE_DATASETS', (event, args) => {

    dialog.showOpenDialog(
        {   
            title: "Add Dataset (csv or rds files)",
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'RDS object and CSV table', extensions: ['rds', 'csv'] }
            ] 
        },
        (filename) => {
            if (filename === undefined) {
                return;
            }
            event.returnValue = filename;
        }
    )
});



ipcMain.on('BROWSE_DATASET', (event, args) => {

    dialog.showOpenDialog(
        {   
            title: "Select Dataset (csv or rds files)",
            properties: ['openFile'],
            filters: [
                { name: 'RDS object and CSV table', extensions: ['rds', 'csv'] }
            ] 
        },
        (filename) => {
            if (filename === undefined) {
                return;
            }
            event.returnValue = filename;
        }
    )
});



ipcMain.on('BROWSE_FILE_METHOD', (event, args) => {

    dialog.showOpenDialog(
        {   
            title: "Select new method (.py or .r files only)",
            properties: ['openFile'],
            filters: [
                { name: 'Script', extensions: ['py', 'r'] }
            ] 
        },
        (filename) => {
            event.returnValue = filename;
        }
    )
});



