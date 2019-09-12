import React, { memo } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface Props {
  text1?: string; //文字1
  text2?: string; //文字2
}

const RightHeader = memo((props: Props) => {
  const { text1, text2 } = props;
  return (
    <View style={styles.rightHeaderBg}>
      <Text style={styles.rightHeaderText}>{text1 || '价格'}</Text>
      <Text style={styles.rightHeaderText}>{text2 || '数量'}</Text>
    </View>
  );
});

export default RightHeader;
