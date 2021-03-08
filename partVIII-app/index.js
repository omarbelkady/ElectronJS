//creating a reference to the Button
const openBtn = document.getElementById('openBtn');

//to work with the shell module in Electron I must import/require/include it
const shell = require('electron').shell;

//handling the 429 click event
openBtn.addEventListener('click', function(event){
    /*
    one method the shell module provides us with is 
    
    to be able to open a folder in my fs

    I must specify the full path as an argument
    
    My folder is in the F Drive Flash Drive
    */
    shell.showItemInFolder('F:\\ElectronFolder\\ftn.txt');

    /*
    this will automatically open the folder in the UI and select the ftn.txt file

    If the ftn.txt does not exist in the ElectronFolder no file will be selected
    */



    //2nd function that the shell module provides me with is to open the file itself
    shell.openItem('F:\\ElectronFolder\\pol2626.jpg');


    //how to open an external link in your default browser
    shell.openExternal('https://www.geeksforgeeks.org/computer-organization-and-architecture-tutorials/');
})