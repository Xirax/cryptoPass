const { BrowserWindow, app } = require('electron');

require('./app');

let mainWindow = null;

function main(){

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
  });
  mainWindow.loadURL('http://localhost:3434/');
  mainWindow.focus();
}

app.on('ready', main);

