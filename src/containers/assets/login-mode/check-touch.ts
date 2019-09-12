import { DeviceEventEmitter, Platform } from 'react-native';
import TouchID from 'react-native-touch-id';
import LocalStore from '../../../utils/local-store';

export let checkTouch = '0';

//检测TouchID类型,1、指纹 2、人脸 0、没有
export const checkTouchID = () => {
  TouchID.isSupported()
    .then(biometryType => {
      if (biometryType === 'FaceID') {
        checkTouch = '2';
      } else {
        checkTouch = '1';
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};

//唤起TouchID
export function showTouchID() {
  //系统面板上的文字
  const titleText = '通过 Home 键验证已有指纹';
  TouchID.authenticate(titleText)
    .then(() => {
      // if (Platform.OS === 'android') {
      //   new LocalStore().saveLocalRepository('touch', '1');
      // } else {
      //   new LocalStore().saveLocalRepository('touch', checkTouch);
      // }
      DeviceEventEmitter.emit('touchId', true);
    })
    .catch((error: any) => {
      let tmpText = '';
      if (Platform.OS === 'ios') {
        if (error.name === 'LAErrorAuthenticationFailed') {
          tmpText = checkTouch === '2' ? '身份验证未成功，请重新进行面容验证。' : '身份验证未成功，请重新进行指纹验证';
        } else if (error.name === 'LAErrorUserCancel') {
          tmpText = checkTouch === '2' ? '用户取消了面容验证。' : '用户取消了指纹验证。';
        } else if (error.name === 'LAErrorUserFallback') {
          tmpText = checkTouch === '2' ? '用户取消了面容验证。' : '用户取消了指纹验证。';
        } else if (error.name === 'LAErrorSystemCancel') {
          tmpText = '验证程序被占用，请重新唤起验证。';
        } else if (error.name === 'LAErrorPasscodeNotSet') {
          tmpText = '手机登录密码未开启，身份验证无法启动。';
        } else if (error.name === 'LAErrorTouchIDNotAvailable') {
          tmpText = '未获得面容解锁权限，请在手机系统内开启面容解锁权限。';
        } else if (error.name === 'LAErrorTouchIDNotEnrolled') {
          tmpText = checkTouch === '2' ? '未检测到面容,请前往手机系统设置。' : '未检测到指纹,请前往手机系统设置。';
        } else if (error.name === 'RCTTouchIDUnknownError') {
          tmpText = '错误次数过多，请稍后再进行验证。';
        } else if (error.name === 'RCTTouchIDNotSupported') {
          tmpText = '设备不支持该功能。';
        }
      } else {
        console.log('error.details', error.details);
        if (error.code === 'NOT_SUPPORTED' || error.code === 'NOT_AVAILABLE' || error.code === 'NOT_PRESENT' || error.code === 'NOT_ENROLLED') {
          tmpText = '手机不支持该功能或未开启此功能。';
        } else if (error.code === 'AUTHENTICATION_FAILED') {
          tmpText = '指纹验证失败。';
        } else if (error.code === 'AUTHENTICATION_CANCELED') {
          tmpText = '用户取消了验证。';
        } else if (error.code === 'FINGERPRINT_ERROR_LOCKOUT') {
          tmpText = '尝试次数过多,稍后再试。';
        } else if (error.code === 'FINGERPRINT_ERROR_LOCKOUT_PERMANENT') {
          tmpText = '指纹验证次数过多，指纹验证程序暂停使用。';
        } else if (error.code === 'FINGERPRINT_ERROR_UNABLE_TO_PROCESS') {
          tmpText = '指纹验证手机系统错误。';
        } else if (error.code === 'FINGERPRINT_ERROR_TIMEOUT') {
          tmpText = '指纹验证手机系统错误。';
        } else if (error.code === 'FINGERPRINT_ERROR_CANCELED') {
          tmpText = '指纹验证手机系统错误。';
        } else if (error.code === 'FINGERPRINT_ERROR_VENDOR') {
          tmpText = '指纹验证手机系统错误。';
        }
      }
      DeviceEventEmitter.emit('touchId', false, tmpText);
    });

  //ios和安卓的报错提示及文案
  /* if (Platform.OS === 'ios') {
        if (error.name === 'LAErrorAuthenticationFailed') {
            tmp = Constants.supportType === 2 ? '身份验证未成功，请重新进行面容验证。' : '身份验证未成功，请重新进行指纹验证';
        } else if (error.name === 'LAErrorUserCancel') {
            tmp = Constants.supportType === 2 ? '用户取消了面容验证。' : '用户取消了指纹验证。';
        } else if (error.name === 'LAErrorUserFallback') {
            tmp = Constants.supportType === 2 ? '用户取消了面容验证。' : '用户取消了指纹验证。';
        } else if (error.name === 'LAErrorSystemCancel') {
            tmp = '验证程序被占用，请重新唤起验证。';
        } else if (error.name === 'LAErrorPasscodeNotSet') {
            tmp = '手机登录密码未开启，身份验证无法启动。';
        } else if (error.name === 'LAErrorTouchIDNotAvailable') {
            tmp = '未获得面容解锁权限，请在手机系统内开启面容解锁权限。';
        } else if (error.name === 'LAErrorTouchIDNotEnrolled') {
            tmp = Constants.supportType === 2 ? '未检测到面容,请前往手机系统设置。' : '未检测到指纹,请前往手机系统设置。';
        } else if (error.name === 'RCTTouchIDUnknownError') {
            tmp = '错误次数过多，请稍后再进行验证。';
        } else if (error.name === 'RCTTouchIDNotSupported') {
            tmp = '设备不支持该功能。';
        }
    } else {
        console.log('error.details', error.details);
        if (error.code === 'NOT_SUPPORTED' || error.code === 'NOT_AVAILABLE' || error.code === 'NOT_PRESENT' || error.code === 'NOT_ENROLLED') {
            tmp = '手机不支持该功能或未开启此功能。';
        } else if (error.code === 'AUTHENTICATION_FAILED') {
            tmp = '指纹验证失败。';
        } else if (error.code === 'AUTHENTICATION_CANCELED') {
            tmp = '用户取消了验证。';
        } else if (error.code === 'FINGERPRINT_ERROR_LOCKOUT') {
            tmp = '尝试次数过多,稍后再试。';
        } else if (error.code === 'FINGERPRINT_ERROR_LOCKOUT_PERMANENT') {
            tmp = '指纹验证次数过多，指纹验证程序暂停使用。';
        } else if (error.code === 'FINGERPRINT_ERROR_UNABLE_TO_PROCESS') {
            tmp = '指纹验证手机系统错误。';
        } else if (error.code === 'FINGERPRINT_ERROR_TIMEOUT') {
            tmp = '指纹验证手机系统错误。';
        } else if (error.code === 'FINGERPRINT_ERROR_CANCELED') {
            tmp = '指纹验证手机系统错误。';
        } else if (error.code === 'FINGERPRINT_ERROR_VENDOR') {
            tmp = '指纹验证手机系统错误。';
        }
    }
*/
}
