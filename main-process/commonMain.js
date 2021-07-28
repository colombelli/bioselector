const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const bgTasks = ['runExperiments', 'addSelector', 'addAggregator']


function createCommonIPCmain(bgTask) {
	
	// temporary variable to store data while background
	// process is not ready to start processing
	let cache = {
		args: undefined,
	};

	// variable that will grab main window from event sender prop
	let sender;

	// variable holding the whole event object called from react view page
	let eventHolder;

	// hidden process holder
	let hiddenProcessEvent;

	// a window object outside the function scope prevents
	// the object from being garbage collected
	let hiddenWindow;

	// This event listener will listen for request
	// from visible renderer process
	ipcMain.on(bgTask, (event, args) => {
		
		sender = event.sender
		eventHolder = event

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
		hiddenProcessEvent = event;
		sender.send(bgTask.concat('BG_MESSAGE'), args.message);

	});


	ipcMain.on(bgTask.concat('ERR'), (event, args) => {
		try{
			sender.send(bgTask.concat('ERR'), args);
			eventHolder.returnValue = ['ERR', args];
		} catch (error) {
			console.log("Probably destroyed after canceling stuff, aborting...");
			console.log(error);	
		}
	});

	ipcMain.on(bgTask.concat('FINISHED'), (event, args) => {
		sender.send(bgTask.concat('FINISHED'), args);
		eventHolder.returnValue = ['FINISHED', args];
	});


	// When background is ready to process, this listener will tell 
	// it to start the background processing
	ipcMain.on(bgTask.concat('READY'), (event, args) => {
		event.reply(bgTask.concat('START'),  cache.args);
	});

	ipcMain.on(bgTask.concat('KILL'), (event, _) => {
		try{
			hiddenProcessEvent.reply(bgTask.concat('AK_KILL_PROCESS'));
		} catch (error){
			console.log("Probably due to two KILL messages sent, ignoring...");
			console.log(error);	
		}
	});
}

bgTasks.forEach(createCommonIPCmain)

ipcMain.on('count-win', (event, args) => {
	let count = BrowserWindow.getAllWindows().length
	event.sender.send('count-win', count)
});