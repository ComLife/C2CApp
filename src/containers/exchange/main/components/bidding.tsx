import React, { memo, useEffect, useState } from 'react';
import { AppState, Image, Text, View } from 'react-native';
import styles from './styles';
import Imgs from '../../../../const/image-set';
import Colors from '../../../../const/colors';
import { setRatio } from '../../../../utils/screen-util';
import { division, toNumber } from '../../../../utils/digital';

interface Props {
  title?: any; //背景色
  image?: any; //图片
  time?: any; //文字
  setIsCall: any;
}
let timer: any;
export default function Bidding(props: Props) {
  const { time, setIsCall } = props;

  const [timeOne, setTimeOne] = useState('');
  const [timeTwo, setTimeTwo] = useState('');
  const [isOpen2, setOpen2] = useState(true);
  const textStyle = [styles.buttonsRightText1, { color: Colors.colorA1, marginTop: setRatio(110) }];

  const countDown = () => {
    if (time) {
      let tmpOne = division(time, 1000, 0);
      let one = division(tmpOne, 60, 0);
      let two = toNumber(tmpOne) % 60;
      if (one === 0) {
        setTimeOne('00');
      } else if (one < 10 && two > 30) {
        setTimeOne('0' + (toNumber(one) - 1));
      } else if (one < 10) {
        setTimeOne('0' + one);
      } else if (two > 30) {
        setTimeOne(toNumber(one) - 1 + '');
      } else {
        setTimeOne(one + '');
      }

      if (two !== 0) {
        setTimeTwo(two + '');
      }
    }
  };

  useEffect(() => {
    if (time && isOpen2) {
      setOpen2(false);
      countDown();
    }
  }, [time]);

  const appStateListener = () => {
    AppState.addEventListener('change', newState => {
      if (newState !== null && newState.match(/inactive|background/)) {
        setOpen2(true);
        clearTimeout(timer);
      }
    });
  };

  // 监听手机切回系统后台后切回
  useEffect(() => {
    AppState.removeEventListener('change', appStateListener);
    AppState.addEventListener('change', appStateListener);
  }, []);

  useEffect(() => {
    if (timeTwo !== '') {
      timer = setTimeout(() => {
        let tmp = toNumber(timeTwo) - 1;

        if (tmp === -1) {
          let tmp1 = toNumber(timeOne) - 1;
          if (tmp1 < 10) {
            setTimeOne('0' + tmp1);
          } else {
            setTimeOne(tmp1.toString());
          }
          tmp = 59;
        } else if (tmp < 10) {
          tmp = '0' + tmp;
        }
        if (toNumber(timeTwo) === 0 && toNumber(timeOne) === 0) {
          setIsCall(false);
        }
        setTimeTwo(tmp.toString());
      }, 985);
    }
  }, [timeTwo]);

  return (
    <View style={styles.bidBg}>
      <Text style={textStyle}>交易开启倒计时</Text>
      <View style={styles.bidMidView}>
        <View style={styles.bidBox}>
          <Text style={styles.bidPointText2}>{timeOne || '00'}</Text>
        </View>
        <View style={styles.bidPoint}>
          <Text style={styles.bidPointText}>:</Text>
        </View>
        <View style={styles.bidBox}>
          <Text style={styles.bidPointText2}>{timeTwo || '00'}</Text>
        </View>
      </View>
      <View style={styles.bidMidView1}>
        <View style={styles.bidBox1}>
          <Text style={styles.bidPointText1}>MINUTES</Text>
        </View>
        <View style={styles.bidPoint} />
        <View style={styles.bidBox1}>
          <Text style={styles.bidPointText1}>SECONDS</Text>
        </View>
      </View>
      <Image style={styles.bidImage} source={Imgs.jingjia} />
    </View>
  );
}
