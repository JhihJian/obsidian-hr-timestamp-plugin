# HR Timestamp

HR Timestamp is an Obsidian plugin that converts long dashed divider input into a timestamped divider.

Type a line with four or more hyphens and press Enter:

```markdown
----------
```

The plugin replaces it with:

```markdown
--- *2026-06-12 09:30*
```

In Reading view and Live Preview, that timestamp line is rendered as a horizontal divider with the timestamp centered in the rule. The Markdown source remains a single plain-text line, so it stays portable and easy to edit.

## Features

- Converts only full lines with four or more hyphens.
- Leaves standard `---` horizontal rules unchanged.
- Ignores dashed lines inside fenced code blocks.
- Uses local time in `YYYY-MM-DD HH:mm` format.
- Renders `--- *YYYY-MM-DD HH:mm*` as a timestamped divider in Reading view and Live Preview.
- Shows the original source line while the Live Preview cursor is on that line, so editing and deletion stay predictable.

## Manual installation

Download `main.js`, `manifest.json`, and `styles.css` from the latest GitHub Release and place them in your vault:

```text
.obsidian/plugins/hr-timestamp/
```

Then enable `HR Timestamp` from Obsidian's Community plugins settings.

## Development

```powershell
npm ci
npm test
npm run build
```

## 中文说明

在 Obsidian 编辑器中输入整行 4 个及以上连字符并按 Enter，例如：

```markdown
----------
```

插件会自动转换为：

```markdown
--- *2026-06-12 09:30*
```

在 Obsidian 阅读视图和 Live Preview 编辑器中，插件会把这一行渲染为带时间标签的分割线。Markdown 源码仍保持上面的单行格式。

### 规则

- 只转换整行 4 个及以上 `-`，前后可以有空格。
- 不转换普通正文中的连续连字符。
- 不转换标准 `---`。
- 不转换围栏代码块内部的内容。
- 时间格式为本机当前时间 `YYYY-MM-DD HH:mm`。
- 只特殊渲染 `--- *YYYY-MM-DD HH:mm*`，普通单独的 `---` 分割线不受影响。
- Live Preview 中光标进入该行时显示源码，光标移开后恢复时间分割线渲染，避免影响删除和编辑。

### 手动安装

从最新版 GitHub Release 下载 `main.js`、`manifest.json` 和 `styles.css`，复制到你的 vault：

```text
.obsidian/plugins/hr-timestamp/
```

然后在 Obsidian 的社区插件设置中启用 `HR Timestamp`。
