# 插件与 Skills 推荐

收集一些好用的 Agent 插件与 Skills，主要覆盖 Claude Code 和 Codex CLI。

## 插件

### superpowers

仓库：https://github.com/obra/superpowers

为 Agent 提供一套完整工作流技能的插件框架（头脑风暴、计划、测试驱动开发等）。

**Claude Code 安装：**

```sh
# Claude Code Official Marketplace
/plugin install superpowers@claude-plugins-official
```

**Codex CLI 安装：**

```sh
# 打开插件搜索界面
/plugins
# 搜索 Superpowers，选择 Install Plugin
```

### autoresearch

仓库：https://github.com/uditgoenka/autoresearch

封装好的自动化调研工具，提供完整的深度研究流程。

**Claude Code 安装：**

```sh
# 在 Claude Code 中添加
/plugin marketplace add uditgoenka/autoresearch
/plugin install autoresearch@autoresearch

# 更新
/plugin update autoresearch
```

**Codex 安装：**

```sh
git clone https://github.com/uditgoenka/autoresearch.git
cd autoresearch
./scripts/install.sh --codex --global
```

### 飞书 CLI

官方介绍：https://www.feishu.cn/content/article/7623291503305083853

```sh
# 手动安装
npx @larksuite/cli@latest install
```

也可以让 AI 自动安装，直接把下面的内容发给 Agent：

```text
帮我安装飞书 CLI: https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md
```

## Skills

### MinerU 文档解析

PDF / 文档解析 Skill，可以把复杂文档转成干净的 Markdown。

- Skill 仓库：https://github.com/Nebutra/MinerU-Skill
- 安装命令：`npx skills add Nebutra/MinerU-Skill`
- 必要环境变量：`export MINERU_TOKEN="your-token-here"`
- Token 申请地址：https://mineru.net/apiManage/token
