import React, { Fragment, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import { setRatio } from '../../../../../utils/screen-util';

interface Props {
  title1: string;
  title2: string;
  onChoose: (value: number) => void;
}

const AssetsChoose = (props: Props) => {
  const styles = outerStyles();
  const [tabViewIndex, setTabViewIndex] = useState(0);
  const onCheckIsShow = (number: number) => {
    setTabViewIndex(number);
    if (props.onChoose) {
      props.onChoose(number);
    }
  };

  const style = tabViewIndex === 0 ? styles.titleText1 : styles.titleText;
  return (
    <View style={styles.body}>
      <TouchableOpacity onPress={() => onCheckIsShow(0)}>
        <View style={styles.body1}>
          <Text style={tabViewIndex === 0 ? styles.titleText : styles.titleText1}>普通提币</Text>
          <View style={tabViewIndex === 0 ? styles.colorView : styles.colorView1} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onCheckIsShow(1)}>
        <View style={styles.body1}>
          <Text style={[style, { marginLeft: setRatio(53) }]}>内部转账</Text>
          <View style={tabViewIndex === 1 ? [styles.colorView, { marginLeft: setRatio(53) }] : [styles.colorView1, { marginLeft: setRatio(53) }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AssetsChoose;
