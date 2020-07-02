import io, {Socket as Client} from 'socket.io-client';

export class SocketClient {
  private seq: number;
  url: string;
  socket: typeof Client;

  /**
   *
   * @param {String} [url] socket启动地址，例如 http://10.66.95.54:3000'，如果是移动端代理，记得要写IP，而不能够使用 localhost 或者 127.0.0.1 这种
   */
  constructor(url: string) {
    this.url = url || 'http://local.mockstarjs.org';

    this.socket = io(this.url);

    // 序列号，用于识别不同的事件
    this.seq = 0;

    this.init();
  }

  init(): void {
    this.socket.on('connect', () => {
      console.log('connect ' + this.socket.id + ' for ' + this.url);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect ' + this.socket.id);
    });
  }

  isConnected(): boolean {
    return this.socket.connected;
  }

  getURI(): string {
    return (this.socket.io && this.socket.io.uri) || '';
  }

  /**
   * 监听某个桩数据回调
   * @param {String} route 路由
   * @param {Function} callback 回调，接受一个参数：data（结果）
   */
  on(route: string, callback: (data: any) => void): void {
    this.socket.on(route, (data: any) => {
      console.log('[SocketClient on data]', route, data);

      if (typeof callback === 'function') {
        callback(data);
      }
    });
  }

  /**
   * 主动查询某个桩数据
   * @param {String} route 路由
   * @param {Object} params 额外的参数
   * @param {Function} callback 回调，接受一个参数：data（结果）
   */
  emit(route: string, params = {}, callback: (data: any) => void): void {
    if (typeof callback === 'function') {
      // 生成一个唯一的事件名，以便能够监听桩数据的返回
      const eventName = `[${Date.now()}][${this.seq}]${route}`;

      this.seq++;

      // 触发请求
      this.socket.emit(route, params, {
        eventName: eventName,
      });

      // 接受回调，此处只接受一次。虽然 eventName 已经是唯一的，但是 once 只监听一次，可以避免内存被占用
      this.socket.once(eventName, (data: any) => {
        console.log('[SocketClient once data after emit]', eventName, route, data);
        callback(data);
      });
    } else {
      // 触发请求
      this.socket.emit(route, params);
    }
  }
}
