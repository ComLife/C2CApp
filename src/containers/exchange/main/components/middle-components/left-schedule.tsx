import React, { memo, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, moreHeight, setRatio } from '../../../../../utils/screen-util';
// @ts-ignore
import Slider from 'react-native-slider';
import styles from './styles';
import Imgs from '../../../../../const/image-set';

interface Props {
  sliderValue?: any; //滑动的值
  setSliderValue?: any; //设置滑动的值
  imageTrack?: any; //滑动条图片
  imageThumb?: any; //滑动块图片
  setIsSchedule: any;
}

const LeftSchedule = memo((props: Props) => {
  const { imageTrack, imageThumb, sliderValue, setSliderValue, setIsSchedule } = props;
  const [widthValue, setWidthValue] = useState(setRatio(0));
  const [isAndroid, setIsAndroid] = useState(true);

  const slide = (value: number) => {
    //计算
    const tmpValue = value * setRatio(3.2);
    setWidthValue(tmpValue);
  };

  const tmpSlider = DEVICE_WIDTH > 550 ? [styles.slider, { marginTop: 15 }] : styles.slider;

  const endSlide = (value: number) => {
    setSliderValue(value);
    setIsSchedule(true);
  };

  useEffect(() => {
    slide(sliderValue);
  }, [sliderValue]);

  useEffect(() => {
    if (DEVICE_WIDTH > 580) {
      setIsAndroid(false);
    }
  }, []);

  //console.log('DEVICE_WIDTH', moreHeight, setRatio(230), setRatio(396), setRatio(70), setRatio(50), toNumber(tmpEventY));
  const slider2 = [styles.slider2, { width: widthValue }];

  return (
    <View style={styles.scheduleBg}>
      <View style={styles.scheduleBg2}>
        <View style={styles.slider1}>
          {isAndroid ? (
            <Image source={Imgs.img_progress} style={{ width: setRatio(320) }} resizeMode={'contain'} />
          ) : (
            <Image source={Imgs.img_progress} style={{ width: setRatio(320) }} />
          )}
        </View>
        <View style={styles.slider2}>
          <View style={slider2}>
            {isAndroid ? (
              <Image style={{ width: setRatio(320) }} source={imageTrack || Imgs.img_progress_1} resizeMode={'contain'} />
            ) : (
              <Image style={{ width: setRatio(320) }} source={imageTrack || Imgs.img_progress_1} />
            )}
          </View>
        </View>
        <Slider
          style={tmpSlider}
          thumbTintColor={'rgba(0, 0, 0,0)'}
          thumbImage={imageThumb || Imgs.img_drag_1}
          thumbStyle={styles.sliderThumb}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={sliderValue}
          minimumTrackTintColor={'rgba(0, 0, 0,0)'}
          maximumTrackTintColor={'rgba(0, 0, 0,0)'}
          onValueChange={(value: number) => slide(value)}
          onSlidingComplete={(value: number) => endSlide(value)}
        />
      </View>
      <View style={styles.sliderView}>
        <Text
          style={styles.rightHeaderText}
          onPress={() => {
            endSlide(0);
            slide(0);
          }}>
          0%
        </Text>
        <Text
          style={styles.rightHeaderText}
          onPress={() => {
            endSlide(25);
            slide(25);
          }}>
          25%
        </Text>
        <Text
          style={styles.rightHeaderText}
          onPress={() => {
            endSlide(50);
            slide(50);
          }}>
          50%
        </Text>
        <Text
          style={styles.rightHeaderText}
          onPress={() => {
            endSlide(75);
            slide(75);
          }}>
          75%
        </Text>
        <Text
          style={styles.rightHeaderText}
          onPress={() => {
            endSlide(100);
            slide(100);
          }}>
          100%
        </Text>
      </View>
    </View>
  );
});

export default LeftSchedule;
