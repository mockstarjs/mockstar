module.exports = {
  // 构建生成的文件路径，相对于根目录而言
  dest: './docs-dist',

  // 设置站点根路径，否则静态资源路径会有问题
  base: '/mockstar/',

  // 添加 github 链接，用于 gh-pages -d dist 命令
  repo: 'https://github.com/mockstarjs/mockstar',

  title: 'mockstar.js',
  description: '专注数据 mock 的工具，可以更容易编写、管理和使用 mock 数据',
  head: [['link', {rel: 'icon', href: `/logo.png`}]],
  themeConfig: {
    locales: {
      '/': {
        navs: [
          {text: '指南', link: '/wiki/'},
          {text: 'API手册', link: '/api/'},
          {text: '工具', link: '/tool/'},
          {text: '发布日志', link: '/release/'},
          {text: 'Issues', link: 'https://github.com/mockstarjs/mockstar/issues'},
        ],
        sidebar: {
          '/wiki/': [
            {
              title: '关于 mockstar',
              path: '/wiki/',
              collapsable: false,
            },
            {
              title: '安装和升级',
              path: '/wiki/install',
              collapsable: false,
            },
            {
              title: '快速入门',
              path: '/wiki/getting-started/',
              collapsable: false,
              children: ['getting-started/default', 'getting-started/new-mocker'],
            },
            {
              title: '深入',
              collapsable: false,
              children: ['improve/summary', 'improve/get-start', 'improve/simple', 'improve/how'],
            },
            {
              title: 'FAQ',
              collapsable: false,
              children: ['faq/common'],
            },
          ],
          '/api/': [
            {
              title: 'API说明',
              path: '/api/',
            },
            {
              title: 'mockstar.config.js 配置',
              path: '/api/mockstar-config',
            },
            {
              title: 'mocker 的 config.json 配置',
              path: '/api/mockstar',
            },
            {
              title: 'mock module 的 config.json 配置',
              path: '/api/mocker-module',
            },
          ],
          '/tool/': [
            {
              title: '说明',
              path: '/tool/',
            },
            {
              title: 'mockstar-cli',
              path: '/tool/mockstar-cli',
            },
            {
              title: 'Proxy SwitchyOmega',
              path: '/tool/proxy-switchyomega',
            },
            {
              title: 'Whistle',
              path: '/tool/whistle',
            },
            {
              title: 'mockstar-devtools-extensions',
              path: '/tool/mockstar-devtools-extensions',
            },
          ],
          '/release/': true,
        },
      },
    },
  },
};
