import React from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from '../styles';
import Colors from '../../../../const/colors';

interface Props {
  titleText: string; //背景色
  onClick: any;
  type: string;
  isOpen?: boolean;
}

export default function PesrsonalItem(props: Props) {
  const styles = outerStyles();

  const { titleText, onClick, type, isOpen } = props;

  const isType = () => {
    if (type === 'btn') {
      return (
        <Switch
          // 动态改变value
          value={isOpen}
          trackColor={{ false: Colors.colorB5, true: Colors.colorA1 }}
          // 当切换开关室回调此方法
          onValueChange={onClick}
        />
      );
    } else if (type) {
      return (
        <TouchableOpacity onPress={onClick}>
          <Text style={styles.itemTextBtn}>{type}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.itemBg}>
      <Text style={styles.itemText}>{titleText || '安全中心'}</Text>
      <View style={styles.itemView}>{isType()}</View>
    </View>
  );
}
