# AI Agent 教程

> AI Agent 开发与使用教程，基于 mdBook 构建。

## 目录

- [OpenCode](./src/opencode/index.md) - AI 编程助手的安装、配置与使用
- [Claude Code](./src/claudecode/index.md) - Claude Code 安装与智谱 GLM 接入
- [Vibe Paper](./src/vibe-paper/index.md) - AI 辅助论文写作的经验技巧
- [MCP 配置](./src/mcp-zhipu/index.md) - 智谱套餐专属 MCP 扩展
- [WSL 安装](./src/windows-wsl/index.md) - Windows 用户的 Linux 环境配置
- [Ralph Loop](./src/ralph-loop/index.md) - 解决长任务上下文腐烂的循环调用范式
- [插件与 Skills 推荐](./src/awesome-plugins-skills/index.md) - 好用的 Agent 插件与 Skills
- [LLM Wiki](./src/LLM-wiki/index.md) - 用 Obsidian 构建个人知识库的 Skills
- [cc-switch 配置切换](./src/cc-switch/index.md) - 多编码工具的 API 配置切换
- [终端工具推荐](./src/terminal-tool/index.md) - zellij / yazi / helix
- [终端环境配置](./src/wezTerm/index.md) - Nerd Fonts、yazi、tmux 设置

## 本地预览

### 前置条件

- [mdBook](https://github.com/rust-lang/mdBook) - 安装：`cargo install mdbook`

### 构建与预览

```bash
# 预览
mdbook serve

# 构建
mdbook build
```

## 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署。

### 设置步骤

1. **启用 GitHub Pages**
   - 仓库 Settings → Pages → Source: GitHub Actions

2. **推送代码**
   - 推送到 main/master 分支后自动部署

### 访问

部署完成后访问：`https://<username>.github.io/<repo-name>/`

## 项目结构

```
agent-tutorial/
├── src/                    # Markdown 源文件
│   ├── SUMMARY.md          # 目录结构
│   ├── intro.md            # 简介
│   ├── opencode/           # OpenCode 教程
│   ├── claudecode/         # Claude Code 教程
│   ├── vibe-paper/         # Vibe Paper 经验
│   ├── mcp-zhipu/          # 智谱 MCP 配置
│   ├── windows-wsl/        # WSL 安装指南
│   ├── ralph-loop/         # Ralph Loop
│   ├── awesome-plugins-skills/  # 插件与 Skills 推荐
│   ├── LLM-wiki/           # LLM Wiki（Obsidian 知识库）
│   ├── cc-switch/          # cc-switch 配置切换
│   ├── terminal-tool/      # 终端工具推荐
│   └── wezTerm/            # 终端环境配置
├── theme/                  # 自定义主题
│   ├── custom.css          # 样式
│   └── head.hbs            # 自定义头部
├── book.toml               # mdBook 配置
└── .github/workflows/
    └── deploy.yml          # 自动部署
```

## 许可证

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

- 转载请注明作者和来源
- 禁止商业用途
- 修改后须以相同许可证分享
