import React, { useEffect, useState } from 'react';
import { AppState, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import TocComponents from './components/top-components';
import MessageComponent from './components/message-component';
import outerStyles from './styles';
import { showTouchID } from './check-touch';
import LocalStore from '../../../utils/local-store';

export interface Props {
  navigate: any;
  touchIdLogin: any;
  isOne: boolean;
  setIsOne: any;
}

function TouchId(props: any) {
  const styles = outerStyles();
  const { navigation, touchIdLogin, isOne, setIsOne } = props;
  const [touchText, setTouchText] = useState('点击唤起指纹验证');

  const onTouchpull = () => {
    setTimeout(() => {
      showTouchID();
    }, 200);
  };

  useEffect(() => {
    new LocalStore().fetchLocalRepository('touch').then(res => {
      if (res !== '-1') {
        if (res === '1') {
          setTouchText('点击唤起指纹验证');
        } else if (res === '2') {
          setTouchText('点击唤起人脸验证');
        }
        if (isOne) {
          onTouchpull();
          setIsOne(false);
        }
      }
    });
  }, []);

  const onClose = () => {
    navigation.navigate('Login');
    touchIdLogin(false, '000');
  };

  return (
    <View style={styles.bg}>
      <SafeAreaView style={styles.container}>
        <TocComponents isShowLeftTitle={true} onPressLeft={onClose} />
        <MessageComponent isTouchOpen={true} touchFunc={onTouchpull} touchText={touchText} />
      </SafeAreaView>
    </View>
  );
}

export default TouchId;
