# EBC Agent Studio Prototype

EBC Agent Studio 的统一交互原型。项目使用统一 App Shell 管理平台导航和页面路由，现有功能原型作为独立页面接入。

## 小白使用指南

### 只打开原型

你不需要懂代码，也不需要安装 npm 依赖。

最简单的方式是直接双击项目根目录的 `index.html`。

如果页面没有正常打开，推荐使用本地服务：

1. 安装 [Node.js](https://nodejs.org/)，选择长期支持版（LTS）。
2. 在项目文件夹空白处点击右键，选择“在终端中打开”。
3. 输入并回车：

```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:5173/`。
5. 演示结束后，回到终端按 `Ctrl + C` 停止服务。

这个原型没有需要单独安装的 npm 依赖，因此不需要执行 `npm install`。

### 参与团队设计

GitHub 仓库地址：

```text
https://github.com/PureZheng/ebc-agent-studio-prototype
```

四个人不要互相传文件，也不要直接覆盖别人的修改。每个人先拉取最新版本，在自己的分支上设计，完成后再提交。

第一次下载项目，可以使用 GitHub Desktop 的 `File → Clone repository`，找到 `PureZheng/ebc-agent-studio-prototype` 后点击 `Clone`。

也可以使用终端：

```bash
git clone https://github.com/PureZheng/ebc-agent-studio-prototype.git
cd ebc-agent-studio-prototype
```

每次开始设计前，先同步主版本：

```bash
git switch main
git pull origin main
git switch -c feature/tool-page
```

把 `feature/tool-page` 换成自己的功能名称，例如 `feature/agent-page` 或 `feature/knowledge-page`。这个分支可以理解为自己的草稿区，不会影响其他人的工作。

设计完成后，先保存并检查页面，再执行：

```bash
git status
git add .
git commit -m "feat: 完成功能页面设计"
git push -u origin feature/tool-page
```

然后打开 GitHub 仓库，点击 `Compare & pull request`，请另一位成员检查后合并到 `main`。Pull Request 可以理解为“请团队确认并合并我的设计”。

合并完成后，下一次工作重新从最新主版本创建分支：

```bash
git switch main
git pull origin main
git switch -c feature/<新的功能>
```

如果使用 GitHub Desktop，对应操作是：`Fetch origin → Pull origin`（拉取）、`New Branch`（创建分支）、填写 Summary 后 `Commit`（提交）、`Push origin`（推送）、`Create Pull Request`（发起合并）。

## 快速开始

### 方式一：直接打开

双击根目录的 `index.html`。

### 方式二：本地服务（推荐）

需要先安装 Node.js，然后运行：

```bash
npm run dev
```

浏览器打开：

```text
http://localhost:5173/
```

## 已包含模块

- Agent 应用配置和智能体编辑器
- 对话测试
- MCP 接入
- Tool 工具
- Skill 技能
- 知识库
- 结构化数据接入
- 非结构化数据接入

## 项目结构

```text
ebc-agent-studio-prototype/
├─ index.html                 # 项目入口
├─ prototype-shell.html       # 统一 App Shell
├─ prototype-shell.js         # Shell 路由与沉浸式模式
├─ server.js                  # 零依赖本地静态服务
├─ package.json
├─ CONTRIBUTING.md            # 多人协作和页面接入规范
└─ pages/
   ├─ prototype-routes.js     # 中央路由和导航清单
   ├─ prototype-nav.js        # 功能页 Shell 适配器
   ├─ prototype-shell.css     # 统一布局与导航样式
   ├─ support.js              # dc-runtime
   ├─ 新增单agent功能/
   └─ 各功能原型页面
```

## 注意事项

- 请保留 `pages/` 内的相对目录和中文文件名。
- 智能体编辑器及部分动态页面可能需要访问外部 CDN。
- `pages/` 内的 Skill ZIP 是原型功能资源，需要提交到 Git。
- 不要将平台级导航复制进新功能；新入口统一登记到 `pages/prototype-routes.js`。

## 首次上传到 Git

在当前目录执行：

```bash
git init
git add .
git commit -m "chore: initialize EBC Agent Studio prototype"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

提交前请先运行原型，并检查主要导航和页面跳转。

## 团队拉取、设计和提交说明

推荐四个人使用“每个功能一个分支，通过 Pull Request 合并”的方式协作，不要直接在 `main` 分支同时修改。

### 1. 第一次拉取项目

先安装 Git 和 Node.js，然后运行：

```bash
git clone <repository-url>
cd ebc-agent-studio-prototype
npm run dev
```

浏览器打开 `http://localhost:5173/`，确认原型能够正常运行。

### 2. 每次开始设计前

先把本地 `main` 更新到最新版本：

```bash
git switch main
git pull origin main
```

然后为本次工作创建独立分支：

```bash
git switch -c feature/<模块名>-<内容>
```

示例：

```bash
git switch -c feature/tool-create-flow
git switch -c feature/knowledge-layout
git switch -c fix/sidebar-spacing
```

不要在同一个长期分支中混合多个无关模块的修改。

### 3. 设计和修改期间

- 功能页面放在 `pages/` 对应目录中。
- 新增导航入口时，只修改 `pages/prototype-routes.js`。
- 平台布局变量只在 `pages/prototype-shell.css` 中维护。
- 修改中央路由、Shell 或公共样式前，先在团队中确认，避免多人同时编辑同一文件。
- 随时使用下面的命令查看修改范围：

```bash
git status
git diff
```

### 4. 提交自己的修改

先运行原型并检查相关页面，然后查看变更：

```bash
git status
git diff
```

只添加本次工作涉及的文件：

```bash
git add <修改的文件或目录>
```

例如：

```bash
git add pages/EBC-Agent-Studio-Skill技能管理.html
git add pages/prototype-routes.js
```

提交时使用清晰的说明：

```bash
git commit -m "feat(skill): 完善技能创建流程"
```

常用提交类型：

- `feat`：新增或完善功能
- `fix`：修复问题
- `style`：只调整视觉样式
- `docs`：修改说明文档
- `refactor`：调整结构但不改变功能

### 5. 推送个人分支

第一次推送：

```bash
git push -u origin feature/<模块名>-<内容>
```

后续继续提交后，只需要：

```bash
git push
```

推送完成后，在 Git 平台创建 Pull Request，请至少一位其他成员检查界面一致性和页面跳转。

### 6. 合并前同步最新主分支

如果其他人的修改已经进入 `main`，先将最新主分支合并到自己的功能分支：

```bash
git switch main
git pull origin main
git switch feature/<模块名>-<内容>
git merge main
```

解决冲突并重新测试后：

```bash
git add <已解决的文件>
git commit
git push
```

如果冲突出现在 `prototype-routes.js`、`prototype-shell.js` 或 `prototype-shell.css`，不要直接删除另一位成员的内容；应先确认双方新增的路由和样式都被保留。

### 7. Pull Request 合并后

更新本地主分支，并删除已经完成的本地功能分支：

```bash
git switch main
git pull origin main
git branch -d feature/<模块名>-<内容>
```

下一项工作重新从最新 `main` 创建新分支。
