const path = require('path');

// 更多配置说明，请参考 https://mockstarjs.github.io/mockstar/api/mockstar-config.html
module.exports = {
// mockstar-app 项目根目录
rootPath: __dirname,

// mock server 桩数据模块目录
mockServerPath: path.resolve(__dirname, './mock_server'),

// mockstar 启动之后的服务端口号
port: 9420,

// 构建之后的目录，也是运行产物临时目录
// buildPath: path.resolve(__dirname, './build'),

// 日志输出目录
// logPath: path.resolve(__dirname, './build/logs'),

// 应用的名字，用于标识一个服务，格式为 mockstar_${this.port}
// name: mockstar_9420,

// 命名空间
// namespace: '',

// 静态资源的基础路径，例如 /s/ ，或者 /s/t/
// staticBasePath: '/',

// 是否监听文件变化，推荐本地开发模式下使用
// watch: false,

// 是否为开发模式
// isDev: false,
};
