# EBC Agent Studio Prototype

EBC Agent Studio 的统一交互原型。它是一个**零依赖的本地网页原型**，用于体验平台导航、Agent 配置、对话测试、MCP、Tool、Skill 和知识库等页面。

## 小白快速开始（Windows）

### 第一步：安装工具

只需要安装下面两个工具：

- [Git for Windows](https://git-scm.com/download/win)：用于从 GitHub 下载和同步项目。
- [Node.js LTS](https://nodejs.org/)：用于启动本地网页服务。

安装完成后，可以在 PowerShell 中检查：

~~~powershell
git --version
node --version
~~~

### 第二步：从 GitHub 下载项目

仓库地址：

~~~text
https://github.com/PureZheng/ebc-agent-studio-prototype
~~~

#### 方式 A：推荐，不要手动创建项目文件夹

在你想存放项目的**父文件夹**中打开 PowerShell，然后执行：

~~~powershell
cd "D:\你想存放项目的目录"
git clone https://github.com/PureZheng/ebc-agent-studio-prototype.git
cd ebc-agent-studio-prototype
~~~

git clone 会自动创建 ebc-agent-studio-prototype 文件夹，并把仓库文件放进去。

#### 方式 B：已经创建了一个空文件夹

如果你已经创建了例如“新建文件夹”，并希望文件直接放在这个文件夹里：

~~~powershell
cd "D:\你的路径\新建文件夹"
git clone https://github.com/PureZheng/ebc-agent-studio-prototype.git .
~~~

命令最后的 . 代表“当前文件夹”。这个文件夹必须是空的（可以没有文件，但不要放入其他项目）。

不要在空文件夹中省略最后的 .，否则 Git 会在里面再创建一个 ebc-agent-studio-prototype 子文件夹。

#### 方式 C：使用 GitHub Desktop

1. 安装并打开 [GitHub Desktop](https://desktop.github.com/)。
2. 选择 File → Clone repository → URL。
3. 粘贴仓库地址：https://github.com/PureZheng/ebc-agent-studio-prototype.git
4. 在 Local path 选择项目的父文件夹，不要选择一个已经放有其他文件的文件夹。
5. 点击 Clone。

### 第三步：启动原型

进入**包含 package.json 的项目目录**，执行：

~~~powershell
npm run dev
~~~

然后在浏览器打开：

~~~text
http://localhost:5173/
~~~

演示结束时，回到终端按 Ctrl + C 停止服务。

本项目没有 npm 依赖，因此不需要执行 npm install。如果看到 package.json not found，说明当前终端目录不对，请先执行：

~~~powershell
Get-ChildItem package.json
~~~

确认能看到文件后，再运行 npm run dev。

## 多人协作流程

如果几个人一起设计这个原型，请遵循“主分支 + 每人一个功能分支 + Pull Request”的方式：

~~~text
main（稳定主版本）
 ├─ feature/agent-page（成员 A）
 ├─ feature/tool-page（成员 B）
 └─ feature/knowledge-page（成员 C）
~~~

不要直接在 main 分支上修改，也不要把自己的整个项目文件夹发给别人覆盖。

### 第一次下载项目

每位成员只需要下载一次项目。下载完成后，进入包含 package.json 的目录：

~~~powershell
git clone https://github.com/PureZheng/ebc-agent-studio-prototype.git
cd ebc-agent-studio-prototype
npm run dev
~~~

### 每次开始新功能

先同步最新的 main，再创建自己的分支：

~~~powershell
git switch main
git pull origin main
git switch -c feature/tool-page
~~~

把 feature/tool-page 换成自己的功能名称，例如：

~~~powershell
git switch -c feature/agent-page
git switch -c feature/knowledge-page
~~~

如果提示分支已经存在，可以切换到它：

~~~powershell
git switch feature/tool-page
~~~

### 第一次提交前：配置 Git 身份

如果 Git 提示 Author identity unknown，在项目目录执行下面两行。姓名和邮箱填写你自己的信息；邮箱可以使用 GitHub 账号绑定的邮箱或 GitHub 提供的 noreply 邮箱。

~~~powershell
git config user.name "你的姓名或 GitHub 用户名"
git config user.email "你的 GitHub 邮箱"
~~~

这只配置当前项目，不会影响其他项目。

### 保存、提交并推送

修改并保存文件后：

~~~powershell
git status
git add .
git commit -m "feat: 完成功能页面设计"
git push -u origin feature/tool-page
~~~

首次推送时，GitHub 可能要求登录或授权。之后继续修改同一个分支时，只需要：

~~~powershell
git add .
git commit -m "feat: 更新工具页面"
git push
~~~

### 发起合并请求

推送成功后：

1. 打开 GitHub 仓库页面。
2. 点击 Compare & pull request。
3. 确认 base 是 main，compare 是你的功能分支。
4. 写清楚改了什么，并请另一位成员检查。
5. 检查通过后再合并到 main。

GitHub Desktop 的对应操作是：

1. Current Branch → New Branch：创建功能分支。
2. 修改文件后，在左下角填写 Summary，点击 Commit to <分支名>。
3. 点击 Push origin：推送分支。
4. 点击 Create Pull Request：发起合并请求。

### 开始下一项工作

某个功能合并后，不要继续复用旧功能分支。重新同步并创建新分支：

~~~powershell
git switch main
git pull origin main
git switch -c feature/<新的功能>
~~~

## 常见问题

### Could not read package.json 或 package.json not found

当前目录不是项目根目录。先进入包含 package.json 的文件夹：

~~~powershell
cd "项目实际路径"
Get-ChildItem package.json
npm run dev
~~~

### src refspec feature/tool-page does not match any

通常表示分支还没有创建，或者前面的 git commit 没有成功。先执行：

~~~powershell
git switch -c feature/tool-page
git status
git commit -m "feat: 完成功能页面设计"
git push -u origin feature/tool-page
~~~

如果 git commit 提示 nothing to commit，说明当前没有文件改动。

### Author identity unknown

按上面的“配置 Git 身份”步骤设置 user.name 和 user.email，然后重新执行 commit。

### 已经下载过项目，如何获取最新文件？

不要再次执行 git clone。进入已有项目目录后执行：

~~~powershell
git switch main
git pull origin main
~~~

如果使用 GitHub Desktop，点击 Fetch origin，然后点击 Pull origin。

## 项目结构

~~~text
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
~~~

## 修改时请注意

- 请保留 pages/ 内的相对目录和中文文件名。
- 智能体编辑器及部分动态页面可能需要访问外部 CDN。
- pages/ 内的 Skill ZIP 是原型功能资源，需要提交到 Git。
- 不要将平台级导航复制进新功能；新入口统一登记到 pages/prototype-routes.js。
