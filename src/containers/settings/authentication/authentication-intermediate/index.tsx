import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { createSelector } from 'reselect';
import { Button, SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';
import UIColor from '../../../../const/colors';
import Camera from '../custom-camera';
import Header from '../header';
import AWS from '../../../../utils/AWS';
import LinkUtil from '../../../../utils/link-util';
import { DispatchProps, Props, StateProps } from './interfaces';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { useNavigation } from '../../../../routes/navigation-service';
import Alert, { EasyAlert } from '../../../../components/easyAlert/Alert';
import { EasyShowLD, LoadingDialog } from '../../../../components/easyShowLD/EasyShow';
import { ERROR_CODE } from '../../../../const/enum-set';
import * as types from '../../../../redux/action-types';

let indexPath = -1;
let isDelete = false;
let isSave = false;
let viewRef1: any = null;
const AuthenticationIntermediate = (props: DispatchProps & Props) => {
  console.log('props=======', props);
  const { state, goBack, navigate, getParam } = useNavigation();
  const [isChoose, setIsChoose] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const url = getParam('url');
  let arr = [];
  if (url && url.length > 0) {
    arr = url.split(',');
  }
  const [url1, setUrl1] = useState(arr.length > 0 ? arr[0] : '');
  const [url2, setUrl2] = useState(arr.length > 0 ? arr[1] : '');

  const styles = outerStyles();
  let data = [{ name: '拍照' }, { name: '从手机相册获取' }];
  let data1 = [{ name: '删除照片' }];
  useEffect(() => {
    if (props.getUpLoadImgAuthCode === ERROR_CODE.SUCCESS) {
      EasyShowLD.loadingClose();
      goBack();
    } else {
      EasyShowLD.loadingClose();
      // props.userAuthInfoMsg && Alert.alert(props.userAuthInfoMsg);
    }
    props.resetState(types.REMOVE_UPLOAD_IMG_AUTH);
  }, [props.getUpLoadImgAuthCode]);

  useEffect(() => {
    if (props.getUpLoadSaveAuthCode === ERROR_CODE.SUCCESS) {
      EasyShowLD.loadingClose();
      goBack();
    } else {
      EasyShowLD.loadingClose();
    }
    props.resetState(types.REMOVE_UPLOAD_SAVE_AUTH);
  }, [props.getUpLoadSaveAuthCode]);

  const uploadSaveImage = (url1: string, url2: string) => {
    isSave = false;
    EasyShowLD.loadingShow('保存图片中...');
    props.getUpLoadSaveAuth({ userIdCardImgUrl: !url1 && !url2 ? '' : `${url1},${url2}` });
  };
  const topView = () => {
    return (
      <View style={[styles.container]}>
        <Text style={styles.midText}>
          <Text style={styles.midText1}>温馨提示:</Text>
          <Text style={styles.midText2} numberOfLines={2}>
            上传清晰正确的身份证照片可以加速认证,身份证照片仅用于中级认证,请放心上传。
          </Text>
        </Text>
      </View>
    );
  };

  // 点击选择图片
  const onChooseImage = (index: number) => {
    indexPath = index;
    setIsChoose(true);
  };

  const midView = () => {
    return (
      <View style={styles.midView}>
        <View style={[styles.midView1]}>
          <Text style={styles.midText4}>上传正面</Text>
          <TouchableOpacity onPress={() => onChooseImage(0)}>
            {url1 ? (
              <View style={styles.baseMidView}>
                <Image source={Imgs.verification_img05} style={styles.imageView} />
                <View style={[styles.ImageItem, styles.ImageItem2]}>
                  <ActivityIndicator color={UIColor.whiteColor} />
                </View>
                <Image
                  style={styles.ImageItem}
                  source={{
                    uri: url1,
                  }}
                />
              </View>
            ) : (
              <View style={styles.baseMidView}>
                <Image source={Imgs.verification_img01} style={styles.imageView1} />
                <Image source={Imgs.verification_img05} style={styles.imageBView} />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.midView2}>
          <Text style={styles.midText5}>上传国旗面</Text>
          <TouchableOpacity onPress={() => onChooseImage(1)}>
            {url2 ? (
              <View style={styles.baseMidView1}>
                <Image source={Imgs.verification_img06} style={styles.imageView} />
                <View style={[styles.ImageItem, styles.ImageItem2]}>
                  <ActivityIndicator color={UIColor.whiteColor} />
                </View>
                <Image
                  style={styles.ImageItem}
                  source={{
                    uri: url2,
                  }}
                />
              </View>
            ) : (
              <View style={styles.baseMidView1}>
                <Image source={Imgs.verification_img01} style={styles.imageView1} />
                <Image source={Imgs.verification_img06} style={styles.imageBView} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // 图片删除
  const onImageDelete = () => {
    if (indexPath === 0) {
      setUrl1('');
    } else {
      setUrl2('');
    }
    setIsChoose(false);
    indexPath = -1;
    isDelete = true;
    isSave = true;
  };

  //
  const onCancelChooseImage = () => {
    setIsChoose(false);
    indexPath = -1;
  };

  // 点击打开照相机
  const onOpenCamera = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    LinkUtil.launchCamera(uploadImage);
    setIsChoose(false);
    setOpenCamera(true);
  };

  // 点击打开相册
  const onOpenLibrary = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    LinkUtil.launchImageLibrary(uploadImage);
    setIsChoose(false);
  };

  const uploadImageStart = () => {};
  // 上传图片
  const uploadImage = (response: any) => {
    EasyShowLD.loadingShow('上传中...');
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    AWS.normalUpload(response, uploadImageStart, uploadImageSucc);
  };

  // 上传图片
  const upCameraloadImage = (response: any) => {
    setOpenCamera(false);
    uploadImage(response);
  };

  const uploadImageSucc = (response: any) => {
    console.log('uploadImageSucc', response);
    EasyShowLD.loadingClose();
    if (indexPath === 0) setUrl1(response);
    else if (indexPath === 1) setUrl2(response);
    indexPath = -1;
    isSave = true;
    isDelete = false;
  };

  // 点击item bts
  const onChooseItem = (item: any, key: number) => {
    if (key === 0) {
      onOpenCamera();
    } else if (key === 1) {
      onOpenLibrary();
    }
  };

  const photoCancel = () => {
    setOpenCamera(false);
    console.log('_photoCancel');
  };

  const isCanNext = () => {
    return url1 && url2;
  };

  // 取消
  const onCancel = () => {
    EasyAlert.close();
    isSave = false;
    goBack();
  };

  // 上传 验证
  const onSave = () => {
    props.getUpLoadImgAuth({ userIdCardImgUrl: `${url1},${url2}` });
    EasyShowLD.loadingShow('审核中...');
  };

  // 返回
  const onBack = () => {
    // 如果没有更改图片数据 就直接退出
    console.log('props.arr=======', isSave);
    if (!isSave) {
      isSave = false;
      goBack();
      return;
    }
    if (isDelete || url1 || url2) {
      EasyAlert.show(
        {
          title: '提示',
          notice: '是否保存图片？',
          inputComponentIsShow: false,
          buttons: [{ text: '取消', onPress: onCancel }, { text: '确定' }],
        },
        () => {
          // 前往保存
          uploadSaveImage(url1, url2);
        },
      );
    } else uploadSaveImage(url1, url2);
  };

  const showBtns = () => {
    const isImage = (indexPath === 0 && url1) || (indexPath === 1 && url2);
    if (isImage) {
      // 渲染数据
      return data1.map((item, index) => (
        <TouchableOpacity key={index} style={styles.buttonStyle} onPress={() => onImageDelete()}>
          <View style={styles.chooseView1} key={index}>
            <Text style={styles.chooseText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ));
    }
    // 渲染数据
    return data.map((item, index) => (
      <TouchableOpacity key={index} style={styles.buttonStyle} onPress={() => onChooseItem(item, index)}>
        <View style={styles.chooseView1} key={index}>
          <Text style={styles.chooseText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const isImage1 = indexPath === 0 && url1;
  const isImage2 = indexPath === 1 && url2;
  const image = isImage2 ? url2 : null;
  if (openCamera) {
    return <Camera isDirection={indexPath} onPressPicture={upCameraloadImage} onPressCancel={photoCancel} />;
  }
  return (
    <SafeAreaView style={styles.safeContainer}>
      {isChoose ? (
        <TouchableOpacity style={styles.blackView} onPress={onCancelChooseImage}>
          <View style={styles.chooseView}>
            <TouchableOpacity style={styles.buttonStyle} onPress={onCancelChooseImage}>
              <View style={styles.chooseView1}>
                <Text style={styles.chooseText}>取消</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.chooseView2}>{showBtns()}</View>
          {isImage1 || isImage2 ? (
            <View style={styles.ImageView}>
              <Image style={styles.ImageItem1} source={{ uri: isImage1 ? url1 : image }} />
            </View>
          ) : null}
        </TouchableOpacity>
      ) : null}
      <View
        ref={viewRef => {
          viewRef1 = viewRef;
        }}>
        <View style={styles.base}>
          <Header title="中级认证" navigation={navigate} leftTitle="" leftImage={Imgs.back} onPressLeft={onBack} />
          <View style={styles.bgBaseView}>
            {topView()}
            {midView()}
            <View style={styles.bgBaseChildView}>
              <View style={styles.bgBaseChildView1}>
                <Button style={styles.authButton} disabled={!isCanNext()} onPress={onSave}>
                  完 成
                </Button>
              </View>
            </View>
          </View>
        </View>
        <Alert viewRef={viewRef1} />
        <LoadingDialog />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.getUpLoadImgAuth, (state: Record<string, any>) => state.getUpLoadSaveAuth],
  (getUpLoadImgAuth, getUpLoadSaveAuth) => {
    return {
      getUpLoadSaveAuthCode: getUpLoadSaveAuth.code,
      getUpLoadImgAuthCode: getUpLoadImgAuth.code,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationIntermediate);
