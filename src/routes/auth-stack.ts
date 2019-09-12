import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../containers/login-register/login';
import RegisterScreen from '../containers/login-register/register';
import ForgotPasswordScreen from '../containers/login-register/forgot-password';
import CapitalPwdInitScreen from '../containers/login-register/capital-pwdinit';
import WelcomeScreen from '../containers/welcome';

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null } },
  Register: { screen: RegisterScreen, navigationOptions: { header: null } },
  ForgotPassword: { screen: ForgotPasswordScreen, navigationOptions: { header: null } },
  CapitalPwdInit: { screen: CapitalPwdInitScreen, navigationOptions: { header: null } },
  Welcome: { screen: WelcomeScreen, navigationOptions: { header: null, gesturesEnabled: false } },
});

export default AuthStack;
