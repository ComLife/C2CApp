import React, { memo, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import outerStyles from './styles';
import { SafeAreaView, TextInput } from 'space-ui';
import UIColor, { default as Colors } from '../../../const/colors';
import ImageSet from '../../../const/image-set';
import ChooseSearch from './chooseSearch';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import { connect } from 'react-redux';
import CustomTabBar from './customTabBar';
import Modal from 'react-native-modal';
import { createSelector } from 'reselect';
import NoDataHolder from '../../../components/no-data';

interface Props {
  onClosePress?: any;
}
const TransationSearch = memo((props: any) => {
  // console.log('TransationSearch=', props);

  const styles = outerStyles();
  const { onClosePress } = props;
  const [showTab, setShowTab] = useState(true);
  const [searchText, setSearchText] = useState('');

  const changeTab = (tab: any) => {
    let msgData = null;
    if (tab.unique === 'k1') {
      msgData = {
        msgType: 'switch_to_collection',
        msgData: { collectionCodes: '' },
      };
    } else {
      msgData = {
        msgType: 'change_payment_currency',
        msgData: { paymentCurrency: tab.title },
      };
    }
    WebSocket.getInstance().send(sendWrapper(msgData));
  };

  useEffect(() => {}, [props.marketDataList]);

  const searchItem = (searchArr: any, searText: string) => {
    const seatchArrCopy: any = [];
    if (searText) {
      searchArr.forEach((item: any) => {
        if (item.baseCurrency.indexOf(searText) !== -1) {
          seatchArrCopy.push(item);
        }
      });
      return seatchArrCopy;
    } else {
      return searchArr;
    }
  };

  const onRenderScene = () => {
    return props.routes.map((item: any) => {
      const list = item.key === 'k1' ? props.collDataList : props.marketDataList;
      const searchDataArr = searchItem(list, searchText);
      return <ChooseSearch key={item.key} tabLabel={item.title} unique={item.key} title={item.title} marketList={searchDataArr} onClosePress={onClosePress} />;
    });
  };

  const onChangeText = (text: string) => {
    const searchStr = text.toUpperCase();
    setSearchText(searchStr);
  };

  const setShow = () => {
    setShowTab(false);
  };
  console.log('TransationSearch is running', props.routes);
  return (
    <Modal
      isVisible={showTab}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={styles.modalStyle}
      onModalHide={onClosePress}
      avoidKeyboard={false}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      onBackdropPress={setShow}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.searchView}>
            <Image source={ImageSet.icon_search} style={styles.searchImg} />
            <TextInput placeholder={'请输入币种'} style={styles.input} onChangeText={onChangeText} value={searchText} />
          </View>
          {props.routes.length > 0 ? (
            <ScrollableTabView
              initialPage={0}
              onChangeTab={(tab: any) => changeTab(tab.ref.props)}
              renderTabBar={() => (
                <CustomTabBar
                  isShowLine={true}
                  backgroundColor={UIColor.whiteColor}
                  tabUnderlineDefaultWidth={20}
                  tabUnderlineScaleX={3}
                  activeColor={UIColor.colorB1}
                  inactiveColor={UIColor.colorB2}
                />
              )}>
              {onRenderScene()}
            </ScrollableTabView>
          ) : (
            <NoDataHolder />
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
});

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.marketListInfo,
    (state: Record<string, any>) => state.paymentCurrencys,
    (state: Record<string, any>) => state.collectionList,
  ],
  (marketListInfo, paymentCurrencys, collectionList = {}) => {
    const marketDataList = marketListInfo.msgData || [];
    const collDataList = collectionList.msgData || [];
    // const routes = [{ key: 'k1', title: '自选', accessibilityLabel: '自选' }];
    const routes: any = [];
    if (Array.isArray(paymentCurrencys.msgData)) {
      paymentCurrencys.msgData.forEach((item: string, index: number) => {
        routes.push({ key: `k${index + 2}`, title: item, accessibilityLabel: item });
      });
    }
    return {
      marketDataList,
      collDataList,
      routes,
    };
  },
);

export default connect(
  mapStateToProps,
  null,
)(TransationSearch);
