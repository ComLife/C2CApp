import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImageSet from '../../../../const/image-set';
import styles from './styles';

interface Props {
  local: Record<string, string>[];
  item: Record<string, any>;
  onSearchPress?: (item: Record<string, any>) => void;
  onItemPress?: (item: Record<string, any>) => void;
}

const ListSearchItem = memo((props: Props) => {
  const { onSearchPress, onItemPress, item, local } = props;
  if (!item) {
    return null;
  }

  const isExist = (item: Record<string, string>) => {
    if (local && local.length > 0) {
      const result = local.filter((r: Record<string, string>) => r.baseCurrency === item.baseCurrencyCode && r.paymentCurrency === item.paymentCurrencyCode);
      return result.length > 0;
    }
    return false;
  };

  const title = `${item.baseCurrencyCode}/${item.paymentCurrencyCode}`;
  const source = isExist(item) ? ImageSet.icon_collection : ImageSet.icon_collection_2;
  const onIconPress = () => {
    onSearchPress && onSearchPress(item);
  };

  const onTextPress = () => {
    onItemPress && onItemPress(item);
  };

  // return (
  //   <TouchableOpacity onPress={onTextPress} style={styles.container}>
  //     <Text style={styles.text}>{title}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={onTextPress}>
        {title}
      </Text>
      <TouchableOpacity onPress={onIconPress}>
        <Image style={styles.icon} source={source} />
      </TouchableOpacity>
    </View>
  );
});

export default ListSearchItem;
