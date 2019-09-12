import React, { useState } from 'react';
import { Image, RefreshControl, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
import { FlatList, SafeAreaView } from 'space-ui';
import Imgs from '../../const/image-set';
import UIColor from '../../const/colors';
import { useNavigation } from 'react-navigation-hooks';
import { groupBy, groupByLetter } from '../../utils/wallet-utils';
/*
* const HomeLogo = memo((props: any) => {
  return <Image style={styles.container} source={ImageSet.home_logo} />;
});
*
* */

const ChooseCoin = () => {
  const styles = outerStyles();
  const { goBack, getParam } = useNavigation();
  const currecy = getParam('currencysMap');
  const sort = groupBy(currecy, 'code');
  const [dataList, setDataList] = useState(sort);
  const [inputString, setInputString] = useState('');
  const onPressinPut = (string: string) => {
    setInputString(string);
    let sort1 = [];
    if (string.length > 0) {
      sort1 = groupByLetter(currecy, 'code', string.length, string);
    } else {
      sort1 = groupBy(currecy, 'code');
    }
    setDataList(sort1);
  };
  const onPressCancel = () => {
    goBack();
    const onChooseCoinCallback = getParam('onChooseCoinCallback');
    if (onChooseCoinCallback) onChooseCoinCallback(null);
  };
  const onChoose = (item: any) => {
    goBack();
    const onChooseCoinCallback = getParam('onChooseCoinCallback');
    if (onChooseCoinCallback) onChooseCoinCallback(item, true);
  };
  const renderItem = (info: any) => {
    var txt = info.item.code;
    return (
      <TouchableOpacity style={styles.textView} onPress={() => onChoose(info.item)}>
        <View style={styles.itemView}>
          <Text style={styles.itemText}>{txt}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const sectionComp = (info: any) => {
    var txt = info.section.key;
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionText}>{txt}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.baseView}>
      <View style={styles.body}>
        <View style={styles.flexView}>
          <Image style={styles.imageView} source={Imgs.icon_search} />
          <TextInput
            style={styles.input}
            placeholder="搜索"
            value={inputString}
            onChangeText={(card: string) => onPressinPut(card)}
            placeholderTextColor={UIColor.secondTextColor}
          />
        </View>
        <View style={styles.flexView1}>
          <TouchableOpacity style={styles.textView} onPress={onPressCancel}>
            <Text>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SectionList
        renderSectionHeader={sectionComp}
        renderItem={renderItem}
        sections={dataList}
        ItemSeparatorComponent={() => (
          <View>
            <Text></Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ChooseCoin;
