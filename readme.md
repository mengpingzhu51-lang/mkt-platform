# mkt-platform

基于 `Vue3 + Vite + TypeScript + Element Plus` 的营销平台复刻工程（Mock-first）。

当前版本已完成：

- 平台壳层（顶栏一级模块、左侧二级菜单、面包屑、路由体系）
- 首页看板首版（指标卡、趋势图、快捷入口、关键待办）
- API 分层与 Mock 体系（`axios + msw`）
- 审计文档与迭代模板（支持按业务域持续复刻）

## 环境要求

- Node.js：`>= 18.18`（推荐使用 LTS 版本）
- npm：`>= 9`

可通过以下命令检查版本：

```bash
node -v
npm -v
```

## 安装依赖

在项目根目录执行：

```bash
npm install
```

## 启动项目

```bash
npm run dev
```

启动后在浏览器访问终端提示的本地地址（默认通常为 `http://localhost:5173`）。

## 生产构建

```bash
npm run build
```

## 本地预览构建产物（可选）

```bash
npm run preview
```

## 目录结构（核心）

```text
src/
  api/                 # 请求层
  components/platform/ # 平台通用组件
  layouts/             # 主布局壳层
  mocks/               # MSW mock handlers + fixtures
  router/              # 路由与业务模块映射
  stores/              # Pinia 状态管理
  types/               # 业务类型定义
  views/               # 页面层（dashboard + 占位模块）
docs/
  platform-audit.md
  platform-iteration-template.md
```
