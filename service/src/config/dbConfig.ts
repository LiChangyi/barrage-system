/**
 * 这里配置数据库的配置
 */

interface IConfig {
  mongodb: {
    url: string;
    user: string;
    password: string;
    authSource: string;
  };
  redis: {
    host: string;
    password: string;
  };
}

const config: IConfig = {
  mongodb: {
    url: 'mongodb://localhost:27017/test2',
    user: 'root',
    password: 'root',
    authSource: 'admin'
  },
  redis: {
    host: '127.0.0.1',
    password: '123456'
  }
};

export default config;
