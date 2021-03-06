import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const uiWidth = 621;
const uiHeight = 1344;

const { width, height } = Dimensions.get('window');
const scale = Math.max(height / uiHeight, width / uiWidth);
const pixelRatio = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
const screenRatio = Platform.OS === 'ios' ? width / uiWidth : scale;

const iphoneXWidth = 375;
const iphoneXHeight = 812;
const iphoneXXWidth = 414;
const iphoneXXHeight = 896;

export { width as DEVICE_WIDTH, height as DEVICE_HEIGHT };

export const setRatio = (value: number) => {
  return screenRatio * value;
};

export const setText = (value: number) => {
  const number = Math.round(((value * scale + 0.5) * pixelRatio) / fontScale);
  return number / pixelRatio;
};

export const screenHeight = height;
export const screenWidth = width;

export const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    ((screenWidth === iphoneXWidth && screenHeight === iphoneXHeight) || (screenHeight === iphoneXWidth && screenWidth === iphoneXHeight))
  );
};
export const isIphoneXX = () => {
  return (
    Platform.OS === 'ios' &&
    ((screenWidth === iphoneXXWidth && screenHeight === iphoneXXHeight) || (screenHeight === iphoneXXWidth && screenWidth === iphoneXXHeight))
  );
};
export const moreHeight = Platform.OS === 'android' ? StatusBar.currentHeight : isIphoneX() || isIphoneXX() ? 44 : 20;
// @ts-ignore
const majorVersionIOS = parseInt(Platform.Version, 10);
export const statusBarHeight =
  // @ts-ignore
  (majorVersionIOS < 11 ? 20 : 0) + (isIphoneX() || isIphoneXX() ? setRatio(8) : Platform.OS === 'android' ? StatusBar.currentHeight : 0);
