import React, { useCallback, useMemo } from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet, Text, TextStyle, View } from 'react-native';
import { TabBarIconProps } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

interface Props {
  title: string;
  source: ImageSourcePropType;
}

export default function TabBarIcon(props: TabBarIconProps & Props) {
  // const springValue = useMemo(() => {
  //   return new Animated.Value(1);
  // }, []);

  // const springAnimated = useMemo(() => {
  //   return Animated.spring(springValue, { toValue: 1, friction: 4, tension: 100, useNativeDriver: true });
  // }, []);
  //
  // const startAnimated = useCallback(() => {
  //   springValue.setValue(0.8);
  //   springAnimated.start();
  // }, []);
  //
  let imgStyle = { width: 20, height: 20 };
  if (props.focused) {
    useMemo(() => {
      // startAnimated();
      imgStyle = { width: 20, height: 20 };
    }, undefined);
  }

  const textStyle: TextStyle = { color: props.tintColor || '', marginTop: 5 };

  return (
    <View style={styles.container}>
      {/*<Animated.Image source={props.source} style={imgStyle} {...props} />*/}
      <Image source={props.source} style={imgStyle} />
      <Text style={textStyle}>{props.title}</Text>
    </View>
  );
}
