# AGENTS.md - AI Agent Guidelines

> 本文件为 AI 编码代理提供此仓库的工作指南。

## 项目概述

这是一个 **AI Agent 教程仓库**，包含 OpenCode 等工具的安装、配置和使用指南。内容以 Markdown 为主，配合图片和配置文件。

### 主题覆盖
- OpenCode - 安装、配置、插件、使用技巧
- Claude Code - 安装、GLM 接入、使用技巧
- Vibe Paper - AI 辅助论文写作
- 终端工具与环境配置
- WSL 安装指南 - Windows 用户的 Linux 环境
- 更多主题按需添加

---

## 目录结构

```
agent-tutorial/
├── docs/                       # MkDocs 源文件
│   ├── index.md                # 全书简介（站点首页）
│   ├── opencode/
│   │   ├── index.md            # 主文档（统一为 index.md）
│   │   └── assets/
│   │       ├── fig/            # 截图、示意图
│   │       │   └── xxx.png
│   │       └── *.jsonc         # 配置模板文件
│   └── windows-wsl/
│       └── index.md
├── overrides/                  # MkDocs Material 模板覆盖
├── mkdocs.yml                  # MkDocs 配置（导航在 nav 中维护）
├── requirements.txt            # Python 依赖
├── README.md
└── AGENTS.md
```

**组织原则：**
- 每个专题一个文件夹，文件夹名使用 `kebab-case`
- 主文档统一为 `index.md`，如 `opencode/index.md`
- 图片存放在 `assets/fig/` 目录下
- 配置模板（如 `.jsonc`）放在 `assets/` 根目录

---

## 文件命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 专题文件夹 | `kebab-case` | `opencode/`, `windows-wsl/` |
| 主文档 | 统一为 `index.md` | `opencode/index.md` |
| 图片 | `descriptive-name.png` | `opencode-vscode-ext.png` |
| 配置模板 | `descriptive-name.jsonc` | `oh-my-opencode-template.jsonc` |

---

## Markdown 风格指南

### 标题
- 使用 ATX 风格（`#`, `##`, `###`）
- 每个文档只有一个 H1（标题）
- 标题前后保留空行

### 代码块
- 始终指定语言以启用语法高亮
- 使用围栏代码块（三个反引号）

````markdown
```bash
npm install opencode-ai
```

```json
{
  "plugin": ["oh-my-opencode"]
}
```
````

### 链接
- 内部引用使用相对路径
- 链接文本应描述目标内容

```markdown
参见 [WSL 安装指南](../windows-wsl/index.md)。
```

### 图片
- 存放在专题的 `assets/fig/` 目录
- 使用相对路径：`./assets/fig/xxx.png`
- 包含 alt 文本

```markdown
![VSCode 插件界面](./assets/fig/opencode-vscode-ext.png)
```

---

## 内容指南

### 文档结构

每个文档应包含（根据实际调整）：

1. **标题 & 简介** - 一句话说明本文内容
2. **前置条件** - 所需工具、版本
3. **正文** - 按逻辑分节，不必严格编号
4. **常见问题** - 实际遇到的问题和解决方案
5. **相关资源** - 外部链接、参考文档

### 写作风格

- **语言**：中文为主，代码/命令保持英文
- **人称**：使用第二人称（"你"、"你的"）
- **简洁**：句子简短，避免冗余
- **实用**：提供可执行的命令和配置示例
- **真实**：基于实际使用经验，包含具体推荐

### 配置示例

当提供配置文件示例时：
- 使用 `.jsonc` 格式（允许注释）
- 添加注释解释关键配置项
- 放在 `assets/` 目录并在正文中引用

### 截图

- 只截取相关区域
- 高亮重要元素（箭头、框）
- 使用 PNG 格式
- 控制文件大小（< 500KB）
- 发布前确认截图中无 API Key、账号邮箱、服务器地址等敏感信息

---

## 常用操作

### 添加新主题

1. 在 `docs/` 下创建文件夹，如 `docs/new-topic/`
2. 创建主文档 `docs/new-topic/index.md`
3. 创建 `assets/fig/` 目录存放图片
4. 在 `mkdocs.yml` 的 `nav` 中注册新页面（按内容归入合适的章节分组；MkDocs 只按 nav 组织导航）
5. 在 README.md 和 `docs/index.md` 的目录中添加链接

```
docs/
└── new-topic/
    ├── index.md
    └── assets/
        └── fig/
```

### 更新现有内容

1. 先完整阅读现有文件
2. 做最小化、聚焦的修改
3. 保持与现有风格一致
4. 验证所有链接有效

---

## 质量检查清单

提交前确认：

- [ ] Markdown 渲染正确
- [ ] 所有链接有效
- [ ] 图片正确显示
- [ ] 代码/命令已验证可用
- [ ] 配置示例格式正确
- [ ] 已添加到 `mkdocs.yml` 的 `nav`
- [ ] 已添加到 README 和 `docs/index.md` 索引
- [ ] `mkdocs build` 无警告无报错

---

## AI Agent 注意事项

1. **保持现有结构** - 未经要求不要重组目录
2. **匹配现有风格** - 阅读相近文件了解语气和格式
3. **验证代码** - 确保命令和配置实际可用
4. **使用相对路径** - 便于跨克隆移植
5. **图片放对位置** - 在 `assets/fig/` 目录下
6. **更新交叉引用** - 添加/删除文件时更新 `mkdocs.yml` 的 `nav`、README、`index.md` 中的相关链接

---

## 预览方式

本项目基于 MkDocs（Material 主题）构建：

```bash
# 安装依赖（建议使用虚拟环境）
pip install -r requirements.txt

# 本地预览（http://127.0.0.1:8000）
mkdocs serve

# 构建静态站点到 site/
mkdocs build
```
