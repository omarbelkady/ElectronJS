
const electron = require("electron")
console.log("from main.js")
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path")
const url = require("url")




//ui to add a new window
let window;
function createWindow(){
    //creating two other windows
    let windowOne = new BrowserWindow();
    let windowTwo = new BrowserWindow();
    //window = new BrowserWindow()
    //load the html file to the window
    //format method takes a JS object as an argument
            //I can specify:
                    //a. the pathname
                    //b. the protocol(we used file because we are serving our protocol from the filesystem and not from http)
    windowOne.loadURL(url.format({
        pathname: path.join(__dirname,'one.html'),
        protocol: 'file:',
        slashes: true
    }));

    windowTwo.loadURL(url.format({
        pathname: path.join(__dirname,'two.html'),
        protocol: 'file:',
        slashes: true
    }));


    windowOne.webContents.openDevTools();
    windowTwo.webContents.openDevTools();

    //I must handle the event when the user closes the broswer window for window one and window two
    window.One('closed', ()=>{
        window= null
    });
 

    windowTwo.on('closed', ()=>{
        window= null
    });
}
   /*app has an event called ready which tells it that all initializations are done
    and I am allowed to execute some code 
    .on method is an event listener which listens to when the user closes the window it
    will invoke the createWindow Function
    */
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