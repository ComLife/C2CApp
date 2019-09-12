import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';
import { RNCamera } from 'react-native-camera';
import { screenWidth } from '../../../../utils/screen-util';

interface Props {
  onPressPicture: (data: any) => void;
  onPressCancel: () => void;
  isDirection: number;
}

const CustomCamera = ({ isDirection, onPressPicture, onPressCancel }: Props) => {
  const styles = outerStyles();
  let camera: any = null;

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 1.0, base64: true, width: screenWidth };
      const data = await camera.takePictureAsync(options);
      console.log(data);
      onPressPicture(data);
    }
  };

  return (
    <View style={styles.baseView}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: '是否使用相机',
          message: '我们需要你的允许才能使用你的相机',
          buttonPositive: '确定',
          buttonNegative: '取消',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}>
        <Image source={isDirection === 0 ? Imgs.verification_img10 : Imgs.shenfenrenzheng_new} style={styles.imageView} />
      </RNCamera>
      <View style={styles.bgBottomView} />
      <View style={styles.bgBackView}>
        <View style={styles.tipView}>
          <Text style={styles.tipText}>{isDirection === 0 ? '请将人像面放到框内,并调整好光线' : '请将国徽面放到框内，并调整好光线'}</Text>
        </View>
        <View style={styles.canView}>
          <View style={styles.canBgView}>
            <View style={styles.cancelView}>
              <TouchableOpacity onPress={onPressCancel}>
                <Text style={styles.cancelText}>取消</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.photoView}>
              <TouchableOpacity onPress={takePicture}>
                <Image source={Imgs.verification_img09} style={styles.imageView1} />
              </TouchableOpacity>
            </View>
            <View style={styles.determineView} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomCamera;
