
const electron = require("electron")
console.log("from main.js")
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path")
const url = require("url")




//ui to add a new window
let window, dimensionWindow, colorWindow, framelessWindow;


//in electron it is possible to have a parent and child window
let parentWindow, childWindow;

function createWindow(){
    /*creating the window
    windowOne = new BrowserWindow();
    /*
    default dimensions: 
    width:800px height: 600px
    to restrict your height and width to a specific # add the arguments
        - maxHeight: 
        - maxWidth: 
    */
    //dimensionWindow= new BrowserWindow({width: 400, height: 400, maxHeight: 600, maxWidth: 600});
    //colorWindow = new BrowserWindow({backgroundColor: '#228b22'});
    //framelessWindow = new BrowserWindow({backgroundColor: '#800000', frame: false});
    //childWindow will always be on top of the Parent Window
    parentWindow = new BrowserWindow({title: 'Parent'});
    //I am going to hide the child window
    childWindow = new BrowserWindow({show: false,parent: parentWindow, title: 'Child'});
    //remember a browserwindow can open either a remote address or a local html file

    //how to load a remote address in our window aka github
    childWindow.loadURL('https://www.github.com/');

    childWindow.once('ready-to-show', ()=>{
        //this gets fired when the child window finishes rendering the url supplied as an arg
        childWindow.show();
    });

}

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