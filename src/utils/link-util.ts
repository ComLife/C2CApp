import { Linking, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// @ts-ignore
// import { QRreader } from 'react-native-qr-scanner';
import { ERROR_CODE } from '../const/enum-set';

const _phoneCall = (phoneNumber: any) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const androidPhoneCall = (phoneNumber: any) => {
  // EasyAlert.show(
  //   {
  //     title: '提示',
  //     notice: `是否拨打${phoneNumber}？`,
  //     inputComponentIsShow: false,
  //     buttons: [{ text: '取消' }, { text: '确定' }],
  //   },
  //   () => {
  //     _phoneCall(phoneNumber);
  //   },
  // );
};

export default {
  link: (linkUrl: any, httpUrl: any) => {
    const url = linkUrl;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return Linking.openURL(httpUrl);
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error('An error occurred', err));
  },

  linkWeb: (httpUrl: any) => {
    Linking.openURL(httpUrl);
  },

  linkApp: (linkUrl: any) => {
    const url = linkUrl;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          // EasyToast.show('不支持跳转');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  },

  openPhoto: (callback: any, title = '选择照片') => {
    const options = {
      title,
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从手机相册中选择',
      permissionDenied: {
        title: '提示',
        text: '没有相册和相机权限，是否前往设置修改权限？',
        reTryTitle: '前往',
        okTitle: '取消',
      },
    };
    //@ts-ignore
    // ImagePicker.showImagePicker(options, response => {
    //   if (response.didCancel) {
    //     console.log('didCancel');
    //   } else if (response.error) {
    //     if (response.error.indexOf('permissions') > 0) {
    //       EasyAlert.show(
    //         {
    //           title: '提示',
    //           notice: '没有相机相册权限，是否前往设置修改权限？',
    //           inputComponentIsShow: false,
    //           buttons: [{ text: '取消' }, { text: '确定' }],
    //         },
    //         () => {
    //           // 前往设置
    //           Linking.openURL('app-settings:').catch(err => console.log('error', err));
    //         },
    //       );
    //     } else if (response.error.indexOf('simulator') > 0) {
    //       EasyAlert.show(
    //         {
    //           title: '提示',
    //           notice: '模拟器上无法使用相机功能',
    //           inputComponentIsShow: false,
    //           buttons: [{ text: '取消' }, { text: '确定' }],
    //         },
    //         () => {},
    //       );
    //     } else {
    //       EasyAlert.show(
    //         {
    //           title: '提示',
    //           notice: response.error,
    //           inputComponentIsShow: false,
    //           buttons: [{ text: '取消' }, { text: '确定' }],
    //         },
    //         () => {},
    //       );
    //     }
    //   } else if (response.customButton) {
    //     console.log('customButton');
    //   } else if (response.uri) {
    //     let { path } = response;
    //     if (!path) {
    //       path = response.uri;
    //     }
    //     QRreader(path)
    //       //@ts-ignore
    //       .then(data => {
    //         // EasyShowLD.loadingClose();
    //         callback && callback({ code: ERROR_CODE.SUCCESS, data });
    //       })
    //       //@ts-ignore
    //       .catch(err => {
    //         // EasyShowLD.loadingClose();
    //         callback && callback({ code: '-1', data: err });
    //       });
    //   }
    // });
  },
  //@ts-ignore
  phoneCall: phoneNumber => {
    if (Platform.OS === 'android') {
      androidPhoneCall(phoneNumber);
    } else if (Platform.OS === 'ios') {
      _phoneCall(phoneNumber);
    }
  },
  //@ts-ignore
  launchImageLibrary: (callback, config = {}) => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      ...config,
    };
    //@ts-ignore
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('didCancel');
      } else if (response.error) {
        if (response.error.indexOf('permissions') > 0) {
          // EasyAlert.show(
          //   {
          //     title: '提示',
          //     notice: '没有相机相册权限，是否前往设置修改权限？',
          //     inputComponentIsShow: false,
          //     buttons: [{ text: '取消' }, { text: '确定' }],
          //   },
          //   () => {
          //     // 前往设置
          //     Linking.openURL('app-settings:').catch(err => console.log('error', err));
          //   },
          // );
        } else if (response.error.indexOf('simulator') > 0) {
          // EasyAlert.show(
          //   {
          //     title: '提示',
          //     notice: '模拟器上无法使用相机功能',
          //     inputComponentIsShow: false,
          //     buttons: [{ text: '取消' }, { text: '确定' }],
          //   },
          //   () => {},
          // );
        } else {
          // EasyAlert.show(
          //   {
          //     title: '提示',
          //     notice: response.error,
          //     inputComponentIsShow: false,
          //     buttons: [{ text: '取消' }, { text: '确定' }],
          //   },
          //   () => {},
          // );
        }
      } else if (response.customButton) {
        console.log('customButton');
      } else {
        callback && callback(response);
      }
    });
  },
  //@ts-ignore
  launchCamera: (callback, config = {}) => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      ...config,
    };
    //@ts-ignore
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('didCancel');
      } else if (response.error) {
        if (response.error.indexOf('permissions') > 0) {
          // EasyAlert.show(
          //   {
          //     title: '提示',
          //     notice: '没有相机相册权限，是否前往设置修改权限？',
          //     inputComponentIsShow: false,
          //     buttons: [{ text: '取消' }, { text: '确定' }],
          //   },
          //   () => {
          //     // 前往设置
          //     Linking.openURL('app-settings:').catch(err => console.log('error', err));
          //   },
          // );
        } else if (response.error.indexOf('simulator') > 0) {
          // EasyAlert.show(
          //   {
          //     title: '提示',
          //     notice: '模拟器上无法使用相机功能',
          //     inputComponentIsShow: false,
          //     buttons: [{ text: '取消' }, { text: '确定' }],
          //   },
          //   () => {},
          // );
        } else {
          // EasyAlert.show(
          //   {
          //     title: '提示',
          //     notice: response.error,
          //     inputComponentIsShow: false,
          //     buttons: [{ text: '取消' }, { text: '确定' }],
          //   },
          //   () => {},
          // );
        }
      } else if (response.customButton) {
        console.log('customButton');
      } else {
        callback && callback(response);
      }
    });
  },
};
