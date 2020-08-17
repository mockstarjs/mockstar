---
sidebarDepth: 2

---

# mocker 的 config.json 配置

## 1. 类型定义

```typescript
export interface MockModuleConfigOpt {
  description?: string;
  delay?: number;
  priority?: number;
  match?: Record<string, unknown>;
}
```

## 2. 含义介绍

|    字段名     |   类型   |        默认值        |                           含义描述                           |
| :-----------: | :------: | :------------------: | :----------------------------------------------------------: |
| `description` | `String` |         `''`         |                           简要描述                           |
|    `delay`    | `Number` |         `0`          |      延时多久返回，如果是 0，则不做延时返回，单位为 ms       |
|  `priority`   | `Number` |         `0`          |         管理后台列表中排序的权重，值越大则越排在前面         |
|    `match`    | `Object` | `{_ms_target: name}` | 请求中需要携带的额外数据，必须同时满足这个的条件，才算匹配了这个 mock module |

## 3. 文件示例

> - 目前仅支持 JSON 配置文件

```json
{
  "description": "type=1 学生"
}
```

