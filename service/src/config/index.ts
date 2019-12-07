interface IConfig {
  port: number;
  log4Path: string;
}

const config: IConfig = {
  port: 3000,
  log4Path: './logs'
};

export default config;
