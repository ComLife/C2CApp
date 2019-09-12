import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button, DivisorLine, TextInput } from 'space-ui';
import outerStyles from '../styles';
import Colors from '../../../../const/colors';
import { setRatio } from '../../../../utils/screen-util';
import { useNavigation } from '../../../../routes/navigation-service';
import { EasyToast } from '../../../../components/EasyToast/toast';

interface Props {
  onClose?: any; //取消
  type?: string; //样式(判断是转入还是直接打开)
  userInfo?: any;
  dispatchRemoveCode?: any;
  dispatchSafeCode?: any;
  removeLoginCode?: any;
}

const VerificationItem = (props: Props) => {
  const styles = outerStyles();

  const { navigate } = useNavigation();

  const { onClose, type, userInfo, dispatchRemoveCode, dispatchSafeCode, removeLoginCode } = props;
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo.code === '1') {
      dispatchRemoveCode();
      removeLoginCode();
      onClose(type);
      if (type === '1') {
        setTimeout(() => {
          navigate('Gesture', type);
        }, 100);
      }
    } else if (userInfo.safeCode !== '') {
      EasyToast.show(userInfo.safeMsg);
    }
  }, [userInfo]);

  const changeView = () => {
    if (userInfo) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      dispatchSafeCode({ phone: userInfo.data.userName, password: password, token: userInfo.data.token, encrypt_flag: false });
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Animatable.View animation="fadeIn" duration={300} style={[styles.blurView, { backgroundColor: Colors.modalColor }]} />
      <Modal transparent onRequestClose={() => onClose} animationType="slide">
        <View style={styles.modal}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.titleView2}>
              <View style={styles.titleView}>
                <Text style={styles.loginText}>安全验证</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    onClose('');
                  }}>
                  <Text style={styles.loginText1}>取消</Text>
                </TouchableOpacity>
              </View>
              <DivisorLine style={styles.lineDiv} />
              <View style={styles.titleView}>
                <TextInput
                  style={styles.input}
                  placeholder="请输入登录密码"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor={Colors.secondTextColor}
                />
              </View>
              <DivisorLine style={styles.lineDiv} />
              <View style={styles.titleView1}>
                <Button onPress={changeView} disabled={!password} style={styles.loginBtn} textStyle={styles.loginText1} borderRadius={setRatio(5)}>
                  确定
                </Button>
              </View>
            </View>
            <View style={{ backgroundColor: Colors.whiteColor }} />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default VerificationItem;
