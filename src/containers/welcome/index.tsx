import React, { Fragment, memo, useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import ImageSet from '../../const/image-set';
import { useNavigation } from '../../routes/navigation-service';
import { CHANGE_INSTALLED } from '../../redux/action-types';
import { DispatchProps, Props, StateProps } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';
import styles from './styles';

const SwipeBanner = memo((props: DispatchProps & Props & StateProps) => {
  const { navigate } = useNavigation();
  const [indexPage, setIndexPage] = useState(false);

  const goHome = () => {
    navigate('Frame');
  };

  const pageClick = (index: number) => {
    if (index >= 2) {
      setIndexPage(true);
    } else {
      setIndexPage(false);
    }
  };

  useEffect(() => {
    props.storeState(CHANGE_INSTALLED, 'yes');
  }, []);

  return (
    <Fragment>
      <Swiper
        containerStyle={styles.container}
        showsButtons={false}
        loop={false}
        onIndexChanged={(index: number) => pageClick(index)}
        paginationStyle={styles.paginationStyle} //小圆点的位置：距离底部10px
        dotStyle={styles.dotStyle}
        activeDotStyle={[styles.dotStyle, styles.activeDotStyle]}>
        <Image source={ImageSet.guide_1} style={styles.container} />
        <Image source={ImageSet.guide_2} style={styles.container} />
        <Image source={ImageSet.guide_3} style={styles.container} />
      </Swiper>
      {indexPage ? (
        <TouchableOpacity style={styles.expenClick} onPress={goHome}>
          <Image source={ImageSet.experience} />
        </TouchableOpacity>
      ) : null}
    </Fragment>
  );
});

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.appConfig],
  appConfig => {
    return {
      isInstalled: appConfig.isInstalled,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwipeBanner);
