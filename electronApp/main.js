const {app, BrowserWindow, ipcMain, dialog } = require('electron');

require('@electron/remote/main').initialize();
const fs = require('fs');
const papaparse = require('papaparse');

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

  win.loadFile('./build/index.html');
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
      defaultPath: 'keylogData.csv',
      filters: [{name: 'CSV File', extensions: ['csv']}]
    }).then(result => {
      if(!result.canceled) {
        filePath = result.filePath;
        saveFileInitial(filePath, arg);
      }
    }).catch(err => {
      console.error(err);
    })
  } 
  else {

    //creates a timeout if it doesn't exists (so we can avoid writing to the file for everysingle character entered)
    if(!timeOutExists) {
      timeOutExists = true;
      setTimeout(() => {
        console.log('timeout processed')
        saveFile(filePath, arg);
        timeOutExists = false;
      }, 5);
    }

  }
});

function saveFileInitial(filePath, data) {
  //If the file already exists get the data from it
  if(fs.existsSync(filePath)) {
    
    const csvFile = fs.readFileSync(filePath);
    const csvData = csvFile.toString();
    const jsonVals = papaparse.parse(csvData, {header: true});

    if(jsonVals.errors.length === 0) {
      logValues = jsonVals.data;
    } else {
      console.log("couldn't load values")
    }
  } else {
    logValues = [];
  }

  logValues.push(data);

  fs.writeFile(filePath, papaparse.unparse(logValues), err => {
    if (err) {
      console.error(err);
    }
  });
}

function saveFile(filePath, data) {
  logValues.push(data);


  fs.writeFile(filePath, papaparse.unparse(logValues), err => {//writes the file as a .csv
      if (err) {
        console.error(err);
      }
  });
}




