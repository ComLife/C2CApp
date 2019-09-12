import React from 'react';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../const/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio } from '../utils/screen-util';
import { BoxShadow } from 'react-native-shadow';
const styles = StyleSheet.create({
  viewBg: {
    width: setRatio(150),
    height: setRatio(70),
    top: 500,
    left: 414,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
  },
  touchBg: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  touchStyle: {
    width: setRatio(148),
    height: setRatio(68),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
  },
  shadowIos: {
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowColor: 'rgba(123, 128, 140, 0.8)',
  },
  shadowAndroid: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
});
interface Props {
  data?: any;
  onColse?: any;
  leftValue?: any;
  topValue?: any;
  onBack: any;
}

export default function RightBottom(props: Props) {
  const { onColse, leftValue, topValue, data, onBack } = props;

  const shadow = Platform.OS === 'ios' ? styles.shadowIos : styles.shadowAndroid;
  const viewStyle = [styles.viewBg, shadow, { top: topValue || 290, left: leftValue || 23, marginTop: -1 }];
  const shadowOpt = {
    width: setRatio(149),
    height: setRatio(69),
    color: '#000',
    border: 1,
    radius: 1,
    opacity: 0.2,
    x: 0,
    y: 0,
  };

  const getMargin = (index: number) => {
    return { marginTop: index ? -1 : 0 };
  };

  const dataNum = () => {
    if (Platform.OS === 'ios') {
      return data.map((item: any, index: number) => (
        <View style={[viewStyle, getMargin(index)]} key={index}>
          <TouchableOpacity activeOpacity={1} style={styles.touchStyle} onPress={() => onBack(item.text, index)}>
            <Text style={{ color: item.color }}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      ));
    } else {
      return data.map((item: any, index: number) => (
        <View style={[viewStyle, getMargin(index)]} key={index}>
          <BoxShadow setting={shadowOpt} key={index}>
            <TouchableOpacity activeOpacity={1} style={styles.touchStyle} onPress={() => onBack(item.text, index)}>
              <Text style={{ color: item.color }}>{item.text}</Text>
            </TouchableOpacity>
          </BoxShadow>
        </View>
      ));
    }
  };

  return (
    <Modal transparent animationType="none">
      <TouchableOpacity style={styles.touchBg} onPress={onColse}>
        {dataNum()}
      </TouchableOpacity>
    </Modal>
  );
}
