import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Imgs from '../const/image-set';
import { setRatio, setText } from '../utils/screen-util';

interface Props {
  title?: string;
  onClick?: Function;
}

const outerStyles = () => {
  return StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: setRatio(90),
      paddingHorizontal: 10,
      justifyContent: 'space-between',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    backTouch: {
      width: setRatio(70),
      height: setRatio(70),
    },
    // eslint-disable-next-line react-native/no-unused-styles
    backViewTouch: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    title: {
      fontSize: setText(30),
      fontWeight: 'bold',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    centerView: {
      position: 'absolute',
      right: 50,
      left: 50,
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });
};

const Header = (props: Props) => {
  const { title, onClick } = props;
  const styles = outerStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backTouch} onPress={() => onClick && onClick()}>
        <View style={styles.backViewTouch}>
          <Image source={Imgs.back} />
        </View>
      </TouchableOpacity>
      <View style={styles.centerView}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
