import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'appConfig', // 语言、主题信息
    'userInfo', // 登录信息
    'paymentCurrencys', // 计价货币种类
    'increaseTopReply', // 首页涨幅榜
    'localCollection', // 本地收藏的自选交易对
  ],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunkMiddleware];

if (__DEV__) {
  const logger = require('redux-logger').createLogger({
    collapsed: true,
    diff: false,
    duration: false,
  });
  middleware.push(logger);
}

export const store = createStore(persistedReducer, applyMiddleware(...middleware));

persistStore(store);
