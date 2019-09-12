/* eslint-disable @typescript-eslint/camelcase */
import { Platform } from 'react-native';

const Config = {
  isHttps: false,
  isDev: true,
  httpPrefix: 'http://',
  wsPrefix: 'ws://',
  baseUrl: 'api.whlive.top',
  baseAwsUrl: 'whlive.top',
  baseBBSUrl: 'bbsapi.test.otcrmbt.com:18001',
  wsUrl: 'bbsconnect.test.otcrmbt.com:18002/websocket',
  zendeskUri: 'https://stowhite.zendesk.com',
  headers: {
    'Content-Type': 'application/json',
    deviceid: '',
    versionId: '1.0.2',
    uid: '',
    token: '',
    securityflag: true,
    sign: '',
    appname: 'c2cApp',
    appsource: '',
    signature: '',
  },
  versionName: `c2c_${Platform.OS}`,
  bundleId: '',
  encrypt_pwd: '',
  progressEnv: 'test',
  capitalpass: false,
};

export default Config;
