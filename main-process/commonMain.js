const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const bgTasks = ['runExperiments']


function createCommonIPCmain(bgTask) {
	
	// temporary variable to store data while background
	// process is not ready to start processing
	let cache = {
		args: undefined,
	};

	// variable that will grab main window from event sender prop
	let sender;

	// a window object outside the function scope prevents
	// the object from being garbage collected
	let hiddenWindow;

	// This event listener will listen for request
	// from visible renderer process
	ipcMain.on(bgTask, (event, args) => {
		
		sender = event.sender

		const backgroundFileUrl = url.format({
			pathname: path.join(__dirname, `../background_tasks/
				commonBGtasks.html`),
			protocol: 'file:',
			slashes: true,
		});
		hiddenWindow = new BrowserWindow({
			show: false,
			webPreferences: {
				nodeIntegration: true,
				additionalArguments: [bgTask]
			},
		});
		hiddenWindow.loadURL(backgroundFileUrl);
		
		hiddenWindow.webContents.openDevTools();

		hiddenWindow.on('closed', () => {
			hiddenWindow = null;
		});

		cache.args = args;
	});


	// This event listener will listen for data being sent back
	// from the background renderer process
	ipcMain.on(bgTask.concat('MESSAGE'), (event, args) => {
		sender.send(bgTask.concat('BG_MESSAGE'), args.message);
	});


	ipcMain.on(bgTask.concat('ERR'), (event, args) => {
		sender.send(bgTask.concat('ERR'), args);
	});

	ipcMain.on(bgTask.concat('FINISHED'), (event, args) => {
		sender.send(bgTask.concat('FINISHED'), args);
	});


	// When background is ready to process, this listener will tell 
	// it to start the background processing
	ipcMain.on(bgTask.concat('READY'), (event, args) => {
		event.reply(bgTask.concat('START'),  cache.args);
	});
}

bgTasks.forEach(createCommonIPCmain)

ipcMain.on('count-win', (event, args) => {
	let count = BrowserWindow.getAllWindows().length
	event.sender.send('count-win', count)
});