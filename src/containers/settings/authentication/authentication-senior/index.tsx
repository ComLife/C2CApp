import React, { Fragment, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createSelector } from 'reselect';
import { Button, SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';
import UIColor from '../../../../const/colors';
import Header from '../header';
import AWS from '../../../../utils/AWS';
import LinkUtil from '../../../../utils/link-util';
import Alert, { EasyAlert } from '../../../../components/easyAlert/Alert';
import { EasyShowLD, LoadingDialog } from '../../../../components/easyShowLD/EasyShow';
import { DispatchProps, Props, StateProps } from '../authentication-senior/interfaces';
import { connect } from 'react-redux';
import mapDispatchToProps from '../authentication-senior/map-dispatch-to-props';
import { AUTH_LEVEL, ERROR_CODE } from '../../../../const/enum-set';
import { useNavigation } from '../../../../routes/navigation-service';
import * as types from '../../../../redux/action-types';

let isDelete = false;
let isSave = false;
let viewRef1: any = null;
const AuthenticationSenior = (props: DispatchProps & Props) => {
  const { state, goBack, navigate, getParam } = useNavigation();
  const [isChoose, setIsChoose] = useState(false);
  const baseUrl = getParam('url');
  let arr = [];
  if (baseUrl && baseUrl.length > 0) {
    arr = baseUrl.split(',');
  }
  const [url, setUrl] = useState(arr.length > 0 ? arr[0] : '');
  const styles = outerStyles();
  const status = getParam('isExamine');
  const errorAuth = getParam('errorAuth');
  let data = [{ name: '拍照' }, { name: '从手机相册获取' }];
  let data1 = [{ name: '删除照片' }];

  useEffect(() => {
    if (props.getUpLoadFaceAuthCode === ERROR_CODE.SUCCESS) {
      EasyShowLD.loadingClose();
      goBack();
    } else {
      EasyShowLD.loadingClose();
      // props.userAuthInfoMsg && Alert.alert(props.userAuthInfoMsg);
    }
    props.resetState(types.REMOVE_UPLOAD_FACE_AUTH);
  }, [props.getUpLoadFaceAuthCode]);

  const isStatus = () => status && status === AUTH_LEVEL.Authentication30;

  const isCanNext = () => {
    return url;
  };

  // 图片删除
  const onImageDelete = () => {
    setUrl('');
    setIsChoose(false);
    isDelete = true;
    isSave = true;
  };

  // 点击选择图片
  const onChooseImage = () => {
    setIsChoose(true);
  };

  //
  const onCancelChooseImage = () => {
    setIsChoose(false);
  };

  // 点击打开照相机
  const onOpenCamera = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    LinkUtil.launchCamera(uploadImage);
    setIsChoose(false);
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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    AWS.normalUpload(response, uploadImageStart, uploadImageSucc);
  };

  const uploadImageSucc = (response: any) => {
    EasyShowLD.loadingClose();
    setUrl(response);
    isSave = true;
    isDelete = false;
  };

  // 点击item bts
  const onChooseItem = (item: any, key: any) => {
    if (key === 0) {
      onOpenCamera();
    } else if (key === 1) {
      onOpenLibrary();
    }
  };

  const onSave = () => {
    EasyShowLD.loadingShow('提交中...');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    upLoadImage(true);
  };

  const upLoadImage = (isUpLoad: any) => {
    isSave = false;
    props.getUpLoadFaceAuth({ userSelfPhotoUrl: url, submitFlag: isUpLoad });
  };

  // 取消
  const onCancel = () => {
    EasyAlert.close();
    isSave = false;
    goBack();
  };

  const onBack = () => {
    // 如果没有更改图片数据 就直接退出
    if (!isSave) {
      isSave = false;
      goBack();
      return;
    }
    if (isDelete || url) {
      EasyAlert.show(
        {
          title: '提示',
          notice: '是否保存图片？',
          inputComponentIsShow: false,
          buttons: [{ text: '取消', onPress: onCancel }, { text: '确定' }],
        },
        () => {
          // 前往保存
          upLoadImage(false);
        },
      );
    } else upLoadImage(false);
  };

  const showBtns = () => {
    const isImage = url;
    if (isImage) {
      // 渲染数据
      // @ts-ignore
      return data1.map((item, index) => (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => onImageDelete()}>
          <View style={styles.chooseView1} key={index}>
            <Text style={styles.chooseText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ));
    }
    // 渲染数据
    // @ts-ignore
    return data.map((item, index) => (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onChooseItem(item, index)}>
        <View style={styles.chooseView1} key={index}>
          <Text style={styles.chooseText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const topView = () => {
    return (
      <View style={[styles.container]}>
        <Text style={styles.midText2} numberOfLines={5}>
          我是XXX，身份证号XXXXXXXXXXXXXXXXXX，我已知 晓虚拟货币投资风险巨大，自愿参与，自担风险，保证 身份信息不提供给他人，不进行非法行为，如有违反，
          本人愿意承担法律风险。
        </Text>
      </View>
    );
  };

  const midView = () => {
    return (
      <View style={styles.midView}>
        <TouchableOpacity onPress={() => (isStatus() ? null : onChooseImage())} activeOpacity={isStatus() ? 1.0 : 0.5}>
          <View style={styles.midViewStyle}>
            {url ? (
              <View style={styles.midImageVIew}>
                <Image style={styles.imageStyle} source={{ uri: url ? url : null }} />
              </View>
            ) : (
              <View style={styles.midImageVIew}>
                <Image source={Imgs.verification_img01} style={styles.imageStyle} />
                <Image source={Imgs.verification_img07} style={styles.imageSamllStyle} />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.tipsView}>
          <Text style={styles.midText4} numberOfLines={2}>
            支持jpg、png格式；文件大小不超过10M；证件信息清晰可见， 不允许任何遮挡和修改；字迹清晰。
          </Text>
          {isStatus() ? <Image source={Imgs.verification_img08} style={styles.imageStyle1} /> : null}
        </View>
      </View>
    );
  };

  const errorView = () => {
    return (
      <View style={styles.errorView}>
        <Text style={styles.errorText1}>
          <Text style={[styles.errorText, { color: UIColor.importantTextColor }]}>驳回原因:</Text>
          <Text style={styles.errorText} numberOfLines={2}>
            {errorAuth}
          </Text>
        </Text>
      </View>
    );
  };
  // uri: AWS.getNormalCustomSizeUrl(isImage1 ? url : null, 621, 432)
  const isImage1 = url;
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="高级认证"
        navigation={navigate}
        leftComponent={
          <TouchableOpacity style={styles.backStyle} onPress={onBack}>
            <Image source={Imgs.back} />
          </TouchableOpacity>
        }
      />
      {isChoose ? (
        <View style={styles.blackView}>
          <View style={styles.chooseView}>
            <TouchableOpacity style={styles.chooseFrameStyle} onPress={onCancelChooseImage}>
              <View style={styles.chooseView1}>
                <Text style={styles.chooseText}>取消</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.chooseView2}>{showBtns()}</View>
          {isImage1 ? (
            <View style={styles.ImageView}>
              <Image source={{ uri: isImage1 ? url : null }} style={styles.bigImageStyle} />
            </View>
          ) : null}
        </View>
      ) : null}
      <View style={styles.tipsView1}>
        <Text style={styles.midText1}>请上传手持身份证正面和纸条的照片，纸条需手写以下内容:</Text>
        {topView()}
        {midView()}
        {errorAuth && errorAuth.length > 0 ? errorView() : null}
        <View style={styles.bottomView}>
          <View style={styles.buttonStyleView}>
            <Button style={styles.authButton} disabled={isStatus() ? true : !isCanNext()} onPress={onSave}>
              保 存
            </Button>
          </View>
        </View>
      </View>
      <Alert viewRef={viewRef1} />
      <LoadingDialog />
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.getUpLoadFaceAuth],
  getUpLoadFaceAuth => {
    return {
      getUpLoadFaceAuthCode: getUpLoadFaceAuth.code,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationSenior);
