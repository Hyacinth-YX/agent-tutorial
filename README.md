# AI Agent 教程

> AI Agent 开发与使用教程，基于 mdBook 构建。

## 目录

- [OpenCode](./src/opencode/index.md) - AI 编程助手的安装、配置与使用
- [WSL 安装](./src/windows-wsl/index.md) - Windows 用户的 Linux 环境配置

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
│   └── windows-wsl/        # WSL 安装指南
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
