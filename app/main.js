'use strict';

const electron = require('electron');

const fs = require('fs');
const spawn = require('child_process').spawn;

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

fs.readdir('./scenarios', function ( err, files ) {
  if (err)
    console.error(err);
  if (files)
    for(var i = 0, l = files.length; i < l; i++)
      document.querySelector('#sideNav').innerHTML += files[i] +'<br />';
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
function select_projects()
{
  const {dialog} = require('electron');

  var selected_projects = dialog.showOpenDialog({
    properties: ['openDirectory', 'multiSelections']
  }),
      l_select_projects = selected_projects.length;

  for (var i = 0; i < l_select_projects; i++)
  {
    console.log(selected_projects[i]);
    const routes = spawn('rake', ['routes', '-f', selected_projects[i] +'/Rakefile']);
    routes.stdout.on('data', function(data)
    {
      console.log(`stdout: ${data}`);
    });

    routes.stderr.on('data', function(data)
    {
      console.log(`stderr: ${data}`);
    });

    routes.on('close', function(code)
    {
      console.log(`child process exited with code ${code}`);
    });
  }
}

let mainWindow;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // disable the menuBar.
  var menubar = new Menu();
  menubar.append(new MenuItem({
    label: 'File',
    submenu: [
      {
          label:'Open routes file',
          click:select_projects,
      },
    ]
  }));
  mainWindow.setMenu(menubar);

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/views/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
