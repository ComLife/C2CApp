import React, { memo } from 'react';
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import ImageSet from '../../../../const/image-set';

interface Props {
  text1: string;
  text2: string;
  text3: string;
  percentSort?: string;
  btn3Enabled?: boolean;
  btn3Press: (event: GestureResponderEvent) => void;
}

const ListSubTitle = memo((props: Props) => {
  const { text1, text2, text3, btn3Enabled, btn3Press, percentSort } = props;
  const getPercentSortingSource = () => {
    switch (percentSort) {
      case 'asc':
        return ImageSet.icon_sorting_up;
      case 'desc':
        return ImageSet.icon_sorting_down;
      default:
        return ImageSet.icon_sorting_default;
    }
  };

  const activeOpacity = btn3Enabled ? 0.7 : 1;
  const percentSortingIcon = btn3Enabled ? <Image style={styles.percentSortingIcon} source={getPercentSortingSource()} /> : null;
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper]}>
        <Text style={styles.text}>{text1}</Text>
      </View>
      <View style={[styles.wrapper, styles.middleWrapper]}>
        <Text style={styles.text}>{text2}</Text>
      </View>
      <TouchableOpacity activeOpacity={activeOpacity} disabled={!btn3Enabled} style={[styles.wrapper, styles.rightWrapper]} onPress={btn3Press}>
        <Text style={styles.text}>{text3}</Text>
        {percentSortingIcon}
      </TouchableOpacity>
    </View>
  );
});

export default ListSubTitle;
