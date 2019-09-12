/**
 * Request
 */

const isBlank = (string: string | null) => string == null || !/\S/.test(string);

const notBlank = (string: string | null) => !isBlank(string);

const parseHeaders = (xhr: any) =>
  (xhr.getAllResponseHeaders() || '')
    .split(/\r?\n/)
    .filter(notBlank)
    .reduce((headers: any, headerString: any) => {
      const header = headerString.split(':')[0];
      headers[header] = xhr.getResponseHeader(header);
      return headers;
    }, {});
//@ts-ignore
const buildResponseObject = xhr => {
  let headers = {};
  try {
    headers = parseHeaders(xhr);
  } catch (e) {
    console.log(e);
  }
  return {
    status: xhr.status,
    text: xhr.responseText,
    headers,
  };
};

const buildResponseHandler = (xhr: any, resolve: any, reject: any) => () => {
  const fn = xhr.status === 0 ? reject : resolve;
  fn(buildResponseObject(xhr));
};
//@ts-ignore
const decorateProgressFn = fn => e => {
  e.percent = e.loaded / e.total;
  return fn(e);
};

export class Request {
  //@ts-ignore
  static create(...args) {
    //@ts-ignore
    return new this(...args);
  }
  //@ts-ignore
  constructor(url, method, attrs = {}, headers = {}) {
    //@ts-ignore
    this._xhr = new Request.XMLHttpRequest();
    //@ts-ignore
    this._formData = new Request.FormData();
    //@ts-ignore
    this._xhr.open(method, url);
    //@ts-ignore
    this._promise = new Promise((resolve, reject) => {
      //@ts-ignore
      this._xhr.onload = buildResponseHandler(this._xhr, resolve, reject);
      //@ts-ignore
      this._xhr.onerror = buildResponseHandler(this._xhr, resolve, reject);
    });
    //@ts-ignore
    Object.keys(attrs).forEach(k => this.set(k, attrs[k]));
    //@ts-ignore
    Object.keys(headers).forEach(k => this.header(k, headers[k]));
  }

  header(key: any, value: any) {
    //@ts-ignore
    this._xhr.setRequestHeader(key, value);
    return this;
  }

  set(key: any, value: any) {
    //@ts-ignore
    this._formData.append(key, value);
    return this;
  }

  send() {
    //@ts-ignore
    this._xhr.send(this._formData);
    return this;
  }

  abort() {
    //@ts-ignore
    this._xhr.abort();
    return this;
  }
  //@ts-ignore
  progress(fn) {
    //@ts-ignore
    if (this._xhr.upload) {
      //@ts-ignore
      this._xhr.upload.onprogress = decorateProgressFn(fn);
    }
    return this;
  }
  //@ts-ignore
  then(...args) {
    //@ts-ignore
    this._promise = this._promise.then(...args);
    return this;
  }
  //@ts-ignore
  catch(...args) {
    //@ts-ignore
    this._promise = this._promise.catch(...args);
    return this;
  }
}
//@ts-ignore
Request.FormData = FormData;
//@ts-ignore
Request.XMLHttpRequest = XMLHttpRequest;
