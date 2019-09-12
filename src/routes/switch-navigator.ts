import { NavigationRouteConfigMap, SwitchNavigatorConfig, createSwitchNavigator } from 'react-navigation';
import SplashScreen from '../containers/splash';
import StackNavigator from './stack-navigator';
import AuthStack from './auth-stack';

const routeConfigMap: NavigationRouteConfigMap = {
  Splash: { screen: SplashScreen },
  Frame: { screen: StackNavigator },
  Auth: { screen: AuthStack },
};

const switchConfig: SwitchNavigatorConfig = {
  initialRouteName: 'Splash',
};

export default createSwitchNavigator(routeConfigMap, switchConfig);
