import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import { screenWidth, setRatio } from '../../../../utils/screen-util';

interface Props {
  level: number;
  dataString1?: string;
  dataString2?: string;
  dataString3?: string;
}

const AuthenticationHeader = ({ level, dataString1, dataString2, dataString3 }: Props) => {
  const styles = outerStyles();
  const style1 = level < 0 ? { opacity: 0.7 } : null;
  const style10 = level < 1 ? { opacity: 0.1 } : null;
  const style11 = level < 1 ? { opacity: 0.5 } : null;
  const style12 = level < 1 ? { opacity: 0.7 } : null;
  const style20 = level < 2 ? { opacity: 0.1 } : null;
  const style21 = level < 2 ? { opacity: 0.5 } : null;
  const style22 = level < 2 ? { opacity: 0.7 } : null;
  return (
    <View style={[styles.container]}>
      <View style={styles.viewChild}>
        {level === 0 ? (
          <View style={[styles.bigcircular, { marginLeft: setRatio(70) }]}>
            <View style={[styles.bigsmallcircular]} />
          </View>
        ) : (
          <View style={[level === -1 ? styles.smallcircular1 : styles.smallcircular, { marginLeft: setRatio(80), marginTop: setRatio(10) }]} />
        )}

        <View style={[styles.line, level === 3 || level === 2 || level === -1 ? { width: (screenWidth - setRatio(190)) / 2 } : null, style10]} />

        {level === 1 ? (
          <View style={styles.bigcircular}>
            <View style={[styles.bigsmallcircular]} />
          </View>
        ) : (
          <View style={[styles.smallcircular, style11, { marginTop: setRatio(10) }]} />
        )}

        <View style={[styles.line, level === 3 || level === 0 || level === -1 ? { width: (screenWidth - setRatio(190)) / 2 } : null, style20]} />

        {level === 2 ? (
          <View style={styles.bigcircular}>
            <View style={[styles.bigsmallcircular]} />
          </View>
        ) : (
          <View style={[styles.smallcircular, style21, { marginTop: setRatio(10) }]} />
        )}
      </View>
      <View style={styles.textView}>
        <View style={styles.textView1}>
          <Text style={[styles.topText, style1]}>{dataString1}</Text>
        </View>
        <View style={[styles.textView1, { width: screenWidth - setRatio(340) }]}>
          <Text style={[styles.topText, style12]}>{dataString2}</Text>
        </View>
        <View style={styles.textView1}>
          <Text style={[styles.topText, style22]}>{dataString3}</Text>
        </View>
      </View>
    </View>
  );
};

export default AuthenticationHeader;
