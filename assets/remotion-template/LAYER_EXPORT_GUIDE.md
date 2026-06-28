# 强分层导出说明

这个 Remotion 项目现在有两种渲染方式：

1. 完整预览层：所有元素合在一起，用来看成片效果。
2. 单独图层：背景、标题、卡片、文档、流程、数字、字幕分别渲染，方便后期在剪映 / AE / Final Cut / Keynote 里叠加。

## Composition 列表

第一条视频：

```text
AiLazyCore
AiLazyCore-Background
AiLazyCore-Headers
AiLazyCore-Titles
AiLazyCore-Cards
AiLazyCore-Documents
AiLazyCore-Workflow
AiLazyCore-Kpis
AiLazyCore-Subtitles
```

第二条视频：

```text
InterviewTranscriptAI
InterviewTranscriptAI-Background
InterviewTranscriptAI-Headers
InterviewTranscriptAI-Titles
InterviewTranscriptAI-Cards
InterviewTranscriptAI-Documents
InterviewTranscriptAI-Workflow
InterviewTranscriptAI-Kpis
InterviewTranscriptAI-Subtitles
```

## 推荐后期叠放顺序

从底到顶：

```text
1. Background
2. Documents
3. Cards
4. Workflow
5. Kpis
6. Titles
7. Headers
8. Subtitles
```

## 在 Remotion Studio 里检查

```bash
cd /Users/wuinspiratio/Documents/Codex/2026-06-16/new-chat/work/remotion-prototype
npm run dev
```

打开 Studio 后，左侧选择任意 Composition。比如：

```text
AiLazyCore-Titles
```

就只会看到标题层，不会看到背景和字幕。

如果遇到 localhost 没响应，先停掉旧的 Remotion 进程，再重启。当前脚本已固定使用 IPv4 和 3001 端口：

```bash
npm run dev
```

如果 3001 被占用，可以临时手动换端口：

```bash
npx remotion studio --port=3002 --ipv4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

## 后期导出建议

如果你只想快速得到成片，导出完整 Composition：

```bash
npm run render:first
```

如果你要后期分层，分别导出各个 Layer Composition。

透明背景视频一般建议用支持 alpha 的格式，例如 ProRes 4444 或 PNG 序列。具体命令取决于你本机 Remotion 版本和后期软件支持；最稳的方式是先在 Studio 里选择对应 Composition，用 Render 面板选择支持透明通道的格式。

也可以一键顺序导出所有完整视频和普通 MP4 图层视频：

```bash
npm run render:all-layers
```

输出目录：

```text
outputs/layers/AiLazyCore/
outputs/layers/InterviewTranscriptAI/
```

如果你需要后期叠加用的透明图层，不要用 `render:all-layers`，用这个：

```bash
npm run render:alpha-layers
```

它会导出 ProRes 4444 `.mov`，保留透明通道。输出目录：

```text
outputs/alpha-layers/AiLazyCore/
outputs/alpha-layers/InterviewTranscriptAI/
```

透明导出只包含叠加层，不包含 `Background` 和完整成片，因为背景层本身就是不透明底片。

如果你不想导出整条时间线，而是只导出每一段里“实际有元素出现”的部分，用：

```bash
npm run render:alpha-segments
```

它会按 scene 切短片段，例如：

```text
outputs/alpha-segments/AiLazyCore/s01_000s-005s_Titles.mov
outputs/alpha-segments/AiLazyCore/s01_000s-005s_Subtitles.mov
outputs/alpha-segments/AiLazyCore/s02_005s-011s_Cards.mov
```

这样每个透明视频只包含该段有效时间，不会输出大量空白时间线。

## 当前分层规则

```text
Background：真人/占位底片、暗角、左侧遮罩
Headers：顶部章节标识
Titles：大标题、章节数字、结论标题
Cards：工具标签、信息卡片
Documents：文档、截图、AI助手浮层
Workflow：流程节点、步骤条
Kpis：金额、数字、80%等强指标
Subtitles：底部中英字幕
```

## 注意

导出成 MP4 后，元素会被烘焙成视频，不能再单独移动。要保留后期可调性，请导出单独图层再叠加。
