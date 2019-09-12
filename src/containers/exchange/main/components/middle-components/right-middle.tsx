import React, { memo } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Colors from '../../../../../const/colors';
import { setRatio } from '../../../../../utils/screen-util';

interface Props {
  type: string; //样式 0为上下盘口 1红盘 2绿盘
  data: any; //数据
  data1?: any; //上下盘时下面的数据
}

const RightMiddle = memo((props: Props) => {
  const { type, data, data1 } = props;
  let textStyle = [styles.midText1, {}];
  const textStyle1 = [styles.midText1, { color: Colors.colorA2 }];

  if (type === '0') {
    textStyle = [styles.midText1, { color: Colors.colorA3 }];
  } else if (type === '1') {
    textStyle = [styles.midText1, { color: Colors.colorA3 }];
  } else if (type === '2') {
    textStyle = [styles.midText1, { color: Colors.colorA2 }];
  } else {
    textStyle = [styles.midText1, { color: Colors.colorA3 }];
  }

  const dataMap = () => {
    if (!data) {
      return;
    }
    return data.map((item: any, index: number) => (
      <View style={styles.rightMidPanel} key={index}>
        <Text style={textStyle}>{item.entrustPrice}</Text>
        <Text style={styles.midText1}>{item.entrustNum}</Text>
        <View
          style={[
            styles.rightMidButtomPanel,
            { backgroundColor: type === '2' ? Colors.depthGreenColor : Colors.depthRedColor, width: setRatio(item.accumulativeTotal) },
          ]}
        />
      </View>
    ));
  };

  const data1Map = () => {
    if (!data1.length) {
      return;
    }

    return data1.map((item: any, index: number) => (
      <View style={styles.rightMidPanel} key={index}>
        <Text style={textStyle1}>{item.entrustPrice}</Text>
        <Text style={styles.midText1}>{item.entrustNum}</Text>
        <View style={[styles.rightMidButtomPanel, { backgroundColor: Colors.depthGreenColor, width: setRatio(item.accumulativeTotal) }]} />
      </View>
    ));
  };

  const showDiv = () => {
    if (type === '0') {
      return (
        <View style={styles.rightMidPanel}>
          <View style={styles.rightMidDiv} />
        </View>
      );
    }
  };

  return (
    <View style={styles.rightMidBg}>
      {dataMap()}
      {showDiv()}
      {data1Map()}
    </View>
  );
});

export default RightMiddle;
