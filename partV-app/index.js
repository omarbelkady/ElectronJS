const electron = require("electron");
const ipc = electron.ipcRenderer
//listen to the click event on the button and send out an event to the main process to display the error dialog box

const asyncBtn = document.getElementById('asyncBtn');
const syncBtn = document.getElementById('syncBtn');
asyncBtn.addEventListener('click', function(){

    /*
        if I put a console log before the ipc and one after
        Both console logs will be outputed first and then I get the asynchronous reply
        because the ipc code does not block other operations from taking place
    
    */
    //event being sent from the renderer process to the main process
    ipc.send('async-msg')
});

syncBtn.addEventListener('click', function(){
    console.log("First sync message ")
    /*
        if I put a console log before the ipc and one after
        Both console logs will be outputed first and then I get the asynchronous reply
        because the ipc code does not block other operations from taking place
    
    */
    //event being sent from the renderer process to the main process

    //syntax for synchronous in contrast to asynchronous code
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    console.log("Second Sync Message")
});


//capturing the particular event
ipc.on('async-repl', function(ev, arg){
    //argument is just a reply from the main process
    console.log(arg);
})


/*
electron provides the remote module
    - emote methods off the main process object w/o explicitly sending inter-process messages
    - I can create a browser window from the renderer process using the remote module



*/

/*
both browserWindow and window are remote object and 
I created the browserwindow object not in the renderer Process but in the MAIN PROCESS
This is due to the fact:
Synchronous IPC


The render process below will create a browser window with the help of the main process using
synchronous ipc

remember remote module handles ipc synchronously not asynchronously

REmember to stick to asynchronous ipc as much as possible when using Electron
*/

const BrowserWindow = electron.remote.BrowserWindow;
let window = new BrowserWindow();
window.loadURL("https://www.ratemyprofessors.com/ShowRatings.jsp?tid=1011587");