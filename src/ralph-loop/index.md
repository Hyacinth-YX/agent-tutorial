# Ralph Loop

## 什么是 Ralph Loop

Ralph Loop 是一种循环调用 Claude 单次对话的范式，其核心目的是**解决长时间运行任务中的上下文腐烂（Context Rot）问题**。

在传统对话中，随着对话轮次增加，早期的重要信息可能被"遗忘"或稀释，导致 AI 的响应质量下降。Ralph Loop 通过每次启动全新的对话来执行任务，从而避免上下文累积带来的问题。

> Ralph Loop 并没有严格的官方实现，它更多是一种设计理念。网上有多种实现方式，本文介绍的是 [snarktank/ralph](https://github.com/snarktank/ralph) 这一较为流行的实现。

## 安装方式

该仓库提供了三种安装选项：

| 选项 | 类型 | 说明 |
|------|------|------|
| Option 1 | Shell 脚本 | 在 Claude 外层循环调用，每次都是全新对话 |
| Option 2 | Skill | 辅助生成符合格式的任务列表 |
| Option 3 | Plugin | 在对话内部循环调用，仍存在上下文累积风险 |

> **注意**：这三个选项并非互斥。对于长任务场景，推荐组合使用 **Option 1（Shell 脚本）** + **Option 2（Skills）**。
>
> **Shell 脚本方式**：在 Claude 外层通过命令循环调用，每次都是独立的新对话，从根本上避免了上下文腐烂。**Plugin 方式**：在单个对话内部循环调用，父对话会累积完整的运行上下文，因此理论上**仍然存在上下文腐烂的风险**，不适合超长时间运行的任务（但两种方法具体差异尚未测试）。

下面介绍 Shell 脚本方式的安装和使用。

## 安装步骤

### 1. 克隆仓库

```sh
git clone https://github.com/snarktank/ralph.git
```

### 2. 拷贝脚本文件

在项目目录下创建文件夹并拷贝所需文件：

```sh
# 在项目根目录下创建文件夹
mkdir -p scripts/ralph

# 拷贝主脚本
cp /path/to/ralph/ralph.sh scripts/ralph/

# 根据你使用的工具，拷贝对应的 prompt 模板
cp /path/to/ralph/prompt.md scripts/ralph/prompt.md    # Amp
# 或
cp /path/to/ralph/CLAUDE.md scripts/ralph/CLAUDE.md    # Claude Code

# 添加执行权限
chmod +x scripts/ralph/ralph.sh
```

### 3. 安装辅助 Skills

安装用于准备任务格式的技能（以 Claude Code 全局安装为例）：

```sh
cp -r skills/prd ~/.claude/skills/
cp -r skills/ralph ~/.claude/skills/
```

安装后，你将拥有两个技能：
- `/prd` - 用于规划拆解任务
- `/ralph` - 将计划转化为 Ralph 的 JSON 格式

## 使用流程

### 步骤 1：规划任务

首先调用 `/prd` 技能进行任务规划和拆解：

![](assets/fig/Pasted%20image%2020260303160142.png)

技能会根据你的描述提出一些澄清问题：

![](assets/fig/Pasted%20image%2020260303160242.png)

问答结束后会生成需求文档。如果对计划有不满意的地方，可以继续让它修改：

![](assets/fig/Pasted%20image%2020260303160316.png)

### 步骤 2：转换格式

确定计划后，调用 `/ralph` 命令将计划转换为 Ralph 所需的 JSON 格式：

![](assets/fig/Pasted%20image%2020260303160513.png)

### 步骤 3：执行任务

使用 Shell 脚本启动任务执行：

```sh
scripts/ralph/ralph.sh --tool claude 100
```

参数说明：
- `--tool claude` - 指定使用 Claude Code
- `100` - 最大迭代轮数上限（防止死循环消耗过多 token）

> 一般正常任务不会跑满 100 轮，可根据实际需求调整此数值。

![](assets/fig/Pasted%20image%2020260303160705.png)

### 监控执行进度

默认脚本不会输出对话记录。可以通过以下方式查看执行进度：
- 查看 `progress.txt` 文件
- 查看 Git 提交记录
如果要查看claude的对话输出理论上需要修改一下sh脚本，将claude输出存到某个地方。

![](assets/fig/Pasted%20image%2020260303161005.png)

## 补充说明

### 开始新任务前的注意事项

在开始一个新任务之前，需要先清理旧的任务文件：

```sh
rm prd.json progress.txt
```

或者在调用 `/prd` 和 `/ralph` 技能时，明确告诉 Claude **覆盖之前的文件**。

> **原因**：如果不清理旧文件，Shell 脚本执行时可能会读取到旧的任务计划，导致执行错误的内容。

另外是在不同项目中，创建的`prd.json` 和`progress.txt`的位置可能不一样。但这不影响读取，正常使用就好。

## 扩展资料

- [Ralph Loop 讲解与反思（Bilibili）](https://www.bilibili.com/video/BV16PrUBuENu/) - 关于ralph loop思路的讲解分享。中文翻译版本可能存在问题，也可以去 YouTube 查看原版。
