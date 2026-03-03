# mkt-platform 账单页 Demo

基于 `Vue3 + Vite + TypeScript + Element Plus` 实现账单管理页面，包含以下能力：

- 筛选条件区域（账单月、客户、客户负责人、对账状态）
- 金额统计卡片（总金额、已对账总金额、未对账总金额）
- 账单列表与行操作（账单详情、对账、邮件记录）
- 顶部操作按钮（导出列表、导出账单、邮件发送）
- 邮件记录弹窗（客户信息 + 发送记录表）

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
