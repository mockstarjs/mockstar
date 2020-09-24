module.exports = {
  // 构建生成的文件路径，相对于根目录而言
  dest: './docs-dist',

  // 设置站点根路径，否则静态资源路径会有问题
  base: '/mockstar/',

  // 添加 github 链接，用于 gh-pages -d dist 命令
  repo: 'https://github.com/mockstarjs/mockstar',

  title: 'mockstar.js',
  description: '轻量级前端Mock工具',
  head: [['link', {rel: 'icon', href: `/logo.png`}]],
  themeConfig: {
    locales: {
      '/': {
        navs: [
          {text: '使用文档', link: '/docs/'},
          {text: 'API手册', link: '/api/'},
          {text: '工具', link: '/tool/'},
          {text: 'Issues', link: 'https://github.com/mockstarjs/mockstar/issues'},
        ],
        sidebar: {
          '/docs/': [
            {
              title: '关于 mockstar',
              path: '/docs/',
              collapsable: false,
            },
            {
              title: '安装和升级',
              path: '/docs/install',
              collapsable: false,
            },
            {
              title: '快速开始',
              path: '/docs/getting-started/',
              collapsable: false,
            },
            {
              title: '使用指南',
              collapsable: false,
              children: [
                'develop/folder-structure',
                'develop/introduction',
                'develop/mocker-readme',
              ],
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
              title: 'Mocker 的 config.json 配置',
              path: '/api/mockstar',
            },
            {
              title: 'Mock Module 的 config.json 配置',
              path: '/api/mocker-module',
            },
          ],
          '/tool/': [
            {
              title: '工具首页',
              path: '/tool/',
            },
            {
              title: '开发者工具',
              collapsable: false,
              children: [
                {
                  title: '脚手架：create-mockstar-app',
                  path: 'create-mockstar-app',
                },
                {
                  title: 'Chrome 插件：MockStar',
                  path: 'mockstar-chrome-devtools-extensions',
                },
              ],
            },
            {
              title: '代理工具',
              collapsable: false,
              children: [
                {
                  title: 'Whistle',
                  path: '/tool/whistle',
                },
                {
                  title: 'Chrome 插件：Proxy SwitchyOmega',
                  path: 'proxy-switchyomega',
                },
              ],
            },
          ],
        },
      },
    },
  },
};
