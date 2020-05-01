const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const bgTasks = ['loadDataset', 'deleteDataset']


function createCommonIPCmain(bgTask) {
	
	// temporary variable to store data while background
	// process is not ready to start processing
	let cache = {
		data: undefined,
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

		cache.data = args.number;
	});


	// This event listener will listen for data being sent back
	// from the background renderer process
	ipcMain.on(bgTask.concat('MESSAGE'), (event, args) => {
		sender.send(bgTask.concat('BG_MESSAGE'), args.message);
	});


	// When background is ready to process, this listener will tell 
	// it to start the background processing
	ipcMain.on(bgTask.concat('READY'), (event, args) => {
		event.reply(bgTask.concat('START'), {
			data: cache.data,
		});
	});
}

bgTasks.forEach(createCommonIPCmain)