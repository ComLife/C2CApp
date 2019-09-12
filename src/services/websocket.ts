import ReconnectingWebSocket from 'reconnecting-websocket';
import Config from '../const/config';

export default class WebSocket {
  private readonly BINARY_TYPE = 'arraybuffer'; // arraybuffer / blob / nodebuffer
  private readonly HEART_BEAT_CHEEK_INTERVAL = 15; // 15s
  private readonly HEART_BEAT_CHEEK_DATA = 'ping';

  private static instance: WebSocket;
  private readonly rws = new ReconnectingWebSocket(Config.wsPrefix + Config.wsUrl);

  private constructor() {}

  private heartBeat() {
    this.rws.binaryType = this.BINARY_TYPE;
    setInterval(() => {
      this.rws.send(this.HEART_BEAT_CHEEK_DATA);
      // console.log('WebSocket ping', new Date());
    }, this.HEART_BEAT_CHEEK_INTERVAL * 1000);
  }

  static getInstance() {
    if (!WebSocket.instance) {
      WebSocket.instance = new WebSocket();
      WebSocket.instance.heartBeat();
    }
    return WebSocket.instance;
  }

  public close() {
    this.rws.close(1000, '克黎萎了');
    console.log('rws.close====', this.rws);
  }

  public reconnect() {
    this.rws.reconnect(1000, '克黎勃了');
    console.log('rws.reconnect====', this.rws);
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.rws.send(data);
  }

  public onMessage(callback: any) {
    this.rws.addEventListener('message', callback);
  }

  public onError(callback: any) {
    this.rws.addEventListener('error', callback);
  }
}
