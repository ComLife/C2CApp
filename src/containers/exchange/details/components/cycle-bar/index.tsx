import React, { useCallback, useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import styles from './styles';

interface Props {
  data?: Record<string, any>;
  onPress?: (event: number) => void;
  items: string[];
}

export default function CycleBar(props: Props) {
  const { items } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const onBtnPress = useCallback(
    (index: number) => () => {
      setTabIndex(index);
      props.onPress && props.onPress(index);
    },
    [props],
  );

  return (
    <ScrollView
      horizontal={true}
      contentInsetAdjustmentBehavior="automatic"
      directionalLockEnabled={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentStyle}>
      {items.map((item: string, index: number) => {
        const textStyle: StyleProp<TextStyle> = index === tabIndex ? styles.text : [styles.text, styles.grayText];
        return (
          <TouchableOpacity activeOpacity={0.7} key={index} onPress={onBtnPress(index)}>
            <Text style={textStyle}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
