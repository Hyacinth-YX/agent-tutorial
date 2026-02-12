# AI Agent 教程

> AI Agent 开发与使用教程，基于 mdBook 构建。

## 目录

- [OpenCode](./src/opencode/index.md) - AI 编程助手的安装、配置与使用
- [WSL 安装](./src/windows-wsl/index.md) - Windows 用户的 Linux 环境配置

## 本地预览

### 前置条件

- [mdBook](https://github.com/rust-lang/mdBook) - 安装：`cargo install mdbook`
- Node.js 18+（如需加密）

### 构建与预览

```bash
# 预览（不加密）
mdbook serve

# 构建
mdbook build

# 构建并加密（需要设置密码）
mdbook build && node scripts/encrypt.js YOUR_PASSWORD ./book
```

## 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署，支持密码保护。

### 设置步骤

1. **启用 GitHub Pages**
   - 仓库 Settings → Pages → Source: GitHub Actions

2. **设置加密密码**
   - 仓库 Settings → Secrets and variables → Actions
   - 添加 `MDBOOK_PASSWORD` secret
   - 如不设置密码，将部署未加密版本

3. **推送代码**
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
│   └── decrypt.js          # 解密脚本
├── scripts/
│   └── encrypt.js          # 加密脚本
├── book.toml               # mdBook 配置
└── .github/workflows/
    └── deploy.yml          # 自动部署
```

## 修改密码

1. 更新 GitHub Secrets 中的 `MDBOOK_PASSWORD`
2. 重新触发 Actions（手动或推送新提交）

## 许可证

MIT
# Build: Thu Feb 12 23:29:16 CST 2026
