import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import { useNavigation } from '../../../../../routes/navigation-service';
import outerStyles from './styles';
import { ERROR_CODE } from '../../../../../const/enum-set';
import { connect } from 'react-redux';
import Imgs from '../../../../../const/image-set';
import Header from '../../../../settings/authentication/header';
import { screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
// @ts-ignore
import { QRreader, QRscanner } from 'react-native-qr-scanner';
// @ts-ignore
import QRCodeScanner from 'react-native-qrcode-scanner';
import ImagePicker from 'react-native-image-picker';
import UIColor from '../../../../../const/colors';

interface Props {
  title1: string;
  title2: string;
  onChoose: (value: number) => void;
}

const AssetsQrScanner = (props: Props) => {
  const styles = outerStyles();
  const { navigate, getParam, goBack } = useNavigation();
  const [tabIndex, setTabIndex] = useState(0);

  const onRead = (res: any) => {
    goBack();
    const onAssetsQrScanner = getParam('onAssetsQrScanner');
    if (onAssetsQrScanner) onAssetsQrScanner(res);
    // this.props.navigation.state.params.onQrcode({ qrcode: res.data });
  };

  const onBack = () => {
    goBack();
    // this.props.navigation.state.params.onQrcode({ qrcode: res.data });
  };

  const openPhoto = () => {
    const options = {
      title: '选择照片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从手机相册中选择',
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('didCancel');
      } else if (response.error) {
        console.log('error');
      } else if (response.customButton) {
        console.log('customButton');
      } else if (response.uri) {
        let { path } = response;
        if (!path) {
          path = response.uri;
        }
        // QRreader(path)
        //   .then((data: any) => {
        //     goBack();
        //     const onAssetsQrScanner = getParam('onAssetsQrScanner');
        //     if (onAssetsQrScanner) onAssetsQrScanner(data);
        //     // this.props.navigation.state.params.onQrcode({ qrcode: data });
        //   })
        //   .catch((err: any) => {
        //     // EasyToast.show('识别失败');
        //   });
      }
    });
  };
  return (
    <SafeAreaView>
      <Header
        title="扫描二维码"
        onPressRight={openPhoto}
        navigation={navigate}
        rightTitle="从相册选取"
        rightTextStyle={{ color: UIColor.colorA1 }}
        leftTitle=""
        leftImage={Imgs.back}
        onPressLeft={onBack}
      />
      {/*<QRCodeScanner cameraStyle={styles.container} onRead={onRead} />*/}
      <QRscanner onRead={onRead} cornerColor="#5ec8e7" rectWidth={setRatio(444)} rectHeight={setRatio(444)} hintText="" scanBarMargin={setRatio(0)} zoom={0} />
      {/*{openPassword ? <InputFundPassWord onPressInput={onPressPassWord} inputContent={inPutPassString} modelVisible={true} onClose={onClosePassword} /> : null}*/}
    </SafeAreaView>
  );
};

export default AssetsQrScanner;
