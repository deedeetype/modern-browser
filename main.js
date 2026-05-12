const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let view;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Chargement de la page UI
  mainWindow.loadFile('index.html');

  view = new BrowserView();
  mainWindow.setBrowserView(view);
  
  // Position initiale
  view.setBounds({ x: 250, y: 0, width: 1030, height: 800 });
  view.setAutoResizing({ width: true, height: true });
  view.webContents.loadURL('https://www.google.com');

  ipcMain.on('navigate', (event, url) => {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    view.webContents.loadURL(targetUrl);
  });

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
    view.setBounds({ x: 250, y: 0, width: width - 250, height: height });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
