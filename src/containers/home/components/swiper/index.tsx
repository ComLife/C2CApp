import React, { memo } from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ImageSet from '../../../../const/image-set';
import Config from '../../../../const/config';
import styles from './styles';
import AWS from '../../../../utils/AWS';

interface Props {
  source?: ImageSourcePropType;
  data: Record<string, string>[];
  onClick: (string: string) => void;
}

const SwipeBanner = memo((props: Props) => {
  const { data } = props;

  return (
    <View style={styles.container}>
      <Swiper
        containerStyle={styles.wrapper}
        showsButtons={false}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={[styles.dotStyle, styles.activeDotStyle]}>
        {data && data.length ? (
          data.map((item: Record<string, any>, index: number) => {
            const url: any = { uri: AWS.getBucketImage(item.resAdress) };
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.slide}
                onPress={() => {
                  props.onClick(item.linkUrl);
                }}>
                <Image defaultSource={ImageSet.banner} source={url} resizeMode={'contain'} style={styles.wrapper} />
              </TouchableOpacity>
            );
          })
        ) : (
          <TouchableOpacity activeOpacity={1} style={styles.slide}>
            <Image source={ImageSet.banner} resizeMode={'contain'} style={styles.wrapper} />
          </TouchableOpacity>
        )}
      </Swiper>
    </View>
  );
});

export default SwipeBanner;
