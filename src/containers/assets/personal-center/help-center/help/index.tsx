import React, { Fragment, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import { useNavigation } from '../../../../../routes/navigation-service';
import { EasyShowLD, LoadingDialog } from '../../../../../components/easyShowLD/EasyShow';
import Config from '../../../../../const/config';
import Imgs from '../../../../../const/image-set';
import Header from '../../../../settings/authentication/header';

const Help = () => {
  const { navigate, goBack, replace } = useNavigation();
  const styles = outerStyles();

  const back = () => {
    goBack();
  };

  const onLoadEnd = () => {
    EasyShowLD.loadingClose();
  };

  const onLoadStart = () => {
    EasyShowLD.loadingShow('加载中...');
  };
  return (
    <View style={[styles.container]}>
      <SafeAreaView forceInset={{ bottom: 'never' }}>
        <Header title="帮助中心" leftTitle="" leftImage={Imgs.back} onPressLeft={back} />
        <View style={styles.container1}>
          <WebView style={styles.view} source={{ uri: Config.zendeskUri }} onLoadEnd={onLoadEnd} onLoadStart={onLoadStart} />
        </View>
        <LoadingDialog />
      </SafeAreaView>
    </View>
  );
};
export default Help;
