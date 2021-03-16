# electron-ipc-rpc-without-timeouts

> Allows communication between Electron's IPC-Main and IPC-Renderer processes with support for callbacks

## Usage

#### main

```javascript
const Rpc = require('electron-ipc-rpc');
const rpc = new Rpc(electron.ipcMain, mainWindow.webContents);

rpc.on('method2', (params, callback) => {
    callback(null, 'method2 response!');
});

rpc.send('method1', [], (err, res) => {
    console.log(res); 
});
```

#### renderer

```javascript
const Rpc = require('electron-ipc-rpc');
const rpc = new Rpc(electron.ipcRenderer);

rpc.on('method1', (params, callback) => {
    callback(null, 'method1 response');
});

rpc.send('method2', [], (err, res) => {
    console.log(res); 
});
```

## License

MIT © [Daniel Nieto](https://github.com/danielnieto) forked from [Sebastian Raff](https://github.com/hobbyquaker)

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
