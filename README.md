# ElectronJS

- There is always one main process and one or more isolated renderer processes
- the main process creates the webpages for the UI
- Each webpage has its own renderer process that doesn't interfere with any other renderer processes
- main.js(main process)
- index.js(renderer process)


### How To Open A URL in Electron
```js
electron.shell.openExternal('https://www.ratemyprofessors.com/ShowRatings.jsp?tid=1011587')
```