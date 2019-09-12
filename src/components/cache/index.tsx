import React, { Fragment, useEffect } from 'react';
import DelayStore from '../../utils/delay-store';
import { DispatchProps, StateProps } from './interface';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';

const Cache = (props: DispatchProps) => {
  const cacheInterval = () => {
    let time = new Date().valueOf();
    setInterval(() => {
      let newTime = new Date().valueOf();
      let diff = newTime - time;
      time = newTime;
      // 处理时间差
      for (let key in DelayStore.chacheData) {
        // @ts-ignore
        const cache = DelayStore.chacheData[key];
        cache.waitTime -= diff;
        if (cache.waitTime < 0) {
          cache.waitTime = cache.interval;
          let data = cache.data;
          if (data.length > 0) {
            if (cache.isArray) {
              // 数组方式取数据 todo
              // props.dispatch({ type: data.msgType, payload: data });
              // cache.data = [];
            } else {
              // 覆盖方式 取数据
              let lastData = data[data.length - 1];
              props.storeState(lastData.msgType, lastData);
            }
            cache.data = [];
          }
        }
      }
    }, 10);
  };
  useEffect(() => {
    cacheInterval();
  }, []);
  return <Fragment></Fragment>;
};

const mapStateToProps = (state: StateProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cache);
