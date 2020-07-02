import {LocalServerConfig} from '../config/LocalServerConfig';
import mockerRouter from './mocker/router';
import {Router} from '../types';

export default (router: Router, localServerConfig: LocalServerConfig) => {
  // 初始化 mocker
  mockerRouter(router, localServerConfig);
};
