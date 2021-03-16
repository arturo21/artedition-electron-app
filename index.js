const express = require('express');
const bodyParser = require("body-parser");
const electron = require('electron');
const remote = require('electron').remote;
const Menu = require('electron').Menu;
const MenuItem = require('electron').MenuItem;
const ipcMain = require('electron').ipcMain;
const url=require('url')
const path=require('path')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const srv = express();
const fs = require('fs');
let mainWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


srv.set('pages', __dirname + '/pages/');
srv.set('view engine', 'ejs');
srv.use(express.static(process.cwd() + '/pages'));
srv.use('/static', express.static(__dirname + '/public'));
//body-parser middle-ware.
srv.use(bodyParser.urlencoded({ extended: false }));
srv.use(bodyParser.json());
srv.get('/', function(req, res) {
    res.render('index', {});
});
srv.post('/savefile',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
	let req=request.body;
	let metodo=req.metodo;
	if(req.metodo=="guardararchivo"){
		let ruta=req.ruta;
		let texto=req.texto;
		// create buffer from base64 string
		let binaryData = Buffer.from(texto, "base64");
		// decode buffer as utf8
		let base64Dec  = binaryData.toString("utf8");
		if(fs.existsSync(ruta)){
			fs.writeFile(ruta, base64Dec, function(err) {
				if(err){
					console.log(err);
				}
			})
		}
		else{
			console.log("El archivo NO existe!");
		}
	}
	let binaryData='';
	let base64Dec='';
	const srv = express();
	return 0;
});
srv.listen(2345);

function createWindow() {
	const menu = new Menu()
	mainWindow = new BrowserWindow({
		title: "ArtCodeEditor 0.1",
		width: 1024,
		height: 768,
		webPreferences: {
			nodeIntegration: true,
	    	preload: 'renderer.js'
		}
	});
	mainWindow.loadURL(`http://localhost:2345/`);
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}
app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('update-notify-value', function (event, arg) {
  win.webContents.send('targetPriceVal', arg)
})
