/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import AsyncStorage from '@react-native-community/async-storage';

/**
 * 数据持久化类
 */
export default class LocalStore {
  /**
   * 保存本地数据
   * @param key key
   * @param items value
   * @param callback  回调函数
   */
  saveLocalRepository(key: string, value: any, callback?: any) {
    if (!value || !key) return;

    AsyncStorage.setItem(key, JSON.stringify(value), callback);
  }

  /**
   * 获取本地的数据
   * @param key
   * @returns {Promise}
   */
  fetchLocalRepository(key: string) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      AsyncStorage.getItem(key, (error: any, result: string | null) => {
        if (!error) {
          try {
            if (result != null) {
              resolve(JSON.parse(result));
            } else {
              reject(result);
            }
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  /**
   * 移除本地存存的key
   * @param key
   * @returns {*}
   */
  removeLocalRepository(key: string, callback?: any) {
    if (!key) return;

    AsyncStorage.removeItem(key, callback);
  }

  /**
   * 获取数据
   * @param key 获取数据的key
   * @returns {Promise} 回调返回的Promise
   */
  fetchRepository(key: string) {
    return new Promise((resolve, reject) => {
      this.fetchLocalRepository(key)
        .then(wrapData => {
          if (wrapData) {
            // @ts-ignore
            resolve(wrapData, true);
          } else {
            this.fetchNetRepository(key)
              .then(data => {
                resolve(data);
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          this.fetchNetRepository(key)
            .then(data => {
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  /**
   * 获取网络的数据
   * @param key
   * @returns {Promise}
   */
  fetchNetRepository(key: string) {
    return new Promise((resolve, reject) => {
      fetch(key)
        .then(response => response.json())
        .then(responseData => {
          if (responseData) {
            // this.saveRepository(key, responseData);
            resolve(responseData);
          } else {
            reject(new Error('responseData is null'));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
