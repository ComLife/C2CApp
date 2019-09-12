/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// App名称
const appName = 'C2CApp';

// 所有配置信息
const configs = {
  dev: {
    // 168 环境
    codePushUrl: 'http://192.168.88.163:3000/',
    iosCodePushKey: 'pMBDqtWY5WUvOp04RATVBp0YtkgU4ksvOXqog',
    androidCodePushKey: 'AqwQDS5Qa7JSCxCgmdkPrMFIvWXY4ksvOXqog',
    isHttps: false,
    isDev: true,
    requestAvailableUrls: ["'http://120.79.17.186:10018/domain.list'"],
    downloadUrl: 'https://download.pjllcm.com',
    zendeskUri: 'https://stowhite.zendesk.com',
    // jPushKey: 'fb2d2953874c74fe22ae54c5',
    httpPrefix: 'http://',
    wsPrefix: 'ws://',
    baseUrl: 'api.uat.otcrmbt.com', // 168
    baseBBSUrl: 'bbsapi.uat.otcrmbt.com', // 168
    baseAwsUrl: 'uat.otcrmbt.com',
    wsUrl: 'bbsconnect.uat.otcrmbt.com/websocket', // 168
  },
  test: {
    // 186 测试环境
    codePushUrl: 'http://192.168.88.163:3000/',
    iosCodePushKey: 'pMBDqtWY5WUvOp04RATVBp0YtkgU4ksvOXqog',
    androidCodePushKey: 'AqwQDS5Qa7JSCxCgmdkPrMFIvWXY4ksvOXqog',
    isHttps: false,
    isDev: true,
    requestAvailableUrls: ["'http://39.108.99.129/domain.list'"],
    downloadUrl: 'https://download.pjllcm.com',
    zendeskUri: 'https://stowhite.zendesk.com',
    // jPushKey: '6210b913a5d0df75b705c012',
    httpPrefix: 'http://',
    wsPrefix: 'ws://',
    baseUrl: 'api.whlive.top', // 186
    baseBBSUrl: 'bbsapi.test.otcrmbt.com:18001', // 186
    baseAwsUrl: 'whlive.top',
    wsUrl: 'bbsconnect.test.otcrmbt.com:18002/websocket', // 186
  },
  pre: {
    // 预发布环境
    codePushUrl: 'http://codepush.jlpfcj.com',
    iosCodePushKey: 'tSWawOLEjE3hZoZ44jGGaczRTK9V4ksvOXqog',
    androidCodePushKey: 'B2DIWTBsCy9wLQXWy8snoGbVzano4ksvOXqog',
    isHttps: true,
    isDev: true,
    requestAvailableUrls: ["'http://39.108.99.129/domain.list'"],
    downloadUrl: 'https://download.jlpfcj.com',
    zendeskUri: 'https://stowhite.zendesk.com',
    // jPushKey: '6210b913a5d0df75b705c012',
    httpPrefix: 'https://',
    wsPrefix: 'wss://',
    baseUrl: 'api.jlpfcj.com',
    baseBBSUrl: 'bbsapi.jlpfcj.com',
    baseAwsUrl: 'jlpfcj.com',
    wsUrl: 'bbsconnect.jlpfcj.com/websocket',
  },
  pro: {
    // 生产环境
    codePushUrl: 'https://update.nova-wallet.com',
    iosCodePushKey: 'j4idemrKDneUH54nusn8qOGxjNH34ksvOXqog',
    androidCodePushKey: 'H3akMpH51hVpvavapXZdEKPRnDHJ4ksvOXqog',
    isHttps: true,
    isDev: false,
    requestAvailableUrls: ["'http://193.112.139.236/domain.list'", "'http://103.97.34.111/domain.list'"],
    downloadUrl: 'https://download.nova-wallet.com',
    zendeskUri: 'https://stowhite.zendesk.com',
    // jPushKey: '1b060a3e20dab336a3fa672e',
    httpPrefix: 'https://',
    wsPrefix: 'wss://',
    baseUrl: 'api.nova-wallet.com',
    baseBBSUrl: 'bbsapi.nova-wallet.com',
    baseAwsUrl: 'nova-wallet.com',
    wsUrl: 'bbsconnect.nova-wallet.com/websocket',
  },
};

const configKey = process.argv[2];

// 当前版本号
const versionNo = process.argv[3];

// 当前使用到的config
const config = configs[configKey];

/**
 * 修改 iOS 项目配置
 */
