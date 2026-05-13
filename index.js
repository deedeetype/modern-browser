const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let view;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  // CREATION DU MOTEUR EN TANT QUE VUE INDEPENDANTE
  view = new BrowserView();
  mainWindow.setBrowserView(view);
  
  // POSITIONNEMENT STRICT : On laisse 250px pour la sidebar
  view.setBounds({ x: 250, y: 0, width: 950, height: 800 });
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
