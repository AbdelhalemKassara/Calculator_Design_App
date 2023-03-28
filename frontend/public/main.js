const {app, BrowserWindow, ipcMain, dialog } = require('electron');

require('@electron/remote/main').initialize();
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
let filePath = '';
let logValues;

let timeOutExists = false;//used to check if a timeout has already been created to save the fiel

function createWindow() {
  //create the browser window
  const win = new BrowserWindow({
    width: 1000, 
    height: 600,
    useContentSize: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false

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

ipcMain.on('my-message', (event, arg) => {
  //if there isn't a file path saved then 
  if(filePath === '') {
    dialog.showSaveDialog({
      title : 'something',
      defaultPath: 'keylogData.json',
      filters: [{name: 'JSON Files', extensions: ['json']}]
    }).then(result => {
      if(!result.canceled) {
        filePath = result.filePath;
        saveFile(filePath, arg);
      }
    }).catch(err => {
      console.error(err);
    })
  } 
  else {
    logValues.push(arg);

    //creates a timeout if it doesn't exists (so we can avoid writing to the file for everysingle character entered)
    if(!timeOutExists) {
      timeOutExists = true;
      setTimeout(() => {
        saveFile(filePath, logValues);
        timeOutExists = false;
      }, 5);
    }

  }
});

function saveFile(filePath, data) {

  //if the file exists fetch it and
  if(fs.existsSync(filePath) && logValues === undefined) {
    fs.readFile(filePath, (err, val) => {
      if(!err) {
        logValues = JSON.parse(val);
        logValues.push(data);

        fs.writeFile(filePath, JSON.stringify(logValues), err => {
          if(err) {
            console.error(err);
          }
        });
      } else {
        console.log(err);
      }
    })
  } else {
    let out = [data];//put the data in an array first
    fs.writeFile(filePath, JSON.stringify(out), err => {
      if (err) {
        console.error(err);
      }
    })
  }
}




