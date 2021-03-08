## IPC(Inter Process Communication)

## Processes In Electron
I know that Electron has two processes
- Main Process
- Renderer Process

### The Rule
The application can only have:
- 1 Main Process
- 1 or more Renderer Processes


### Renderer Process
- Sometimes the renderer might invoke a native desktop api 
    - e.g. a dialogue box used to display error messages
    - e.g. a dialogue box to open/save a file
    - etc.

### IPC Module
- Sometimes when the browserWindow has access to these APIs, it can be quite dangerous
    - resources might be leaked
- ElectronJS has an IPC Module which makes the Main Process communicate with th3 Renderer Process


### How to Display An Error Message
- Say the renderer process must display an error message in the browserWindow to achieve that using IPC:
    - The Renderer Process sends out an event called open-error-dialog to the main process
    - The main Process listens to the event(open-error dialog) and when it catches the event it will show the dialog by calling the native API
    - The main process then calls the native Desktop API
    - The main Process can also reply to the renderer process(that sends out a message) by sending(main process sending to the renderer process) a message
            - back to the renderer process
    - In the renderer process I must listen to the event open-error-dialog and capture the arguments
