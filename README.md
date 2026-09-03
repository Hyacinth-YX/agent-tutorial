# AI Agent 教程

> AI Agent 开发与使用教程，基于 [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 构建。

## 目录

- [OpenCode](./docs/opencode/index.md) - AI 编程助手的安装、配置与使用
- [Claude Code](./docs/claudecode/index.md) - Claude Code 安装与智谱 GLM 接入
- [Vibe Paper](./docs/vibe-paper/index.md) - AI 辅助论文写作的经验技巧
- [MCP 配置](./docs/mcp-zhipu/index.md) - 智谱套餐专属 MCP 扩展
- [WSL 安装](./docs/windows-wsl/index.md) - Windows 用户的 Linux 环境配置
- [Ralph Loop](./docs/ralph-loop/index.md) - 解决长任务上下文腐烂的循环调用范式
- [插件与 Skills 推荐](./docs/awesome-plugins-skills/index.md) - 好用的 Agent 插件与 Skills
- [LLM Wiki](./docs/LLM-wiki/index.md) - 用 Obsidian 构建个人知识库的 Skills
- [cc-switch 配置切换](./docs/cc-switch/index.md) - 多编码工具的 API 配置切换
- [终端工具与配置](./docs/terminal-tool/index.md) - WezTerm 配置、zellij / yazi / helix、Nerd Fonts、tmux

## 本地预览

### 前置条件

- Python >= 3.9

### 安装与预览

```bash
# 建议使用虚拟环境
python -m venv .venv
source .venv/Scripts/activate   # Git Bash on Windows
# source .venv/bin/activate     # Linux/macOS

# 安装依赖
pip install -r requirements.txt

# 预览（http://127.0.0.1:8000）
mkdocs serve

# 构建
mkdocs build
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
├── docs/                   # Markdown 源文件
│   ├── index.md            # 简介（站点首页）
│   ├── opencode/           # OpenCode 教程
│   ├── claudecode/         # Claude Code 教程
│   ├── vibe-paper/         # Vibe Paper 经验
│   ├── mcp-zhipu/          # 智谱 MCP 配置
│   ├── windows-wsl/        # WSL 安装指南
│   ├── ralph-loop/         # Ralph Loop
│   ├── awesome-plugins-skills/  # 插件与 Skills 推荐
│   ├── LLM-wiki/           # LLM Wiki（Obsidian 知识库）
│   ├── cc-switch/          # cc-switch 配置切换
│   ├── terminal-tool/      # 终端工具与配置
│   └── stylesheets/
│       └── extra.css       # 自定义样式
├── overrides/
│   └── main.html           # 主题模板覆盖（noindex 等）
├── mkdocs.yml              # MkDocs 配置（含导航）
├── requirements.txt        # Python 依赖
└── .github/workflows/
    └── deploy.yml          # 自动部署
```

## 许可证

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

- 转载请注明作者和来源
- 禁止商业用途
- 修改后须以相同许可证分享
