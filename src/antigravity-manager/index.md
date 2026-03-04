# Antigravity Manager 使用指南

本章节介绍如何使用 Antigravity Manager 管理多个账号额度，并为 Claude Code 提供稳定的 API 反代理服务。

如果你拥有 Antigravity 账号，可以通过该工具将其额度无缝接入 Claude Code。

> [!CAUTION] 风险提示
> 本工具本质上是通过反向代理调用接口。该方式并非官方原生支持，请务必合理控制用量。**强烈建议使用测试小号进行操作**，避免因账号风控导致核心资产损失。

## 主要功能

- **多账号管理**：实时监控多个账号的剩余额度。
  ![账号额度查看](./assets/fig/Pasted%20image%2020260304202751.png)
- **快速切换**：在不同 Antigravity 账号间一键切换。
- **接口代理**：将 Antigravity 转换为标准 API 接口，供第三方应用调用。
  ![反代接口配置](assets/fig/Pasted%20image%2020260304202945.png)

## 前置条件

- 本地电脑已配置好 Antigravity 环境。
- 拥有可正常使用的 Antigravity 账号（支持 OAuth 认证）。

## 安装方式

根据你的操作系统执行以下命令进行安装：

```bash
# Linux
curl -fsSL https://raw.githubusercontent.com/lbjlaq/Antigravity-Manager/v4.1.28/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/lbjlaq/Antigravity-Manager/main/install.ps1 | iex

# MacOS (Homebrew)
# 1. 订阅仓库 Tap
brew tap lbjlaq/antigravity-manager https://github.com/lbjlaq/Antigravity-Manager
# 2. 安装应用
brew install --cask antigravity-tools
```

**提示**: 在 MacOS 安装过程中如果遇到权限问题，可以尝试添加 `--no-quarantine` 参数。

---

## 基本配置

### 1. 添加账户
安装完成后，按照首页说明点击“添加账户”并完成 OAuth 授权。
![授权界面](./assets/fig/Pasted%20image%2020260304203943.png)

### 2. 开启 API 反代
切到 **API 反代** 标签页：
1. 开启“启用”开关。
2. 建议勾选“跟随应用自动启动”。
3. 此时，本地 8045 端口即可提供服务。

### 3. 同步 Claude Code 配置
点击下方的 **CLI 配置一键同步**，通过“同步配置”按钮自动更新 `~/.claude/settings.json`。

> [!TIP] 模型选择
> 请确保选择了当前支持的模型，例如 `Gemini 3.1 Pro`。

![配置一键同步](./assets/fig/Pasted%20image%2020260304204241.png)

---

## 进阶使用

### 验证状态
配置完成后，你可以在 Claude Code 中输入任何指令，并在 Antigravity Manager 的“流量日志”中查看请求记录。
![流量日志](./assets/fig/Pasted%20image%2020260304204435.png)

### 切换模型
在 Claude Code 中，你可以使用 `/model <model-id>` 切换模型。所有支持的 ID 可以在 **API 反代** 标签页的最下方找到并点击复制。
![复制模型 ID](./assets/fig/Pasted%20image%2020260304204612.png)

### 模型别名映射
你可以在 `~/.claude/settings.json` 中设置模型映射，从而通过简单的 `opus` 或 `sonnet` 命令切换到你定义的模型：

```jsonc
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_api_key",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:8045",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    // 将标准模型别名映射到特定的后端模型 ID
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-6-thinking",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "gemini-3.1-pro-high",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "gemini-3-flash"
  },
  "permissions": {},
  "skipDangerousModePermissionPrompt": true
}
```

---

## 远程服务器接入 (SSH 端口转发)

如果你希望在远程服务器上调用本地的 Antigravity 代理，可以通过 SSH 端口转发（Reverse Tunneling）实现。

1. **Manager 配置**：在 **API 反代** 标签页中开启“允许局域网访问”，并重启服务。
2. **SSH 配置**：在修改本地的 `~/.ssh/config`，添加 `RemoteForward` 指令。

```sshconfig
Host My-Remote-Server
    HostName xxx.xx.x.xx
    User your_username
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ForwardAgent yes
    # 将服务器的 8045 端口转发到本地的 8045 端口
    RemoteForward 8045 localhost:8045

    # 保持连接活跃
    ServerAliveInterval 30
    ServerAliveCountMax 10
    TCPKeepAlive yes
```

通过这种方式，无论你是在终端通过 `ssh` 登录还是使用 VS Code Remote 连接，远程环境都能像访问本地服务一样使用 `http://127.0.0.1:8045`。
