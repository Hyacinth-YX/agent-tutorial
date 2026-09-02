# 终端工具与配置

本地终端（WezTerm）与远程服务器的完整配置：WezTerm 核心设置、Nerd Fonts 图标字体、zellij / yazi / helix 终端工具、tmux 配置，以及配合 Claude Code 使用的插件。

## WezTerm 核心配置说明

WezTerm 用 Lua 脚本配置，Windows 下配置文件为 `C:\Users\<用户名>\.wezterm.lua`（即 `~/.wezterm.lua`），保存后立即生效，无需重启。

设计目标：

- 一个 Launcher 统一管理 PowerShell / WSL / 所有 SSH 主机
- 配合 Claude Code 等 AI 工具的使用习惯（Shift+Enter 换行、粘贴换行处理）
- 中文输入法与字体的兼容

> 完整配置见文末附录。

### Launch Menu 自动读取 SSH 配置

`Ctrl+Shift+L` 打开 Launcher，可以直接选择 PowerShell、两种 WSL 入口、以及 `~/.ssh/config` 里配置的所有 SSH 主机——**新增 SSH 主机后无需改任何 WezTerm 配置**。

之所以自己写 `read_ssh_config_in_order()` 解析，是因为 WezTerm 内置的 SSH 域解析会丢失主机顺序，还会带入通配符条目；配合 `config.ssh_domains = {}` 关掉默认域，避免 Launcher 里出现重复入口。

### Shift+Enter 换行（Claude Code 必备）

```lua
{ mods = 'SHIFT', key = 'Enter', action = act.SendString '\u{001B}\n' },
```

Claude Code 这类 TUI 程序靠 `ESC + \n` 序列识别"软换行"。没有这一行，在 Claude Code 里按 Shift+Enter 会直接提交输入，没法写多行 prompt。

### 粘贴换行符统一为 LF

```lua
config.canonicalize_pasted_newlines = "LineFeed"
```

Windows 剪贴板里的换行是 CRLF，粘贴到 SSH 会话中的 vim、Claude Code 时会产生诡异的空行。统一转成 LF 后问题解决。

### Leader 键体系（Alt+z）

把 tmux 风格的键位搬进了本地终端，不开 tmux 也有类似体验：

| 快捷键 | 作用 |
|--------|------|
| `Alt+z` 然后 `s` / `w` | 新建 / 关闭标签页 |
| `Alt+z` 然后 `\` / `-` | 水平 / 垂直分屏 |
| `Alt+z` 然后 `x` | 关闭当前窗格 |
| `Alt+z` 然后 `Shift+R` | 重命名标签页 |
| `Alt+方向键` | 在分屏间移动焦点 |
| `Alt+1` ~ `Alt+9` | 按编号跳转标签页 |
| `Ctrl+Tab` | 循环切换标签页 |

### 字体 fallback

首选 `JetBrainsMono Nerd Font`（支持图标显示，配合下面的 Nerd Fonts 一节），逐级回退到 JetBrains Mono、Cascadia Code、Consolas，最后用微软雅黑兜底中文。

### 中文输入法兼容

```lua
config.use_ime = true
config.allow_win32_input_mode = false
```

win32 input mode 下中文输入法的预编辑和候选框容易出问题，关闭后走系统 IME 更稳定。

### 其他实用项

- `window_decorations = "RESIZE"`：隐藏标题栏，界面更干净
- `hide_tab_bar_if_only_one_tab = true`：单标签页时不显示 Tab 栏
- `scrollback_lines = 10000`：长回滚缓冲，配合 Claude Code 的长输出回看
- `window_close_confirmation = "NeverPrompt"`：关窗口不弹确认
- `adjust_window_size_when_changing_font_size = false`：调字号时窗口大小不变

## 安装 Nerd Fonts（支持图标渲染）

yazi 等工具会用图标显示文件类型，需要终端字体支持。目前最流行的是 [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts/releases)，安装非常简单：

1. **下载字体包**：直接下载官方打包好的 [JetBrainsMono.zip](https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip)

   ![Nerd Fonts 下载页面](./assets/fig/nerd-fonts-download.png)

2. **解压文件**：解压 zip 包，会看到一堆以 `.ttf` 结尾的字体文件。

3. **一键安装到 Windows**：
   - 打开解压后的文件夹
   - **全选**（`Ctrl + A`）里面所有的 `.ttf` 文件
   - **右键点击**，选择 **"安装"**（或者"为所有用户安装"）
   - 等待几秒钟，Windows 进度条跑完就装好了

安装后记得在终端设置里把字体切换为 `JetBrainsMono Nerd Font`（WezTerm 配置已默认使用）。

## zellij — 新一代终端复用器

仓库：[zellij-org/zellij](https://github.com/zellij-org/zellij)

一般安装在远程服务器上使用；本地终端想用的话，也可以去 release 页面下载对应系统的版本。以下以 Linux 为例：

```sh
# 确定系统架构
arch   # 可能输出 x86_64 或 aarch64

