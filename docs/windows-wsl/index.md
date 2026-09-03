# WSL 安装指南

> 在 Windows 上安装 WSL (Windows Subsystem for Linux) 运行 Linux 环境。

## 前置条件

- Windows 10 版本 2004+ (Build 19041+) 或 Windows 11
- 64 位系统
- BIOS 中启用虚拟化 (Intel VT-x / AMD-V)

## 方式一：命令行安装（推荐）

### 1. 检查 Windows 版本

按 `Win + R`，输入 `winver`，确认版本 ≥ 19041。

### 2. 安装 WSL + Ubuntu

以**管理员身份**打开 PowerShell，执行：

```powershell
wsl --install -d Ubuntu
```

### 3. 重启电脑

安装完成后重启系统。

### 4. 初始化 Ubuntu

重启后**手动打开 Ubuntu**（在开始菜单搜索 "Ubuntu"）：

1. 首次启动会进行系统初始化，等待完成
2. 设置用户名（小写，无空格）
3. 设置密码（输入时不显示，正常）

### 5. 更新系统

进入 Ubuntu 后执行：

```bash
sudo apt update && sudo apt upgrade -y
```

## 方式二：手动下载安装

如果命令行安装受网络限制，可手动下载安装包。

### 1. 启用 WSL 功能

以**管理员身份**打开 PowerShell：

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

### 2. 重启电脑

### 3. 下载 Linux 发行版

访问 [Microsoft Store](https://apps.microsoft.com/store/search?publisher=Canonical%20Group%20Limited) 或直接下载离线包：

- [Ubuntu 22.04 LTS](https://aka.ms/wslubuntu2204)
- [Ubuntu 24.04 LTS](https://aka.ms/wslubuntu2404)

下载 `.appx` 文件后双击安装。

### 4. 初始化

从开始菜单启动 Ubuntu，按提示设置用户名和密码。

### 5. 更新系统

```bash
sudo apt update && sudo apt upgrade -y
```

## 常见问题

### 命令行安装卡在 0%

尝试使用 `--web-download` 参数：

```powershell
wsl --install --web-download -d Ubuntu
```

或使用方式二手动下载安装。

### 虚拟化未启用

1. 重启电脑进入 BIOS（通常按 F2 / F12 / Del）
2. 找到 Virtualization / VT-x / AMD-V 选项
3. 设为 Enabled

### WSL 命令无响应

确保 Windows 版本满足要求，并已启用虚拟机平台功能：

```powershell
# 检查 WSL 状态
wsl --status

# 设置 WSL 2 为默认版本
wsl --set-default-version 2
```

### 重启后没有自动弹出 Ubuntu

手动打开：在开始菜单搜索 "Ubuntu" 并启动。

## 常用命令

```bash
# 查看已安装的发行版
wsl -l -v

# 进入 WSL
wsl

# 指定发行版进入
wsl -d Ubuntu

# 关闭 WSL
wsl --shutdown

# 安装其他发行版
wsl --list --online          # 查看可用发行版
wsl --install -d Debian      # 安装 Debian
```

