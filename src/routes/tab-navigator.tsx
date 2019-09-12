import React, { useContext } from 'react';
import { BottomTabBar, BottomTabNavigatorConfig, NavigationRouteConfigMap, TabBarIconProps, createBottomTabNavigator } from 'react-navigation';
import { I18n } from '../localization/i18n';

import HomeScreen from '../containers/home/main';
import MarketScreen from '../containers/markets/main';
import ExchangeScreen from '../containers/exchange/main';
import AssetsScreen from '../containers/assets/main';
import { ThemeContext } from '../utils/theme-color';
import ImageSet from '../const/image-set';
import TabBarIcon from './tab-bar-icon';
import Homepage from '../components/home-page/Homepage';

const routeConfigMap: NavigationRouteConfigMap = {
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      tabBarIcon: (props: TabBarIconProps) => {
        const source = props.focused ? ImageSet.tab1_selected : ImageSet.tab1;
        return <TabBarIcon source={source} title={I18n.t('tab.home')} {...props} />;
      },
    }),
  },
  Market: {
    screen: MarketScreen,
    navigationOptions: () => ({
      tabBarIcon: (props: TabBarIconProps) => {
        const source = props.focused ? ImageSet.tab2_selected : ImageSet.tab2;
        return <TabBarIcon source={source} title={I18n.t('tab.market')} {...props} />;
      },
    }),
  },
  Exchange: {
    screen: ExchangeScreen,
    navigationOptions: () => ({
      tabBarIcon: (props: TabBarIconProps) => {
        const source = props.focused ? ImageSet.tab3_selected : ImageSet.tab3;
        return <TabBarIcon source={source} title={I18n.t('tab.transaction')} {...props} />;
      },
    }),
  },
  Assets: {
    screen: AssetsScreen,
    navigationOptions: () => ({
      tabBarIcon: (props: TabBarIconProps) => {
        const source = props.focused ? ImageSet.tab4_selected : ImageSet.tab4;
        return <TabBarIcon source={source} title={I18n.t('tab.assets')} {...props} />;
      },
    }),
  },
};

const drawConfig: BottomTabNavigatorConfig = {
  initialRouteName: 'Home',
  navigationOptions: {},
  tabBarPosition: 'bottom',
  lazy: true,
  tabBarComponent: props => <Homepage {...props} />,
  // tabBarComponent: props => {
  //   // @ts-ignore
  //   const { backColor, textColor } = useContext(ThemeContext);
  //   const tabBarStyle = { borderTopColor: textColor, backgroundColor: backColor };
  //   return <Homepage {...props} style={tabBarStyle} />;
  // },
  backBehavior: 'initialRoute',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#256fe9',
    inactiveTintColor: '#bfbfbf',
    // labelStyle: {
    //   fontSize: 22,
    // },
    style: {
      backgroundColor: 'blue',
    },
  },
};

export default createBottomTabNavigator(routeConfigMap, drawConfig);