# 去最新的 release 页面找到对应架构的二进制包，以 x86_64 为例
wget https://github.com/zellij-org/zellij/releases/latest/download/zellij-x86_64-unknown-linux-musl.tar.gz

# 解压
tar -xzf zellij-x86_64-unknown-linux-musl.tar.gz

# 方法一：单用户安装（推荐，无需 sudo）
mkdir -p ~/.local/bin
mv zellij ~/.local/bin/

# 如果找不到命令，把 ~/.local/bin 加入 PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 方法二：全局安装（所有用户可用）
sudo mv zellij /usr/local/bin/

# 验证安装
zellij --version
```

## yazi — 高性能文件浏览工具

仓库：[sxyazi/yazi](https://github.com/sxyazi/yazi)

```sh
# 下载
curl -fsSL https://github.com/sxyazi/yazi/releases/latest/download/yazi-x86_64-unknown-linux-musl.zip -o yazi.zip

# 解压
unzip yazi.zip

# 方法一：当前用户安装
mv yazi-x86_64-unknown-linux-musl/yazi ~/.local/bin/
mv yazi-x86_64-unknown-linux-musl/ya ~/.local/bin/

# 方法二：全局安装
sudo mv yazi-x86_64-unknown-linux-musl/yazi /usr/local/bin/
sudo mv yazi-x86_64-unknown-linux-musl/ya /usr/local/bin/

# 移除安装包
rm -rf yazi.zip yazi-x86_64-unknown-linux-musl

# 安装扩展依赖，支持预览 / 搜索 / 压缩
sudo apt update && sudo apt install -y ffmpegthumbnailer poppler-utils imagemagick fd-find ripgrep fzf zoxide p7zip-full unzip zip jq bat exiftool mediainfo
```

上面依赖包的作用：

- `poppler-utils`：PDF 预览
- `imagemagick`：图片预览
- `ffmpegthumbnailer`：视频缩略图
- `bat`：代码高亮预览
- `fd` / `rg`：超快文件 / 内容搜索
- `7zip`：压缩解压
- `mediainfo` / `exiftool`：文件信息预览

## helix — 终端文件编辑器

仓库：[helix-editor/helix](https://github.com/helix-editor/helix)

```sh
wget https://github.com/helix-editor/helix/releases/download/25.07.1/helix-25.07.1-x86_64-linux.tar.xz
tar -xJf helix-25.07.1-x86_64-linux.tar.xz
mv helix-25.07.1-x86_64-linux/ ~/.local/share/helix
ln -s ~/.local/share/helix/hx ~/.local/bin/hx
```

helix 的基本操作与 vim 很像，但是更加现代方便：一样使用 `i` 进入插入模式，`Esc` 退出到正常模式；用 `g` 可以快速跳转，按空格有很多选项，按 `:` 可以使用与 vim 类似的操作。

运行 `hx --tutor` 可以进入内置教程快速熟悉工具。

## tmux 鼠标与复制配置

编辑 `~/.tmux.conf`：

```sh
# 开启鼠标支持（可选，方便拖拽复制）
set -g mouse on

# 开启 vim 格式
setw -g mode-keys vi

# 允许 tmux 将序列传递给外部终端
set -s set-clipboard on

