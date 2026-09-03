# cc-switch — 多工具配置切换

[cc-switch-cli](https://github.com/saladday/cc-switch-cli) 是 CC-Switch 的命令行版本，可以在 Claude Code、Codex、Gemini、OpenCode 等编码工具之间统一管理和快速切换 API 配置（供应商、Key、模型等），支持交互式 TUI 和脚本化调用。

适合同时使用多家 API 供应商、需要频繁切换配置的场景。

## 安装（Linux）

```bash
# 下载
curl -LO https://github.com/saladday/cc-switch-cli/releases/latest/download/cc-switch-cli-linux-x64-musl.tar.gz

# 解压
tar -xzf cc-switch-cli-linux-x64-musl.tar.gz

# 添加执行权限
chmod +x cc-switch

# 安装到用户 bin 目录（无需 sudo）
mkdir -p ~/.local/bin
mv cc-switch ~/.local/bin/

# 确保 ~/.local/bin 在 PATH 中
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

> 如果希望全局安装（所有用户可用），改用 `sudo mv cc-switch /usr/local/bin/`。

安装完成后直接运行 `cc-switch` 进入交互界面，按提示添加和切换配置即可。

## 相关资源

- [cc-switch-cli GitHub](https://github.com/saladday/cc-switch-cli)
