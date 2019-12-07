import * as log4js from 'log4js';
import * as fs from 'fs';
import * as path from 'path';
import Config from '../config';

/**
 * 日志文件的配置
 * info 文件保存所有的 log 信息，包括错误信息
 * err 文件只保存错误的 log 信息
 */

const { log4Path } = Config;
const logFileDir = path.resolve(log4Path);
const infoPath = log4Path + '/info';
const errPath = log4Path + '/err';

// 日志保存天数
const daysToKeep = {
  info: 3,
  err: 3
};

// 判断文件夹是否存在，不存在这创建
const confirmPath = (pathStr: string) =>  {
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr);
    console.log("创建log日志文件夹: " + pathStr);
  }
};

const config = {
  pm2: true,
  replaceConsole: true,
  appenders: {
    stdout: {
      type: 'stdout'
    },
    info: {
      type: 'dateFile',
      filename: path.resolve(process.cwd(), `${infoPath}/info`),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      daysToKeep: daysToKeep.info
    },
    error: {
      type: 'dateFile',
      filename: path.resolve(process.cwd(), `${errPath}/error`),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      daysToKeep: daysToKeep.err
    }
  },
  categories: {
    info: { appenders: ['info', 'stdout'], level: 'info' },
    error: { appenders: ['error', 'info', 'stdout'], level: 'error' },
    default: { appenders: ['info', 'error', 'stdout'], level: 'trace' }
  }
};

if (logFileDir) {
  confirmPath(logFileDir);
  confirmPath(infoPath);
  confirmPath(errPath);
}

log4js.configure(config);

const infoLogger = log4js.getLogger('info');
const errorLogger = log4js.getLogger('error');

interface ILogger {
  info?: any;
  error?: any;
}
const logger: ILogger = {};
logger.info = (text: string) => {
  if (text) {
    infoLogger.info(text);
  }
};

logger.error = (error: any) => {
  if ((typeof error) === 'string') {
    errorLogger.error(error);
    return;
  }
  if (error) {
    let text: string = '';
    text += `\n------------ error log start ------------\n`;
    text += `error name   : ${error.name}\n`;
    text += `error message: ${error.message}\n`;
    text += `error stack  : ${error.stack}\n`;
    text += `\n------------ error log end ------------\n`;
    errorLogger.error(text);
  }
};

export default logger;
