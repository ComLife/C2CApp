import React, { Fragment, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';

interface Props {
  onTransfer: () => void;
  onDetailed: () => void;
  onRecharge?: any;
  onCash?: () => void;
  walletType: number;
}

const AssetsClass = (props: Props) => {
  const styles = outerStyles();
  const [biCode, setBiCode] = useState(false);
  const onDetailed = () => {
    if (props.onDetailed) props.onDetailed();
  };

  const onTransfer = () => {
    if (props.onTransfer) props.onTransfer();
  };

  const onRecharge = () => {
    if (props.onRecharge) props.onRecharge(true);
  };

  const onCash = () => {
    if (props.onCash) props.onCash();
  };
  return props.walletType === 0 ? (
    <View style={styles.body}>
      <View style={styles.baseView}>
        <TouchableOpacity onPress={onTransfer}>
          <View style={styles.buttonView}>
            <Image style={styles.imageView} source={Imgs.icon_transfer} />
            <Text style={styles.titleText}>资产划转</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.baseView}>
        <TouchableOpacity onPress={onDetailed}>
          <View style={styles.buttonView}>
            <Image style={styles.imageView1} source={Imgs.icon_billing} />
            <Text style={styles.titleText}>账单明细</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.body}>
      <View style={styles.baseView1}>
        <TouchableOpacity style={styles.baseViewButton} onPress={onRecharge}>
          <View style={styles.buttonView1}>
            <Image style={styles.imageView1} source={Imgs.icon_into} />
            <Text style={styles.titleText}>充值</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.baseView2}>
        <TouchableOpacity onPress={onCash}>
          <View style={styles.buttonView1}>
            <Image style={styles.imageView1} source={Imgs.withdrawal} />
            <Text style={styles.titleText}>提现</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.baseView3}>
        <TouchableOpacity onPress={onDetailed}>
          <View style={styles.buttonView1}>
            <Image style={styles.imageView1} source={Imgs.icon_billing} />
            <Text style={styles.titleText}>账单明细</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.baseView4}>
        <TouchableOpacity onPress={onTransfer}>
          <View style={styles.buttonView1}>
            <Image style={styles.imageView1} source={Imgs.icon_transfer} />
            <Text style={styles.titleText}>资产划转</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssetsClass;
