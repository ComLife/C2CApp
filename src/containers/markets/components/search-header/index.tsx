import React, { Fragment, memo, useRef } from 'react';
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'space-ui';
import ImageSet from '../../../../const/image-set';
import styles from './styles';

interface Props {
  onClearPress?: () => void;
  onSearchPress?: (event: GestureResponderEvent) => void;
  onBackPress?: (event: GestureResponderEvent) => void;
  onChangeText?: (text: string) => void;
}

const HeaderBar = memo((props: Props) => {
  const refInput = useRef(null);

  const onClearPress = () => {
    // @ts-ignore
    refInput && refInput.current.clear();
    props.onClearPress && props.onClearPress();
  };

  const hitSlop = { right: 20 };

  return (
    <Fragment>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={props.onSearchPress}>
          <Image style={styles.searchIcon} source={ImageSet.icon_search} />
        </TouchableOpacity>
        <TextInput placeholder={'请输入币种'} ref={refInput} style={styles.input} onChangeText={props.onChangeText} />
        <View style={styles.clearView}>
          <TouchableOpacity onPress={onClearPress}>
            <Image source={ImageSet.icon_cancel} />
          </TouchableOpacity>
        </View>
        <View style={styles.clearView}>
          <TouchableOpacity hitSlop={hitSlop} onPress={props.onBackPress}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
    </Fragment>
  );
});

export default HeaderBar;
