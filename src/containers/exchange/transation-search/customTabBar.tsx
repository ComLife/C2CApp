import React, { memo } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Diving: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e7ea',
  },
});

const CustomTabBar = memo((props: any) => {
  const ButtonAndroid = (props: any) => (
    <TouchableNativeFeedback delayPressIn={0} background={TouchableNativeFeedback.SelectableBackground()} {...props}>
      {props.children}
    </TouchableNativeFeedback>
  );

  const ButtonIos = (props: any) => <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;

  const renderTab = (name: string, page: number, isTabActive: boolean, onPressHandler: any) => {
    const textColor = isTabActive ? props.activeColor : props.inactiveColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const textStyle = props.textStyle;
    const Button = Platform.OS === 'ios' ? ButtonIos : ButtonAndroid;

    return (
      <Button
        style={styles.buttonView}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}>
        <View style={styles.buttonView}>
          <Text style={[{ color: textColor, fontWeight }, { ...textStyle }]}>{name}</Text>
        </View>
      </Button>
    );
  };

  const renderUnderline = () => {
    const containerWidth = (props.style && props.style.width) || props.containerWidth;
    const numberOfTabs = props.tabs.length;
    const underlineWidth = props.tabUnderlineDefaultWidth ? props.tabUnderlineDefaultWidth : containerWidth / (numberOfTabs * 2);
    const scale = props.tabUnderlineScaleX ? props.tabUnderlineScaleX : 3;
    const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underlineWidth,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#248aef',
      bottom: 0,
      left: deLen,
    };

    const translateX = props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });

    const scaleValue = (defaultScale: any) => {
      const arr = new Array(numberOfTabs * 2);
      return arr.fill(0).reduce(
        function(pre, cur, idx) {
          idx === 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
          idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1);
          return pre;
        },
        { inputRange: [], outputRange: [] },
      );
    };

    const scaleX = props.scrollValue.interpolate(scaleValue(scale));

    return (
      <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [{ translateX }, { scaleX }],
          },
          props.underlineStyle,
        ]}
      />
    );
  };

  const createTab = () => {
    return props.tabs.map((name: any, page: any) => {
      const isTabActive = props.activeTab === page;
      return renderTab(name, page, isTabActive, props.goToPage);
    });
  };

  return (
    <View style={[styles.tabs, { backgroundColor: props.backgroundColor }, props.style, props.isShowLine ? styles.Diving : null]}>
      {createTab()}
      {renderUnderline()}
    </View>
  );
});

export default CustomTabBar;
