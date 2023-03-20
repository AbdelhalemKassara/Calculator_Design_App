const {app, BrowserWindow } = require('electron');
require('@electron/remote/main').initialize();
const path = require('path');
const isDev = require('electron-is-dev');


function createWindow() {
  //create the browser window
  const win = new BrowserWindow({
    width: 300, height: 600,
    useContentSize: true,
    webPreferences: {
      enableRemoteModule: true
    }
  })

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  //if the user quits on mac with cmd + q it won't close the app only the window, so we'll close the app if there aren't any windows
  if(process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function() {
    //on macos if there are no windows create it
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});