# 如果你使用的是 tmux 3.2 或更高版本，建议设置以下项以增强兼容性
set -as terminal-features ',xterm-256color:clipboard'
```

使用 Claude Code 时经常想复制很长一段跨页的内容，可以通过 tmux 内置的复制模式做到：

1. 上划滚轮进入历史模式（或者按 `Ctrl+B` 再按 `[`）
2. 找到想要的内容起点，按一下**空格**进入选择模式
3. 一直选择到目标位置，按**回车**复制到剪贴板

配置生效后，复制的内容可以直接传输到本地电脑的剪贴板中。

## 配合 Claude Code 的插件

### zellij-claude-teams

在 zellij 中使用 Claude Code teams 的 shim 插件。

仓库：https://github.com/stanislc/zellij-claude-teams

```sh
git clone https://github.com/stanislc/zellij-claude-teams.git
cd zellij-claude-teams
bash install.sh
```

### autoresearch

封装好的自动化调研工具。

仓库：https://github.com/uditgoenka/autoresearch

```sh
/plugin marketplace add uditgoenka/autoresearch
/plugin install autoresearch@autoresearch
/autoresearch
```

### codex-plugin-cc

OpenAI 官方的 Claude Code 插件，可以在 Claude Code 中使用 Codex。

仓库：https://github.com/openai/codex-plugin-cc

```sh
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
```

> **注意**：需要提前安装好 Codex，能够在命令行中使用。

## 附录：完整 WezTerm 配置

以上说明对应的完整 `~/.wezterm.lua`：

```lua
local wezterm = require("wezterm")
local config = wezterm.config_builder()

-- 关闭字体缺失警告
config.warn_about_missing_glyphs = false

-- 默认 Shell：PowerShell
config.default_prog = { "powershell.exe", "-NoLogo" }

-- ==============================================
-- 自己解析 ~/.ssh/config → 严格保留原始顺序
-- ==============================================
local function read_ssh_config_in_order()
    local hosts = {}
    local ssh_config = wezterm.home_dir .. "/.ssh/config"

    -- 打开文件逐行读取
    local f = io.open(ssh_config, "r")
    if not f then return hosts end

    for line in f:lines() do
        -- 匹配 Host 开头（非通配符、非注释）
        local host = line:match("^Host%s+([^%*%?#]+)%s*$")
        if host and host ~= "*" then
            table.insert(hosts, host)
        end
    end
    f:close()

    return hosts
end

-- ─── Launch Menu：PowerShell / WSL / SSH ──────
local launch_menu = {
  { label = "PowerShell", args = { "powershell.exe", "-NoLogo" } },
  { label = "WSL (Windows目录)", args = { "wsl.exe", "--cd", "/mnt/c/Users/clear" } },
  { label = "WSL (Linux目录)",   args = { "wsl.exe", "--cd", "~" } },
}

local ssh_hosts = read_ssh_config_in_order()

for _, host in ipairs(ssh_hosts) do
    table.insert(launch_menu, {
        label = "SSH: " .. host,
        args = { "ssh", host }
    })
end

config.launch_menu = launch_menu

-- 关闭默认 ssh 域避免与 Launch Menu 冲突
config.ssh_domains = {}
config.ssh_backend = "Ssh2"
config.mux_enable_ssh_agent = false

-- 调整字号时不改变窗口大小
config.adjust_window_size_when_changing_font_size = false

-- 主题配色
config.color_scheme = "tokyonight_night"
-- 备选：Catppuccin Latte（亮色）/ Catppuccin Mocha / GitHub

-- 强制将粘贴内容中的换行符转换为 Linux 风格 (LF)
-- 这能极大减少从 Windows 复制到 SSH 时产生的诡异空行
config.canonicalize_pasted_newlines = "LineFeed"

-- ─── 字体 ─────────────────────────────────────
config.font = wezterm.font_with_fallback({
  "JetBrainsMono Nerd Font",
  "JetBrains Mono",
  "Cascadia Code",
  "Consolas",
  "Microsoft YaHei",
})
config.font_size = 12.0
config.line_height = 1.0

-- ─── 窗口外观 ─────────────────────────────────
config.window_background_opacity = 1.0
config.win32_system_backdrop = "Disable"
config.window_decorations = "RESIZE"  -- 隐藏标题栏，保留调整大小边框
config.window_padding = { left = 10, right = 10, top = 8, bottom = 8 }
config.window_close_confirmation = "NeverPrompt"

-- ─── 输入法相关 ───────────────────────────────
config.use_ime = true
config.allow_win32_input_mode = false

-- ─── Tab 栏 ───────────────────────────────────
config.enable_tab_bar = true
config.use_fancy_tab_bar = true
config.tab_bar_at_bottom = false
config.hide_tab_bar_if_only_one_tab = true
config.tab_max_width = 32

config.scrollback_lines = 10000
config.selection_word_boundary = " \t\n{}[]()\"'`"

-- ─── 快捷键 ───────────────────────────────────
-- 说明：WezTerm 本身无法注册系统级全局热键来启动自身。
-- 推荐方案：右键 WezTerm 快捷方式 → 属性 → 快捷键，设置 Ctrl+Alt+T 即可全局唤起。

local act = wezterm.action

-- Leader 键：Alt+z，1 秒超时
config.leader = { key = "z", mods = "ALT", timeout_milliseconds = 1000 }

config.keys = {
  -- Shift+Enter 发送 ESC+换行，TUI 程序（如 Claude Code）靠它识别软换行
  { mods = 'SHIFT', key = 'Enter', action = act.SendString '\u{001B}\n' },

  -- 新建 / 关闭标签页：Leader + s / w
  { key = "s", mods = "LEADER", action = act.SpawnTab("CurrentPaneDomain") },
  { key = "w", mods = "LEADER", action = act.CloseCurrentTab({ confirm = false }) },

  -- 切换标签页：Ctrl+Tab / Ctrl+Shift+Tab
  { key = "Tab", mods = "CTRL",       action = act.ActivateTabRelative(1) },
  { key = "Tab", mods = "CTRL|SHIFT", action = act.ActivateTabRelative(-1) },

  -- 按编号直接跳转标签页：Alt+1 ~ Alt+9
  { key = "1", mods = "ALT", action = act.ActivateTab(0) },
  { key = "2", mods = "ALT", action = act.ActivateTab(1) },
  { key = "3", mods = "ALT", action = act.ActivateTab(2) },
  { key = "4", mods = "ALT", action = act.ActivateTab(3) },
  { key = "5", mods = "ALT", action = act.ActivateTab(4) },
  { key = "6", mods = "ALT", action = act.ActivateTab(5) },
  { key = "7", mods = "ALT", action = act.ActivateTab(6) },
  { key = "8", mods = "ALT", action = act.ActivateTab(7) },
  { key = "9", mods = "ALT", action = act.ActivateTab(8) },

  -- 分屏：Leader + \ 水平分屏 / Leader + - 垂直分屏
  { key = "\\", mods = "LEADER", action = act.SplitHorizontal({ domain = "CurrentPaneDomain" }) },
  { key = "-",  mods = "LEADER", action = act.SplitVertical({ domain = "CurrentPaneDomain" }) },

  -- 关闭当前窗格：Leader + x
  { key = "x", mods = "LEADER", action = act.CloseCurrentPane({ confirm = false }) },

  -- 调整窗格大小：Leader + Shift + 方向键
  { key = "LeftArrow",  mods = "LEADER|SHIFT", action = act.AdjustPaneSize({ "Left", 5 }) },
  { key = "RightArrow", mods = "LEADER|SHIFT", action = act.AdjustPaneSize({ "Right", 5 }) },
  { key = "UpArrow",    mods = "LEADER|SHIFT", action = act.AdjustPaneSize({ "Up", 5 }) },
  { key = "DownArrow",  mods = "LEADER|SHIFT", action = act.AdjustPaneSize({ "Down", 5 }) },

  -- 在分屏间移动焦点：Alt + 方向键
  { key = "LeftArrow",  mods = "ALT", action = act.ActivatePaneDirection("Left") },
  { key = "RightArrow", mods = "ALT", action = act.ActivatePaneDirection("Right") },
  { key = "UpArrow",    mods = "ALT", action = act.ActivatePaneDirection("Up") },
  { key = "DownArrow",  mods = "ALT", action = act.ActivatePaneDirection("Down") },

  -- 全屏切换
  { key = "F11", action = act.ToggleFullScreen },

  -- 字体大小：Ctrl + = / - / 0
  { key = "=", mods = "CTRL", action = act.IncreaseFontSize },
  { key = "-", mods = "CTRL", action = act.DecreaseFontSize },
  { key = "0", mods = "CTRL", action = act.ResetFontSize },

  -- Launcher：选择 PowerShell / WSL / SSH
  { key = "L", mods = "CTRL|SHIFT", action = act.ShowLauncherArgs({ flags = "LAUNCH_MENU_ITEMS|TABS" }) },

  -- 重命名当前标签页：Leader + Shift + R
  {
    key = "r",
    mods = "LEADER|SHIFT",
    action = act.PromptInputLine {
      description = "为当前标签页输入新名称:",
      action = wezterm.action_callback(function(window, pane, line)
        if line then
          window:active_tab():set_title(line)
        end
      end),
    },
  },
}

return config
```
