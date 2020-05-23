const { ipcMain, BrowserWindow } = require('electron');
const { dialog } = require('electron');
const prompt = require('electron-prompt');

ipcMain.on('MINIMIZE_WINDOW', (event, args) => {
	var window = BrowserWindow.getFocusedWindow();
    window.minimize();
});


ipcMain.on('BROWSE_FILES', (event, args) => {

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
            event.sender.send('LOADED_FILE', filename);
        }
    )
});



ipcMain.on('BROWSE_FILE', (event, args) => {

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
            event.returnValue = filename
        }
    )
});


ipcMain.on('ASK_DATASET_TITLE', (event, path) => {

    prompt({
        title: 'Choose Dataset Title',
        label: path,
        inputAttrs: { // attrs to be set if using 'input'
            type: 'input'
        }
    })
    .then((r) => {
        event.returnValue = r
    })

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
            event.returnValue = filename
        }
    )
});


ipcMain.on('ASK_SELECTOR_INFO', (event, type) => {

    var lab;

    if(type === "label"){
        lab = 'Selector Name:';
    } else {
        lab = 'Name for saving the ranking file:';
    }

    prompt({
        title: 'Selector Info',
        label: lab,
        inputAttrs: {
            type: 'text'
        },
    })
    .then((r) => {
        event.returnValue = r
    })

});