const updateIOS = () => {
  const iosRootPath = `${__dirname}/../ios`;
  const infoPlist = path.resolve(`${iosRootPath}/${appName}/Info.plist`);
  // 修改Info.Plist
  fs.readFile(infoPlist, 'utf-8', (readErr, file) => {
    if (readErr) {
      console.error('readFile:', readErr);
      return;
    }
    const { iosCodePushKey, codePushUrl } = config;
    // CodePush Key 修改
    let key = /(<key>CodePushDeploymentKey<\/key>\n\t<string>)(.+)(<\/string>)/;
    let result = file.replace(key, `$1${iosCodePushKey}$3`);
    // CodePush Url 修改
    key = /(<key>CodePushServerURL<\/key>\n\t<string>)(.+)(<\/string>)/;
    result = result.replace(key, `$1${codePushUrl}$3`);
    // 修改版本号
    key = /(<key>CFBundleShortVersionString<\/key>\n\t<string>)(.+)(<\/string>)/;
    result = result.replace(key, `$1${versionNo}$3`);
    // 重新写入文件
    fs.writeFile(infoPlist, result, 'utf-8', writeErr => {
      if (writeErr) {
        console.error('writeFile:', writeErr);
        return;
      }
      console.log(`🎉 🎉 🎉, ${configKey} updateIOS Info.Plist is successful 👍 👍 👍!`);
    });
  });
  // 修改打包脚本信息
  const fixPlist = path.resolve(`${__dirname}/AutoPackageScript/fix-plist.js`);
  // 修改打包脚本信息.m
  fs.readFile(fixPlist, 'utf-8', (readErr, file) => {
    if (readErr) {
      console.error('readFile:', readErr);
      return;
    }
    const { downloadUrl } = config;
    if (downloadUrl) {
      // CodePush Key 修改
      const key = /(const downLoadUrl = ')(.+)(';)/;
      const result = file.replace(key, `$1${downloadUrl}/ios/${appName}/$3`);
      // 重新写入文件
      fs.writeFile(fixPlist, result, 'utf-8', writeErr => {
        if (writeErr) {
          console.error('writeFile:', writeErr);
          return;
        }
        console.log(`🎉 🎉 🎉, ${configKey} updateIOS ${fixPlist} is successful 👍 👍 👍!`);
      });
    }
  });
};

/**
 * 修改 Android 项目配置
 */
const updateAndroid = () => {
  const { androidCodePushKey, codePushUrl } = config;
  const androidRootPath = `${__dirname}/../android`;

  let filePath = path.resolve(`${androidRootPath}/app/src/main/java/com/ugame/react/c2capp/MainApplication.java`);
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  let searchValue = /(new CodePush\()(.+)(, getApplicationContext\(\), BuildConfig.DEBUG, )(.+)(\)\);)/;
  fileContent = fileContent.replace(searchValue, `$1"${androidCodePushKey}"$3"${codePushUrl}"$5`);
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  filePath = path.resolve(`${androidRootPath}/app/build.gradle`);
  fileContent = fs.readFileSync(filePath, 'utf-8');
  searchValue = /(versionName ")(.+)(")/;
  fileContent = fileContent.replace(searchValue, `$1${versionNo}$3`);
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  fileContent = null;
};

/**
 * 修改 App
 */
const updateApp = () => {
  const appRootPath = `${__dirname}/../src`;
  const configsConstantsJs = path.resolve(`${appRootPath}/const/config.ts`);
  // 修改 const/config.ts
  fs.readFile(configsConstantsJs, 'utf-8', (readErr, file) => {
    if (readErr) {
      console.error('readFile:', readErr);
      return;
    }
    // 修改版本号
    let key = /(versionId:)(.+)(,)/;
    let result = file.replace(key, `$1 '${versionNo}'$3`);
    // 修改https
    key = /(isHttps:)(.+)(,)/;
    result = result.replace(key, `$1 ${config.isHttps}$3`);
    // 修改 baseUrl
    key = /(baseUrl:)(.+)(,)/;
    result = result.replace(key, `$1 '${config.baseUrl}'$3`);
    // 修改 httpPrefix
    key = /(httpPrefix:)(.+)(,)/;
    result = result.replace(key, `$1 '${config.httpPrefix}'$3`);
    // 修改 wsPrefix
    key = /(wsPrefix:)(.+)(,)/;
    result = result.replace(key, `$1 '${config.wsPrefix}'$3`);
    // 修改 baseBBSUrl
    key = /(baseBBSUrl:)(.+)(,)/;
    result = result.replace(key, `$1 '${config.baseBBSUrl}'$3`);
    // 修改 wsUrl
    key = /(  wsUrl:)(.+)(,)/;
    result = result.replace(key, `$1 '${config.wsUrl}'$3`);
    // 修改 dev
    key = /(isDev:)(.+)(,)/;
    result = result.replace(key, `$1 ${config.isDev}$3`);
    // 修改 zendeskUri
    key = /(zendeskUri:)(.+)(,)/;
    result = result.replace(key, `$1 '${config.zendeskUri}'$3`);
    // 修改运行环境
    key = /(progressEnv:)(.+)(,)/;
    result = result.replace(key, `$1 '${configKey}'$3`);
    // 修改aws地址
    key = /(baseAwsUrl:)(.+)(,)/;
    result = result.replace(key, `$1 '${config.baseAwsUrl}'$3`);
    // 重新写入文件
    fs.writeFile(configsConstantsJs, result, 'utf-8', writeErr => {
      if (writeErr) {
        console.error('writeFile:', writeErr);
        return;
      }
    });
  });
};

