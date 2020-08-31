# 调试指引

## 本地开发

### 启动 webui 项目

```
$ npm i 

# 注意要特殊处理
$ npm link mockstar-client

# 开发调试启动
$ npm start

# 构建生产模式的代码
$ npm run build
```

启动之后，接口默认请求的是 `http://127.0.0.1:9527/mockstar-cgi/detail`
