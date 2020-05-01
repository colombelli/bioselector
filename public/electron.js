const electron = require('electron');
const path = require('path');
const url = require('url');

const { app } = electron;
const { BrowserWindow } = electron;


let mainWindow;

function createWindow() {
	const startUrl = process.env.DEV
		? 'http://localhost:3000'
		: url.format({
				pathname: path.join(__dirname, '/../build/index.html'),
				protocol: 'file:',
				slashes: true,
		  });
	mainWindow = new BrowserWindow({
		width: 1050, 
		height: 680, 
		frame: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadURL(startUrl);
	process.env.DEV && mainWindow.webContents.openDevTools();

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});


// Array that'll inform all background task which
// have the same ipc communication logic
global.sharedObj = {commonBGtasks: ['loadDataset', 'deleteDataset']};

require('../main-process/windowMangement')
require('../main-process/commonMain')

