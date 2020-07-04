import {SocketClient} from './SocketClient';
import {listen, request} from '../util-async';

export class AsyncClient extends SocketClient {
  opts: Record<string, unknown>;

  /**
   *
   * @param {String} [url] socket启动地址，例如 http://10.66.95.54:3000'，如果是移动端代理，记得要写IP，而不能够使用 localhost 或者 127.0.0.1 这种
   * @param {Object} [opts] 额外参数
   */
  constructor(url: string, opts: Record<string, unknown> = {}) {
    super(url);

    this.opts = opts;
  }

  listen(route: string, callback: () => void): void {
    listen(this, route, callback);
  }

  request(route: string, params: Record<string, unknown>): Promise<unknown> {
    return request(this, route, params);
  }
}
