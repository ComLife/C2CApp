import React, { memo, useCallback, useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  data?: Record<string, any>;
  onPress?: (event: string) => void;
  items: Record<string, string>;
  initKey?: string;
}

const BottomCycleBar = memo((props: Props) => {
  const { items, initKey } = props;
  const [tabKey, setTabKey] = useState(initKey || '');

  const onBtnPress = useCallback(
    (key: string) => () => {
      setTabKey(key);
      props.onPress && props.onPress(key);
    },
    [props],
  );

  return (
    <View style={styles.container}>
      {Object.entries(items).map((item: string[], index: number) => {
        const [key, value] = item;
        const textStyle: StyleProp<TextStyle> = key === tabKey ? styles.selectedText : styles.unselectedText;
        return (
          <TouchableOpacity activeOpacity={0.7} key={index} onPress={onBtnPress(key)}>
            <Text style={textStyle}>{value}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default BottomCycleBar;
