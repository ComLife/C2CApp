import { NavigationRouteConfigMap, createStackNavigator } from 'react-navigation';

import TabNavigator from './tab-navigator';
import MarketSearchScreen from '../containers/markets/search';
import ExchangeDetailsScreen from '../containers/exchange/details';
import AuthenticationScreen from '../containers/settings/authentication';
import AuthenticationIntermediateScreen from '../containers/settings/authentication/authentication-intermediate';
import AuthenticationPrimaryScreen from '../containers/settings/authentication/authentication-primary';
import AuthenticationSeniorScreen from '../containers/settings/authentication/authentication-senior';
import AssetsTransferScreen from '../containers/assets/main/assets-transfer';
import GestureScreen from '../containers/assets/login-mode/gesture';
import PersonalCenter from '../containers/assets/personal-center';
import HelpCenter from '../containers/assets/personal-center/help-center';
import CapitalPwdScreen from '../containers/capital-pwd';
import CapitalPwdInitScreen from '../containers/login-register/capital-pwdinit';
import GoogleAuthScreen from '../containers/google-auth';
import AssetsWithDrawalScreen from '../containers/assets/main/assets-withdrawal';
import ChooseCoinScreen from '../components/choose-coin';
import TradingRecordScreen from '../containers/exchange/trading-record';
import AssetsQrScannerScreen from '../containers/assets/main/assets-withdrawal/assets-qr-scanner';
import AccountDetails from '../containers/assets/account-details';
import TradingDetailScreen from '../containers/exchange/trading-record/trading-detail';
import HelpScreen from '../containers/assets/personal-center/help-center/help';
import Internationalization from '../containers/login-register/Internationalization';
import ChartFullScreen from '../containers/exchange/details/chart-full-screen';

const routeConfigMap: NavigationRouteConfigMap = {
  TabHome: { screen: TabNavigator, navigationOptions: { header: null, headerBackTitle: '返回' } },
  MarketSearch: { screen: MarketSearchScreen, navigationOptions: { header: null, title: '行情搜索' } },
  ExchangeDetails: { screen: ExchangeDetailsScreen, navigationOptions: { header: null, note: '交易详情' } },
  Gesture: { screen: GestureScreen, navigationOptions: { header: null } },
  Authentication: { screen: AuthenticationScreen, navigationOptions: { header: null } },
  AuthenticationIntermediate: { screen: AuthenticationIntermediateScreen, navigationOptions: { header: null, title: '中级认证' } },
  AuthenticationPrimary: { screen: AuthenticationPrimaryScreen, navigationOptions: { header: null } },
  AuthenticationSenior: { screen: AuthenticationSeniorScreen, navigationOptions: { header: null, title: '高级认证' } },
  PersonalCenter: { screen: PersonalCenter, navigationOptions: { header: null } },
  HelpCenter: { screen: HelpCenter, navigationOptions: { header: null } },
  CapitalPwd: { screen: CapitalPwdScreen, navigationOptions: { header: null } },
  CapitalPwdInit: { screen: CapitalPwdInitScreen, navigationOptions: { header: null } },
  GoogleAuth: { screen: GoogleAuthScreen, navigationOptions: { header: null } },
  AssetsTransfer: { screen: AssetsTransferScreen, navigationOptions: { header: null, title: '资金划转' } },
  AssetsWithDrawal: { screen: AssetsWithDrawalScreen, navigationOptions: { header: null } },
  ChooseCoin: { screen: ChooseCoinScreen, navigationOptions: { header: null, gesturesEnabled: false } },
  TradingRecord: { screen: TradingRecordScreen, navigationOptions: { header: null, title: '交易记录' } },
  AssetsQrScanner: { screen: AssetsQrScannerScreen, navigationOptions: { header: null } },
  TradingDetail: { screen: TradingDetailScreen, navigationOptions: { header: null } },
  AccountDetails: { screen: AccountDetails, navigationOptions: { header: null } },
  Help: { screen: HelpScreen, navigationOptions: { header: null } },
  Internationalization: { screen: Internationalization, navigationOptions: { header: null } },
  ChartFullScreen: { screen: ChartFullScreen, navigationOptions: { header: null } },
};

const switchConfig = {
  // containerOptions: {
  //   backgroundColor: 'red',
  // },
  initialRouteName: 'TabHome',
};

export default createStackNavigator(routeConfigMap, switchConfig);
