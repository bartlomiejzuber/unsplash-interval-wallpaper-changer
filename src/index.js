import { app, BrowserWindow, Tray, Menu } from 'electron';
import path from 'path';
import { exec } from 'child_process';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let optionsWindow;
let tray;
let contextMenu;

const createWindow = () => {
  optionsWindow = new BrowserWindow({
    show: false,
  });

  optionsWindow.loadURL(`file://${__dirname}/index.html`);
  optionsWindow.webContents.openDevTools();

  optionsWindow.on('closed', () => {
    optionsWindow = null;
  });

  tray = new Tray(path.join(__dirname, 'assets/icon1.png'));
  contextMenu = Menu.buildFromTemplate([
    {
      label: "Set random wallpaper",
      click: () => {
        exec("splash -c");
      }
    },
    {
      label: "Options",
      click: () => {
        
      }
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
};

app.on('ready', createWindow);

app.on('activate', () => {
  if (optionsWindow === null) {
    createWindow();
  }
});
