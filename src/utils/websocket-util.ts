// @ts-ignore
import { calculateUTF16asUTF8, decodeUTF8toUTF16, encodeUTF16toUTF8 } from 'utfx';

import Config from '../const/config';

const stringSource = (s: string) => {
  let i = 0;
  return () => (i < s.length ? s.charCodeAt(i++) : null);
};

const stringToArrayBuffer = (str: string) => {
  let offset = 4;
  const strCodes = stringSource(str);
  let length = calculateUTF16asUTF8(strCodes)[1];
  let view = new DataView(new ArrayBuffer(length + 4));
  view.setUint32(0, length);

  encodeUTF16toUTF8(stringSource(str), (char: number) => view.setUint8(offset++, char));
  return view;
};

const arrayBufferToString = (view: DataView) => {
  let len = view.byteLength;
  let offset = 0;
  let result: any = [];

  decodeUTF8toUTF16(() => (offset < len ? view.getUint8(offset++) : null), (char: number) => result.push(char));

  return result.reduce((prev: string, next: number) => prev + String.fromCharCode(next), '');
};

export const str2ab = (str: string) => {
  return stringToArrayBuffer(str);
};

export const json2ab = (value: Record<string, any>) => {
  try {
    return str2ab(JSON.stringify(value));
  } catch (e) {
    console.warn('json2ab======', e);
    return new ArrayBuffer(0);
  }
};

export const ab2str = (buffer: ArrayBufferLike) => {
  return arrayBufferToString(new DataView(buffer));
};

export const ab2json = (buffer: ArrayBufferLike) => {
  try {
    return JSON.parse(ab2str(buffer));
  } catch (e) {
    console.warn('ab2json======', e);
    return {};
  }
};

export const sendWrapper = (input: Record<string, any>) => {
  const originData: Record<string, any> = { token: Config.headers.token, terminal: 1, deviceNo: Config.headers.deviceid, ...input };
  console.log('Websocket send =====', originData.msgType, originData);
  return json2ab(originData);
};
