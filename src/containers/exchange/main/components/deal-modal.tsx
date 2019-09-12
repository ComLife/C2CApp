import React, { memo, useEffect, useRef, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'space-ui';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import Imgs from '../../../../const/image-set';
import Colors from '../../../../const/colors';

interface Props {
  onClose: any; //关闭的回调
  titleText: string; //标题文字
  dealNum?: string; //够买数量
  dealTypeText?: string; //委托类型文字
  baseCoin?: string; //基础货币
  paymentCoin?: string; //计价货币
  titleColor: string; //标题颜色
  password: string; //密码
  setPassword: any; //设置密码
  onPassword: any; //l转到资金密码
  title1?: string;
  title2?: string;
  title3?: string;
  title4?: string;
  title1Value?: string;
  title2Value?: string;
  title3Value?: string;
  title4Value?: string;
  transaction?: boolean; //是否是交易页面
}

const DealModal = memo((props: Props) => {
  const {
    onClose,
    titleText,
    dealNum,
    dealTypeText,
    baseCoin,
    paymentCoin,
    titleColor,
    password,
    setPassword,
    onPassword,
    title1,
    title2,
    title3,
    title4,
    title1Value,
    title2Value,
    title3Value,
    title4Value,
    transaction,
  } = props;
  const inputRef: any = useRef(null);
  //盘口
  // const [password, setPassword] = useState('');

  const passwordBox = () => {
    let passBoxArr = [];
    for (let i = 0; i < 6; i++) {
      passBoxArr.push(
        <View style={styles.modalFundsView1} key={i}>
          {password.length > i ? <Text style={styles.modalPassText}>*</Text> : null}
        </View>,
      );
    }
    if (password.length === 6) {
      Keyboard.dismiss();
    }
    return passBoxArr;
  };

  const onFocuse = () => {
    Keyboard.dismiss();
    if (inputRef) {
      inputRef.current && inputRef.current.blur();
      inputRef.current && inputRef.current.focus();
    }
  };

  useEffect(() => {
    passwordBox();
  }, [password]);

  const titleStyle = [styles.headerText, { color: titleColor }];

  return (
    <View style={styles.loginContainer}>
      <Animatable.View animation="fadeIn" duration={300} style={[styles.blurView, { backgroundColor: Colors.modalColor }]} />
      <Modal transparent onRequestClose={() => {}} animationType="slide">
        <View style={styles.modal}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.modalBg}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={onClose}>
                  <Image source={Imgs.icon_close} />
                </TouchableOpacity>
                <View style={styles.modalHeaderView}>
                  <Text style={titleStyle}>{titleText || '买入BTC'}</Text>
                </View>
                <View style={styles.modalHeaderView1} />
              </View>
              <View style={styles.modalLine} />
              <View style={transaction ? styles.modalMidView2 : styles.modalMidView}>
                {transaction ? (
                  <View style={styles.flexStyle}>
                    <View style={styles.modalDataView}>
                      <Text style={styles.modalLeftText}>{title1}</Text>
                      <Text style={styles.bottomItemText}>{title1Value}</Text>
                    </View>
                    <View style={styles.modalDataView}>
                      <Text style={styles.modalLeftText}>{title2}</Text>
                      <Text style={styles.bottomItemText}>{title2Value}</Text>
                    </View>
                    <View style={styles.modalDataView}>
                      <Text style={styles.modalLeftText}>{title3}</Text>
                      <Text style={styles.bottomItemText}>{title3Value}</Text>
                    </View>
                    <View style={styles.modalDataView}>
                      <Text style={styles.modalLeftText}>{title4}</Text>
                      <Text style={styles.bottomItemText}>{title4Value}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.flexStyle}>
                    <View style={styles.modalDataView}>
                      <Text style={styles.modalLeftText}>{'委托价格'}</Text>
                      <Text style={styles.bottomItemText}>{paymentCoin}</Text>
                    </View>
                    <View style={styles.modalDataView}>
                      <Text style={styles.modalLeftText}>{'委托数量'}</Text>
                      <View style={styles.modalMidView1}>
                        <Text style={styles.modalMidText1}>{dealNum}</Text>
                      </View>
                      <Text style={styles.bottomItemText}>{baseCoin}</Text>
                    </View>
                    <View style={styles.modalDataView}>
                      <Text style={styles.modalLeftText}>{'委托方式'}</Text>
                      <Text style={styles.bottomItemText}>{dealTypeText}</Text>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.modalLine1} />
              <View style={styles.modalFundsView}>
                <Text style={styles.modalLeftText}>资金密码</Text>
              </View>
              <TouchableOpacity style={styles.modalFundsFrame} onPress={onFocuse}>
                {passwordBox()}
              </TouchableOpacity>
              <View style={styles.modalPass}>
                <Text style={styles.modalPassText1} onPress={onPassword}>
                  忘记资金密码？
                </Text>
              </View>
              <TextInput ref={inputRef} onChangeText={setPassword} value={password} keyboardType="number-pad" maxLength={6} style={styles.modalPut} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
});

export default DealModal;