/**
 * 修改node_modules
 */
const updateNodeModules = () => {
  const nodeModulesRootPath = `${__dirname}/../node_modules`;

  // react-native-swiper
  const swiperIndexJs = path.resolve(`${nodeModulesRootPath}/react-native-swiper/src/index.js`);
  const swiperIndexKey = /(Platform.OS === 'android')(.+)/;
  let swiperIndex = fs.readFileSync(swiperIndexJs, 'utf-8');
  swiperIndex = swiperIndex.replace(swiperIndexKey, '$1 && this.props.loop) {');
  fs.writeFileSync(swiperIndexJs, swiperIndex, 'utf8');
  swiperIndex = null;

  // react-native-touch-id
  const touchIDm = path.resolve(`${nodeModulesRootPath}/react-native-touch-id/TouchID.m`);
  const touchIDKey = /(canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]\) {\n {8}\/\/ Attempt Authentification\n {8}\[context evaluatePolicy:)(.+)/;
  let TouchID = fs.readFileSync(touchIDm, 'utf-8');
  TouchID = TouchID.replace(touchIDKey, '$1LAPolicyDeviceOwnerAuthentication');
  fs.writeFileSync(touchIDm, TouchID, 'utf8');
  TouchID = null;

  // 修改 react-native-qr-scanner
  const qrScannerBuildGradle = path.resolve(`${nodeModulesRootPath}/react-native-qr-scanner/android/build.gradle`);
  let qrScannerBuild = fs.readFileSync(qrScannerBuildGradle, 'utf-8');
  qrScannerBuild = qrScannerBuild.replace(/(compileSdkVersion)(.+)/, '$1 28');
  qrScannerBuild = qrScannerBuild.replace(/(targetSdkVersion)(.+)/, '$1 28');
  qrScannerBuild = qrScannerBuild.replace(/(buildToolsVersion)(.+)/, '$1 "28.0.3"');
  // qrScannerBuild = qrScannerBuild.replace(/compile/g, 'implementation');
  fs.writeFileSync(qrScannerBuildGradle, qrScannerBuild, 'utf8');
  qrScannerBuild = null;

  // react-native-smart-gesture-password
  const smartKey = /(import React, {)([\s\S]+)(} from 'react')/;
  const smartReplace = "$1\nComponent,\n$3\nimport PropTypes from 'prop-types'";
  const removeKey = /(\nimport PropTypes from 'prop-types')/;
  const removeReplace = '';
  // Arrow.js
  const arrowJs = path.resolve(`${nodeModulesRootPath}/react-native-smart-gesture-password/Arrow.js`);
  let Arrow = fs.readFileSync(arrowJs, 'utf-8');
  Arrow = Arrow.replace(removeKey, removeReplace).replace(smartKey, smartReplace);
  fs.writeFileSync(arrowJs, Arrow, 'utf8');
  Arrow = null;
  // Circle.js
  const circleJs = path.resolve(`${nodeModulesRootPath}/react-native-smart-gesture-password/Circle.js`);
  let Circle = fs.readFileSync(circleJs, 'utf-8');
  Circle = Circle.replace(removeKey, removeReplace).replace(smartKey, smartReplace);
  fs.writeFileSync(circleJs, Circle, 'utf8');
  Circle = null;
  // GesturePassword.js
  const gesturePasswordJs = path.resolve(`${nodeModulesRootPath}/react-native-smart-gesture-password/GesturePassword.js`);
  let GesturePassword = fs.readFileSync(gesturePasswordJs, 'utf-8');
  GesturePassword = GesturePassword.replace(removeKey, removeReplace).replace(smartKey, smartReplace);
  fs.writeFileSync(gesturePasswordJs, GesturePassword, 'utf8');
  GesturePassword = null;
  // Line.js
  const lineJs = path.resolve(`${nodeModulesRootPath}/react-native-smart-gesture-password/Line.js`);
  let Line = fs.readFileSync(lineJs, 'utf-8');
  Line = Line.replace(removeKey, removeReplace).replace(smartKey, smartReplace);
  fs.writeFileSync(lineJs, Line, 'utf8');
  Line = null;
  // Point.js
  const pointJs = path.resolve(`${nodeModulesRootPath}/react-native-smart-gesture-password/Point.js`);
  let Point = fs.readFileSync(pointJs, 'utf-8');
  Point = Point.replace(removeKey, removeReplace).replace(smartKey, smartReplace);
  fs.writeFileSync(pointJs, Point, 'utf8');
  Point = null;
};

updateIOS();
updateAndroid();
updateApp();
updateNodeModules();
