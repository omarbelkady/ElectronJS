const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu
//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
//importing the tray module from Electron
const Tray = electron.Tray
//i can set the menu made below to my application tray


const iconPath = path.join(__dirname, 'Comp_Arch.jpg')
let tray = null

app.on('ready', function(){
  //when the icon is ready I can add it to the tray
  tray = new Tray(iconPath)

  let template = [
    { 
      label: 'Audio',
      submenu:[
        {
          label: 'Low',
          type: 'radio',
          checked: true
        },
        {
          label: 'High',
          type: 'radio'
        }  
      ]
    },
    {
      label: 'Video',
      submenu:[
        {
          label: '1280x720',
          type: 'radio',
          checked: true
        },
        {
          label: '1920x1080',
          type: 'radio'
        }  
      ]
    }
  ]
  const contextMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(contextMenu)

  //giving the user more information when he hovers over your application in the menu bar after its opened
  tray.setToolTip('Tray 429 App');

});

//specifying the audio level and the resolution



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (win === null) {
    }
  });