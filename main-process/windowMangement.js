const { ipcMain, BrowserWindow } = require('electron');

ipcMain.on('MINIMIZE_WINDOW', (event, args) => {
	var window = BrowserWindow.getFocusedWindow();
    window.minimize();
});