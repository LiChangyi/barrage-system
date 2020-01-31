import { app } from 'electron';
import createMainWindow from './windows/createMainWindow';
import createDisplayWindow from './windows/createDisplayWindow';

let mainWindow;
let displayWindow;

function createWindow() {
  mainWindow = createMainWindow();
  displayWindow = createDisplayWindow();

  // 关闭window时触发下列事件.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  displayWindow.on('closed', () => {
    displayWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null || displayWindow === null) {
    createWindow();
  }
});
