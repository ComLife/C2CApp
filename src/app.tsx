/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import KillApp from 'react-native-kill-app';
import CodePush, { SyncOptions } from 'react-native-code-push';
import { store } from './redux/store';
import AppNavigator from './routes/app-navigator';
import { ThemeContext, ThemeSet } from './utils/theme-color';
import OpenTouchId from './containers/assets/login-mode/open-touch-id';
import { Toast } from './components/EasyToast/toast';
import Cache from './components/cache';

const App = () => {
  SplashScreen.hide();
  // @ts-ignore
  const [theme, setTheme] = useState(store.getState().appConfig.theme);
  const [isDownloaded, setDownloaded] = useState(false);
  const [navRef, setNavRef] = useState(null);

  store.subscribe(() => {
    // @ts-ignore
    setTheme(store.getState().appConfig.theme);
  });

  const getRef = (ref: any) => {
    if (ref) {
      const { _navigation } = ref;
      setNavRef(_navigation);
    }
  };

  const appStateListener = (newState: AppStateStatus) => {
    if (newState === 'background' && isDownloaded) {
      KillApp.exitApp();
    }
  };

  // 监听手机切回系统后台后切回
  useEffect(() => {
    AppState.removeEventListener('change', appStateListener);
    AppState.addEventListener('change', appStateListener);
  }, []);

  useEffect(() => {
    const options: SyncOptions = { installMode: CodePush.InstallMode.ON_NEXT_RESTART };
    CodePush.sync(options, status => {
      if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
        setDownloaded(true);
      }
    });
  }, []);

  // @ts-ignore
  const themeValue = ThemeSet[theme];
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={themeValue}>
        <AppNavigator ref={getRef} />
        {navRef !== null ? <OpenTouchId nav={navRef} /> : null}
        <Cache />
        <Toast />
      </ThemeContext.Provider>
    </Provider>
  );
};

export default CodePush()(App);
