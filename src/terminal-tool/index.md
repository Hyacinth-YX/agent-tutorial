# 终端工具推荐

介绍几个提升终端体验的工具：**zellij**（终端复用）、**yazi**（文件浏览）、**helix**（编辑器），以及几个配合 Claude Code 使用的插件。

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
