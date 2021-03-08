## Menus In Electron
- 2 Types:
    - Application Menu
    - Context Menu(Right Click On Your Application)

#### Accelerators and Global Shortcuts
- An Accelerator in ElectronJS is just a fancy word for a keyboard shortcut
- An shortcut which works even if your application is out of focus is called a global shortcut


#### Shortcut vs Global Shortcut
- For A shortcut just specify the keyword "accelerator" key and supply it with what you want the user to press for it do your desired task
- For A global shortcut
        1- remember to create the global shortcut instance from the electron library
        2. in your app.on ready method remember to have register method called on your global shortcut instance to register the global shortcut
        3. Remember to unregister all your global shortcuts when you quit that application


```js
//how to import global shortcut
const electron = require("electron");
const globalShortcut = electron.globalShortcut
```