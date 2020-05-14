const { ipcMain, BrowserWindow } = require('electron');
const { dialog } = require('electron');
const prompt = require('electron-prompt');

ipcMain.on('MINIMIZE_WINDOW', (event, args) => {
	var window = BrowserWindow.getFocusedWindow();
    window.minimize();
});


ipcMain.on('BROWSE_FILE', (event, args) => {

    dialog.showOpenDialog(
        {   
            title: "Add Dataset (csv or rds files)",
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'RDS object', extensions: ['rds'] },
                { name: 'CSV table', extensions: ['csv'] }
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

