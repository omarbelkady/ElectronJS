const electron = require("electron")
console.log("from main.js")

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path")
const url = require("url")
//import the ipc module
const ipc = electron.ipcMain;

//listen to the event and display the dialog box
const dialog = electron.dialog;





//ui to add a new window
let window;


//in electron it is possible to have a parent and child window
let parentWindow, childWindow;

function createWindow(){
    window = new BrowserWindow({
        height: 150,
        width: 500,
        frame: false,
        show: false
    });

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    window.once('ready-to-show', ()=>{
        window.show();
    });

    window.on('closed', ()=>{
        window = null
    });

}


//listening to the event
ipc.on('async-msg', function(event){
    //this is an example of an asynchronous ipc
    //dialog.showErrorBox('An error Message', 'Sample of An Err Msg');
    event.sender.send('async-repl', 'Main Process Opened the error dialog')
})


ipc.on('sync-msg', function(ev){
    ev.returnValue = 'sync-reply'
})

app.on('ready', createWindow);


/*use case for windows machines when all windows are closed I am
explicitly telling it to quit the application
*/
app.on('windows-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=>{
    if(window === null){
        createWindow();
    }
});