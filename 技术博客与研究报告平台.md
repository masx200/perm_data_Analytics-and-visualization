# 技术博客与研究报告平台

这是一个现代化的技术博客和研究报告展示平台，包含博客主页和多个深度技术研究报告。支持动态文章加载、元数据提取、分类筛选、搜索等功能。

## 项目特点

### 博客主页 (index.html)

- 🎨 现代化响应式设计，支持移动端和桌面端
- 📱 响应式导航栏，移动端汉堡菜单
- 🔍 实时搜索功能，支持标题、摘要、标签搜索
- 🏷️ 动态分类筛选，按文章类别浏览
- 📊 文章统计信息展示
- ⭐ 文章卡片悬停效果和点击跳转
- 📝 自动从HTML文件提取标题和摘要（优先使用title标签和meta description）
- 🌟 平滑滚动和加载动画效果

### 研究报告页面

- 📈 JSON处理库深度对比研究报告：stream-json vs large-json-reader-writer
- 🤖 上下文压缩与编程智能体稳定性研究：KiloCode vs Claude Code
- 📊 交互式图表和数据可视化
- 🎯 详细的技术对比分析和适用场景建议

## 技术栈

### 前端框架与工具

- **构建工具**: Vite 7.x - 快速的现代化构建工具
- **开发语言**: 原生 JavaScript ES6+ (TypeScript Ready)
- **模块系统**: ES Modules - 原生模块化支持

### 样式与UI

- **CSS框架**: Tailwind CSS 4.x - 实用优先的CSS框架
- **图标库**: Font Awesome 6.4.0 - 丰富的图标资源
- **动画**: CSS3 Animations + JavaScript - 平滑的交互体验

### 数据与交互

- **HTTP客户端**: Axios - 轻量级的HTTP请求库
- **数据格式**: JSON + HTML - 多种数据源支持
- **DOM操作**: 原生DOM API - 高性能的文档操作

### 图表与可视化

- **图表库**: Chart.js (CDN) - 强大的数据可视化库
- **图像处理**: Picsum Photos API - 随机图片占位符

### 开发工具

- **包管理**: pnpm - 高效的包管理器
- **代码质量**: ESLint + Prettier (可配置)
- **调试工具**: Chrome DevTools + Source Maps

## JSON处理库对比分析平台

这是一个关于JSON处理库深度对比的研究报告前端项目，使用Vite构建，主要对比分析stream-json和large-json-reader-writer两个库的性能、特性、适用场景等。

## 项目特点

- 使用Vite构建的单页应用(SPA)
- 基于Tailwind CSS的现代响应式界面
- 包含交互式图表和详细对比数据
- 提供导航管理功能，支持添加、编辑、删除导航条目
- 使用axios进行API交互
- 通过CDN引入Chart.js和Font Awesome

## 技术栈

- 构建工具: Vite 7.x
- CSS框架: Tailwind CSS 4.x
- HTTP客户端: axios
- 图表库: Chart.js (通过CDN)
- 图标: Font Awesome (通过CDN)

## 安装与运行

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

## 项目结构

- **index.html** - 主页面，包含完整的报告内容和交互式图表
- **src/main.js** - 主要的JavaScript逻辑，包含导航管理和API交互
- **src/style.css** - 全局样式
- **src/counter.js** - 计数器组件
- **public/** - 静态资源目录

## 开发服务器配置

开发服务器配置了API代理，在`vite.config.js`中：

- `/api` -> `http://localhost:5000`
- `/static` -> `http://localhost:5000`

## 注意事项

1. 项目使用中文界面，所有文本内容应使用中文
2. 项目主要是一个展示性的报告页面，包含了大量预定义的对比数据和图表
3. 虽然代码中有导航管理相关的API调用，但主要展示内容已经内联在HTML中
4. 使用了多个CDN资源来加载图表库和图标库
