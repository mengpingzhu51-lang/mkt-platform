# 平台模块复刻迭代模板

## 1. 迭代目标
- 业务域：
- 本次页面范围（路由）：
- 目标交付（列表/详情/新增/编辑/流程）：

## 2. 页面审计映射
| 审计页面 | 复刻路由 | 页面类型 | 优先级 |
|---------|---------|---------|-------|
| 示例：投放策略 | `/market/circlingCrowd/distAndCirc` | 树形+列表+详情 | P0 |

## 3. 数据契约
### 3.1 API 列表
| 功能 | Method | Endpoint | 入参 | 出参 |
|-----|--------|----------|------|------|
| 示例：获取列表 | GET | `/marketing/show/**` | page,size,filters | list,total |

### 3.2 Mock 设计
- 处理器文件：`src/mocks/handlers/<domain>.ts`
- 数据夹具：`src/mocks/fixtures/<domain>.ts`
- 边界场景：空数据、分页边界、异常态、权限不足

## 4. 前端实现清单
1. 路由：`src/router/modules/platform.ts` 新增或替换占位路由
2. API：`src/api/modules/<domain>.ts`
3. 类型：`src/types/<domain>.ts`
4. 页面：`src/views/<domain>/*`
5. 组件：`src/components/platform/*` 中复用，新增组件需注明用途
6. 状态：必要时新增 `src/stores/<domain>.ts`

## 5. 交互验收
- 筛选/排序/分页可用
- 关键动作（新建、编辑、导出、审批或推送）可触发
- 异常提示清晰（网络错误、参数错误、权限不足）
- 入口跳转与返回路径正确

## 6. 质量门禁
- `npm run build` 通过
- 新增代码无类型错误
- 关键页面在 1366 宽度下无明显错位
- `docs/platform-audit.md` 复刻进度表已更新

## 7. 提交记录
- 迭代日期：
- 负责人员：
- 变更文件：
- 风险与遗留项：
