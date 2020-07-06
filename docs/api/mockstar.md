---
sidebarDepth: 2
---

# mocker 的 config.json 配置

## 1. 类型定义

```typescript
/**
 *
 * @param [route] 需要处理的路由，只有匹配到这个路由，才会被处理
 * @param [routeExtra] 额外的路由匹配参数
 * @param [name] 名字
 * @param [description] 简要描述
 * @param [disable] 此mocker是否为禁用状态，一旦设置为 true，则将忽略该mocker，而是去请求现网
 * @param [defaultModule] 默认初始化时激活的 mock module 名字
 * @param [activeModule] 当前激活的 mock module 名字
 * @param [method] http 请求方式，包括 get(默认) 和 post
 * @param [plugin] 数据mock类型，包括 xhr(默认) 和 async
 * @param [priority] 管理后台列表中排序的权重，值越大则越排在前面
 * @param [tags] 管理后台用到的标签，用于过滤，字符串数组
 */
export interface MockerConfigOpt {
  route?: string;
  routeExtra?: Record<string, unknown>;
  description?: string;
  disable?: boolean;
  defaultModule?: string;
  activeModule?: string;
  method?: 'GET' | 'POST' | 'get' | 'post';
  plugin?: 'xhr' | 'async';
  priority?: number;
  tags?: string[];
}
```

## 2. 含义介绍

|     字段名      |    类型    |     默认值      |                           含义描述                           |
| :-------------: | :--------: | :-------------: | :----------------------------------------------------------: |
|     `route`     |  `String`  |      `''`       |        需要处理的路由，只有匹配到这个路由，才会被处理        |
|  `routeExtra`   |  `Object`  |      `{}`       |                      额外的路由匹配参数                      |
|     `name`      |  `String`  |      `''`       |                             名字                             |
|  `description`  |  `String`  |     `name`      |                           简要描述                           |
|    `disable`    | `Boolean`  |     `false`     | 此 mocker 是否为禁用状态，一旦设置为 true，则将忽略该 mocker，而是去请求现网 |
| `defaultModule` |  `String`  |      `''`       |             默认初始化时激活的 mock module 名字              |
| `activeModule`  |  `String`  | `defaultModule` |                 当前激活的 mock module 名字                  |
|    `method`     |  `String`  |      `GET`      |            http 请求方式，包括 get(默认) 和 post             |
|    `plugin`     |  `String`  |      `XHR`      |            数据mock类型，包括 xhr(默认) 和 async             |
|   `priority`    |  `Number`  |       `0`       |         管理后台列表中排序的权重，值越大则越排在前面         |
|     `tags`      | `String[]` |   `['全部']`    |           管理后台用到的标签，用于过滤，字符串数组           |

## 3. 文件示例

> - 目前仅支持 JSON 配置文件

```json
{
  "description": "description for demo_cgi",
  "route": "/cgi-bin/a/b/demo_cgi",
  "defaultModule": "success_type_1",
  "method": "",
  "tags": ["tag1", "tag2"]
}
```

