import React, { PureComponent, useState } from 'react';
import { Image, Modal, NativeModules, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { setRatio } from '../../utils/screen-util';
import UIColor from '../../const/colors';
import Imgs from '../../const/image-set';
import LinkUtil from '../../utils/link-util';
import styles from './styles';
import Config from '../../const/config';
interface Props {
  data: any;
  callback: () => void;
}

const Forced = (props: Props) => {
  const [later, setLater] = useState(false);
  const showAlert = () => {
    const { data = {} } = props;
    const { apkUrl } = data;
    if (!apkUrl) {
      return;
    }
    if (Platform.OS === 'android') {
      NativeModules.upgrade.upgrade(apkUrl);
    } else {
      LinkUtil.linkWeb(apkUrl);
    }
  };

  const call = () => {
    setLater(true);
    props.callback && props.callback();
  };

  const { data = {} } = props;
  if (!data || !data.versionNo) {
    return null;
  }
  const { description, versionNo, size, forceUpdate } = data;
  const descItems = description.split(';');
  const autoWidth = setRatio(450);
  let laterTextElement = null;
  // forceUpdate  0.强制更新 1.可选更新
  if (forceUpdate === '1') {
    laterTextElement = (
      <Text style={styles.updateLaterText} onPress={call}>
        暂不更新
      </Text>
    );
  }

  return (
    <Modal visible={true} transparent>
      <View style={styles.bgView}>
        <View style={styles.View2} />
        <Image source={Imgs.gengxin_img01} style={{ width: autoWidth, height: setRatio(300) }} />
        <Image source={Imgs.gengxin_img02} style={{ width: autoWidth, height: setRatio(150) }} />
        <Image source={Imgs.gengxin_img03} style={{ width: autoWidth, height: setRatio(150) }} />
        <View style={styles.View1}>
          <Text style={styles.Text1}>{`最新版本：${versionNo}`}</Text>
          <Text style={styles.Text1}>{`版本大小：${size}M`}</Text>
          <ScrollView horizontal={false}>
            {descItems.map((item: any, index: any) => (
              <Text style={styles.Text1} key={index}>
                {item}
              </Text>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.TouchableOpacity1} onPress={showAlert}>
            <Text style={styles.updateNowText}>立即更新</Text>
          </TouchableOpacity>
          {laterTextElement}
        </View>
      </View>
    </Modal>
  );
};

export default Forced;
