import React, { useState } from 'react';
import { Image, Modal, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from 'react-navigation-hooks';
import { groupBy, groupByLetter } from '../../utils/wallet-utils';
import { SafeAreaView } from 'space-ui';
import Imgs from '../../const/image-set';
import UIColor from '../../const/colors';
import Config from '../../const/config';
import { EasyToast } from '../../components/EasyToast/toast';
import LocalStore from '../../utils/local-store';
interface Props {
  color: string;
  value: number;
  onPress?: (p1: number, p2: Date) => void;
}

const callback = null;

const NetWork = () => {
  const { goBack, getParam } = useNavigation();
  const currecy = getParam('currencysMap');
  const sort = groupBy(currecy, 'code');

  const [baseUrl, setBaseUrl] = useState(Config.baseUrl);
  const [webSocketUrl, setWebSocketUrl] = useState(Config.wsUrl);
  const [modelVisible, setModelVisible] = useState(false);

  const allUrls = [
    {
      name: '内网',
      requestUrl: 'http://192.168.88.160:8080',
      webSocketUrl: 'ws://otcsocket.dev.otcrmbt.com/otcWebSocket',
      baseUrl: 'dev.otcrmbt.com',
      requestAvailable: 'http://120.79.17.186:10009/ip.list',
    },
    {
      name: '测试服',
      requestUrl: 'http://120.79.17.186:8080',
      webSocketUrl: 'ws://120.79.17.186:8086/otcWebSocket',
      baseUrl: 'whlive.top',
      requestAvailable: 'http://120.79.17.186:10009/ip.list',
    },
    {
      name: '预发布',
      requestUrl: 'http://api.pjllcm.com',
      webSocketUrl: 'ws://otc-socket.pjllcm.com/otcWebSocket',
      baseUrl: 'pjllcm.com',
      requestAvailable: 'http://120.79.17.186:10009/ip.list',
    },
    {
      name: '生产',
      requestUrl: 'http://api.potatoex.com',
      webSocketUrl: 'ws://otc-socket.potatoex.com/otcWebSocket',
      baseUrl: 'potatoex.com',
    },
  ];

  const show = (state: any, callback: any) => {
    callback = callback;
    setModelVisible(true);
    setBaseUrl(Config.baseUrl);
  };

  const close = () => {
    setModelVisible(false);
  };

  const changeNetwork = (item: any) => {
    setBaseUrl(item.baseUrl);
    setWebSocketUrl(item.webSocketUrl);
  };

  const setNetwork = () => {
    new LocalStore().saveLocalRepository('baseUrl', baseUrl);
    new LocalStore().saveLocalRepository('webSocketUrl', webSocketUrl);
    // Store.save('requestUrl', this.state.requestUrl);
    // Store.save('webSocketUrl', this.state.webSocketUrl);
    Config.baseUrl = baseUrl;
    Config.wsUrl = webSocketUrl;
    // Config.availableUrls = [this.state.baseUrl];
    // BaseConfig.requestAvailable = this.state.requestAvailable;
    // BaseConfig.updateUrl();
    // Store.save('availableUrls', BaseConfig.availableUrls);
    // Store.save('requestAvailable', BaseConfig.requestAvailable);
    setModelVisible(false);
    EasyToast.show('切换连接的服务后，请先刷新应用，然后重新登录');
  };

  const cancelSetNetwork = () => {
    setBaseUrl(Config.baseUrl);
    setWebSocketUrl(Config.wsUrl);
    setModelVisible(false);
  };

  return (
    <Modal visible={modelVisible} onRequestClose={cancelSetNetwork} transparent>
      <TouchableOpacity style={styles.modal} onPress={cancelSetNetwork} activeOpacity={1}>
        <View style={styles.container}>
          <View style={styles.li}>
            <Text style={styles.liTil}>域名</Text>
            <Text style={styles.liText}>{baseUrl}</Text>
          </View>
          {/* <View style={styles.li}> */}
          {/* <Text style={styles.liTil}>ws地址</Text> */}
          {/* <Text style={styles.liText}>{this.state.webSocketUrl}</Text> */}
          {/* </View> */}
          <View style={[styles.li, styles.liBtns]}>
            {allUrls.map(item => (
              <TouchableOpacity style={[styles.liBtn, item.baseUrl === baseUrl ? styles.liSelectBtn : '']} onPress={() => changeNetwork(item)} key={item.name}>
                <Text style={[styles.liBtnText, item.baseUrl === baseUrl ? styles.liSelectBtnText : '']}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.li, styles.btns]}>
            <TouchableOpacity style={[styles.btn, styles.btnCan]} onPress={cancelSetNetwork} activeOpacity={1}>
              <Text style={[styles.btnText, styles.btnTextCan]}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={setNetwork} activeOpacity={1}>
              <Text style={styles.btnText}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NetWork;
