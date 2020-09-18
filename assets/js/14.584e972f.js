(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{624:function(t,s,a){t.exports=a.p+"assets/img/whistle_index.c51e6da1.png"},651:function(t,s,a){"use strict";a.r(s);var e=a(69),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"whistle"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#whistle"}},[t._v("#")]),t._v(" whistle")]),t._v(" "),e("p",[t._v("参考 "),e("a",{attrs:{href:"https://github.com/avwo/whistle/blob/HEAD/README-zh_CN.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("whistle中文文档"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),e("h3",{attrs:{id:"node"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#node"}},[t._v("#")]),t._v(" Node")]),t._v(" "),e("p",[t._v("mockstar 是基于 Node 来实现的，因此需要在本机安装 Node 。")]),t._v(" "),e("p",[t._v("为了获得更好的性能，推荐安装最新版本的 Node，进入 https://nodejs.org/ 官网，选择 LTS 版本的 Node 安装即可。")]),t._v(" "),e("p",[t._v("安装完Node后，执行下面命令，查看当前Node版本：")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ node -v\nv4.4.0\n")])])]),e("p",[t._v("如果能正常输出Node的版本号，表示Node已安装成功(Windows系统可能需要重新打开cmd)。")]),t._v(" "),e("h3",{attrs:{id:"whistle-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#whistle-2"}},[t._v("#")]),t._v(" whistle")]),t._v(" "),e("p",[t._v("安装方式如下：")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装tnpm")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" @tencent/tnpm -g --registry"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("http://r.tnpm.oa.com --no-proxy\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装whistle")]),t._v("\ntnpm "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -g whistle @tencent/whistle.txpac\n")])])]),e("p",[t._v("安装完whistle后，执行下面命令，查看当前whistle版本：")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ w2 -V\n"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.15")]),t._v(".10\n")])])]),e("p",[t._v("如果能正常输出whistle的版本号，表示whistle已安装成功(Windows系统可能需要重新打开cmd)。")]),t._v(" "),e("h2",{attrs:{id:"运行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#运行"}},[t._v("#")]),t._v(" 运行")]),t._v(" "),e("p",[t._v("在终端/控制台下运行如下命令可以启动whistle")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("hebly723-MC1:mockstar-demo hebly723$ w2 start\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" whistle@1.15.10 restarted\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(". use your device to visit the following URL list, gets the IP of the URL you can access:\n       http://127.0.0.1:8899/\n       http://10.64.66.73:8899/\n       Note: If all the above URLs are unable to access, check the firewall settings\n             For "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("help")]),t._v(" see https://github.com/avwo/whistle\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(". configure your device to use whistle as its HTTP and HTTPS proxy on IP:8899\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(". use Chrome to visit http://local.whistlejs.com/ to get started\n")])])]),e("p",[t._v("默认情况下，whistle启动在 http://127.0.0.1:8899/ ，打开该链接，可以看到如下界面：")]),t._v(" "),e("p",[e("img",{attrs:{src:a(624),alt:"whistle主界面"}})]),t._v(" "),e("p",[t._v("如果想换其余的端口比如8080打开whistle的话，可以使用以下的命令")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("w2 restart -p "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);