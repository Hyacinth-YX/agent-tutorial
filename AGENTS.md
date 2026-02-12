# AGENTS.md - AI Agent Guidelines

> This file provides instructions for AI coding agents working in this repository.

## Project Overview

This is a **documentation repository** containing tutorials and guides about AI agent development and usage. Content is primarily in Markdown format with supporting images.

### Topics Covered
- OpenCode - installation, configuration, usage
- Claude Code - setup and workflows
- Agent development tips and techniques
- Troubleshooting common issues
- Best practices for working with AI agents

---

## Directory Structure

每个专题一个文件夹，包含同名主文档和资产文件夹：

```
agent-tutorial/
├── docs/
│   ├── opencode/
│   │   ├── opencode.md      # 主文档
│   │   └── assets/          # 图片等资源
│   └── claude-code/
│       ├── claude-code.md
│       └── assets/
├── README.md
└── AGENTS.md
```

**组织原则：**
- 每个专题一个文件夹，文件夹名使用 `kebab-case`
- 主文档与文件夹同名，如 `opencode/opencode.md`
- 图片存放在同级的 `assets/` 目录下，路径简短：`./assets/xxx.png`
- 只有当文档过长时才拆分为多个子文档

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Topic folders | `kebab-case` | `opencode/`, `claude-code/` |
| Main document | 与文件夹同名 | `opencode/opencode.md` |
| Images | `descriptive-name.png` | `config-screen.png` (无需前缀) |

---

## Markdown Style Guidelines

### Headings
- Use ATX-style headings (`#`, `##`, `###`)
- Only one H1 per document (title)
- Include blank line before and after headings

```markdown
# Document Title

## Section

### Subsection
```

### Code Blocks
- Always specify language for syntax highlighting
- Use fenced code blocks (triple backticks)

````markdown
```bash
npm install opencode
```

```typescript
const agent = new Agent();
```
````

### Links
- Use relative links for internal references
- Use descriptive link text

```markdown
See the [OpenCode guide](../opencode/opencode.md) for details.
```

### Images
- Store images in the topic's `assets/` folder
- Use relative paths: `./assets/filename.png`
- Include alt text for accessibility

```markdown
![Configuration screen](./assets/config-screen.png)
```

### Lists
- Use `-` for unordered lists
- Use `1.` for ordered lists
- Indent nested items with 2 spaces

---

## Content Guidelines

### Tutorial Structure
每个教程文档应包含以下小节（根据实际内容调整）：

1. **标题 & 简介** - 概述本文涵盖的内容
2. **前置条件** - 所需工具、版本、知识
3. **步骤** - 编号的顺序指令
4. **验证** - 如何确认操作成功
5. **常见问题** - 常见问题及解决方法
6. **下一步** - 相关主题或进阶内容

### Tone & Style
- 使用简洁清晰的中文
- 使用第二人称（"你"、"你的"）
- 句子要简短
- 尽可能提供示例
- 避免不加解释的术语

### Screenshots
- 只截取相关区域
- 高亮重要元素（箭头、框）
- 使用 PNG 格式
- 控制文件大小（< 500KB）

---

## Common Tasks

### Adding a New Topic

1. 在 `docs/` 下创建专题文件夹，如 `docs/new-agent/`
2. 创建主文档 `new-agent.md`
3. 创建 `assets/` 文件夹存放图片
4. 在 README.md 中添加链接

```
docs/
└── new-agent/
    ├── new-agent.md
    └── assets/
```

### Updating Existing Content

1. 先完整阅读现有文件
2. 做最小化、聚焦的修改
3. 如有 "Last updated" 日期则更新
4. 验证所有链接仍然有效

### Splitting Long Documents

只有当文档过长时才拆分：
1. 在专题文件夹内创建子文档
2. 保持主文档作为入口，链接到子文档
3. 所有子文档共用同一个 `assets/` 目录

---

## Quality Checklist

提交内容前，确认：

- [ ] Markdown 渲染正确
- [ ] 所有链接有效
- [ ] 图片正确显示
- [ ] 代码示例已测试可用
- [ ] 拼写和语法检查
- [ ] 遵循命名规范
- [ ] 已添加到 README 索引

---

## Notes for AI Agents

1. **保持现有结构** - 未经明确要求不要重组
2. **匹配现有风格** - 阅读相近文件了解语气
3. **测试所有代码块** - 确保命令实际可用
4. **使用相对路径** - 便于跨克隆移植
5. **图片放对位置** - 在 topic 的 `assets/` 目录下
6. **更新交叉引用** - 添加/删除文件时更新相关链接

---

## Preview Commands

静态文档仓库，无需构建。预览方式：

```bash
# 使用 grip (GitHub 风格 Markdown)
pip install grip
grip README.md

# VS Code
# 安装 "Markdown Preview Enhanced" 扩展

# 在 GitHub 上直接查看
```
