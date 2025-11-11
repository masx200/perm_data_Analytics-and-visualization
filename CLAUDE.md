<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big
  performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## 项目概述

这是一个现代化的技术博客和研究报告展示平台，包含以下主要组件：

### 1. 技术博客主页 (index.html)

- 响应式设计的博客首页，展示文章列表
- 动态文章卡片生成，支持点击跳转
- 实时搜索和分类筛选功能
- 自动从HTML文件提取文章元数据

### 2. 研究报告页面

- **JSON处理库深度对比研究报告.html**: stream-json vs large-json-reader-writer
- **上下文压缩与编程智能体稳定性研究.html**: KiloCode vs Claude Code

### 3. 核心功能

- 文章元数据自动提取（title标签优先，meta description优先）
- 点击文章卡片跳转到对应页面
- 移动端适配和平滑动画效果

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 项目架构

### 前端结构

```
├── index.html                 # 博客主页 - 文章列表展示
├── JSON处理库深度对比研究报告.html  # 研究报告页面1
├── 上下文压缩与编程智能体稳定性研究.html  # 研究报告页面2
├── src/
│   ├── index.js            # 博客应用核心逻辑
│   ├── style.css           # 全局样式文件
│   └── JSON处理库深度对比研究报告.js  # 报告页面脚本
├── public/                   # 静态资源目录
└── 图片资源/                  # 相关图片资源
```

### 核心组件

- **BlogApp类** (src/index.js): 博客应用主逻辑，管理文章加载、搜索、筛选
- **文章卡片**: 支持点击跳转、动态元数据加载、悬停效果
- **响应式导航**: 移动端汉堡菜单、桌面端固定导航
- **搜索系统**: 实时搜索文章标题、摘要、标签
- **分类系统**: 动态文章分类筛选

## 技术栈

### 构建与开发

- **构建工具**: Vite 7.x - 快速的现代化构建工具
- **包管理器**: pnpm - 高效的依赖管理
- **开发服务器**: 内置开发服务器 + 热重载

### 前端技术

- **HTML5**: 语义化HTML结构，支持现代Web特性
- **CSS框架**: Tailwind CSS 4.x - 实用优先的CSS框架
- **JavaScript**: ES6+ 原生JavaScript，使用模块化
- **HTTP客户端**: Axios - 轻量级HTTP请求库

### UI/UX组件

- **图标库**: Font Awesome 6.4.0 - 丰富的矢量图标
- **动画**: CSS3 + JavaScript 平滑动画
- **响应式设计**: 移动端优先的响应式布局
- **图片服务**: Picsum Photos API - 随机占位图片

## 开发服务器配置

开发服务器配置了API代理，在`vite.config.js`中：

- `/api` -> `http://localhost:5000`
- `/static` -> `http://localhost:5000`

## 开发服务器配置

开发服务器配置了API代理，在`vite.config.js`中：

- `/api` -> `http://localhost:5000`
- `/static` -> `http://localhost:5000`

## 核心功能说明

### 文章元数据提取逻辑 (src/index.js:95-164)

- **优先使用title标签**: 从HTML的`<title>`标签提取页面标题
- **fallback到h1标签**: 如果没有title标签，查找第一个`<h1>`标签
- **meta description优先**: 优先从`<meta name="description">`提取摘要
- **内容fallback**: 如果没有meta description，查找段落或其他文本内容

### 文章卡片交互 (src/index.js:259-309)

- **全卡片点击**: 整个文章卡片区域支持点击跳转
- **新标签页打开**: 使用`window.open(filename, '_blank')`在新标签页打开文章
- **事件冒泡控制**: 底部"阅读全文"链接使用`event.stopPropagation()`避免冲突
- **视觉反馈**: 悬停效果、指针样式、阴影变化

### 搜索与筛选系统 (src/index.js:350-378)

- **实时搜索**: 支持标题、摘要、标签的多字段搜索
- **分类筛选**: 动态生成分类标签，支持按类别筛选文章
- **统计更新**: 实时更新文章数量显示

## 开发指南

### 添加新文章

1. 在项目根目录创建新的HTML文件
2. 在HTML的`<head>`中添加`<meta name="description" content="摘要内容">`
3. 确保HTML中有`<title>`标签
4. 在`src/index.js`的`htmlFiles`数组中添加文件名
5. 系统会自动提取标题和摘要，无需手动配置

### 样式开发

- 主要样式使用Tailwind CSS类
- 自定义样式在`index.html`的`<style>`标签中
- 响应式断点：移动端<768px，平板≥768px，桌面≥1024px

### 注意事项

1. 项目使用中文界面，所有文本内容应使用中文
2. 文章HTML文件应包含完整的meta description标签以提高SEO效果
3. 避免修改DOM结构的核心类名和ID，确保JavaScript功能正常
4. 新增文章时注意文件名编码，使用UTF-8格式
5. 图片资源使用Picsum API，确保可访问性

# 给文档添加摘要的方法:

```html
<meta
  name="description"
  content="深入对比分析stream-json和large-json-reader-writer两个主流JSON处理库的性能、内存管理、API设计和社区支持等特性，为技术选型提供科学依据。包含详细的性能测试数据、技术特性对比表和适用场景分析。"
/>
```
