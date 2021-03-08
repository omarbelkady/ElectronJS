
const { Menu } = require("electron");
const electron = require("electron")


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path")
const url = require("url")

//import the menu module from electron
const menu = electron.Menu;

//used for usage of the context menu
const MenuItem = electron.MenuItem

//adding a globalshortcut ariable
const globalShortcut = electron.globalShortcut;





//ui to add a new window
let window;


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

app.on('ready', function(){
    createWindow();
    //i add the different menus for my app below in the array
    const template = [
        {
            //predefined menu of Electron
            label: 'Edit',
            submenu: [
                    { role: 'undo'},
                    { role: 'redo'},
                    { role: 'separator'},
                    { role: 'cut'},
                    { role: 'copy'},
                    { role: 'paste'},
                    { role: 'pasteandmatchstyle'},
                    { role: 'delete'},
                    { role: 'selectall'}
            ]
        },
        {
            label: 'Help',
            submenu:[
                {
                    label:'About Electron',
                    click: function(){
                        //open a link
                        electron.shell.openExternal('https://electron.atom.io/')
                    },
                    /*
                    assigning a shortcut to the menu thanks to the keyword accelerator followed by the keyboard shortcut needed to be pressed
                    Cmd: Mac
                    Ctrl: Windows
                    */
                    accelerator: 'CmdOrCtrl + Shift + H'

                }
            ]
               
        }
    ];
    /*creating my menu 
    buildFromTemplate takes in a paramter 
    template is just a comb of:
        1- arrays
        2- objects
    */
    const menu = Menu.buildFromTemplate(template)

    //how to set it as my app menu: invoke the setApplicationMenu method and pass in the menu I just created
    Menu.setApplicationMenu(menu)

    const ctxmenu = new Menu();
    //MenuItems takes in Objects
    ctxmenu.append(new MenuItem({
        label: 'Hi',
        //adding a click handler
        click: function(){
            console.log("Context Menu Selected");
        }
    }))

    ctxmenu.append(new MenuItem({ role: 'selectAll' }))


    //event raised when I right click. params.x and params.y are where I clicked with my mouse on that particular window
    window.webContents.on('context-menu', function(e, params){
        //popup: method used to open the context menu
        ctxmenu.popup(window, params.x, params.y)
    })

    //registering a global shortcut
    globalShortcut.register('Alt+1', function(){
        //when I press Alt and 1 it will bring my application into focus 
        window.show()
    });
});


/* Unregister all the global shortcuts when I quit my applications */
app.on('will-quit', function(){
    globalShortcut.unregisterAll();
})


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