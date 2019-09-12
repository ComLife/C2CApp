import React, { Fragment, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, TextInput } from 'space-ui';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';
import UIColor from '../../../../const/colors';

interface Props {
  inPutString: string;
  onPressChoose: () => void;
  onPressFocus: () => void;
  onPressDelete: () => void;
  closeCoin: boolean;
}

const AssetsSearch = (props: Props) => {
  const { onPressDelete, onPressFocus, closeCoin, onPressChoose, inPutString } = props;
  const styles = outerStyles();

  return (
    <View style={styles.body}>
      <View style={styles.baseView}>
        <Image style={styles.imageView} source={Imgs.icon_search} />
        <TouchableOpacity onPress={onPressFocus} style={styles.textInputButton}>
          <View style={styles.textView}>
            <Text style={styles.titleText}>{inPutString ? inPutString : '搜索'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.baseView1}>
        {!inPutString ? (
          <View />
        ) : (
          <TouchableOpacity style={styles.textInputButton1} onPress={onPressDelete}>
            <View style={styles.textView}>
              <Image source={Imgs.icon_delete_1} style={styles.deleteImage} />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.textInputButton2} onPress={onPressChoose}>
          <Image style={styles.imageView1} source={closeCoin ? Imgs.icon_hiddenCash_2 : Imgs.icon_hiddenCash} />
        </TouchableOpacity>
        <Text style={styles.titleText}>隐藏未持有币种</Text>
      </View>
    </View>
  );
};

export default AssetsSearch;
