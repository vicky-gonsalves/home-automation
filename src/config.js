const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.REACT_APP_PORT,
  apiUrl: process.env.REACT_APP_API_URL,
  socketUrl: process.env.REACT_APP_SOCKET_URL,
  appName: 'Home Automation',
};

export default config;
