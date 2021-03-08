const { BrowserWindow } = require("electron/main");

console.log("From first renderer process");

//1.get hold of Browser
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require("path");
const url = require("url");


const newWindowBtn = document.getElementById("newWindowBtn");
//listening to the click event
document.addEventListener("click", function(event){
    //create a new browser window
    let windowThree = new BrowserWindow();
    windowThree.loadURL(url.format({
        pathname: path.join(__dirname,'three.html'),
        protocol: 'file:',
        slashes: true
    }));
    windowThree.webContents.openDevTools();

})