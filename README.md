# HR Timestamp

在 Obsidian 编辑器中输入整行 4 个及以上连字符并按 Enter，例如：

```markdown
----------
```

插件会自动转换为：

```markdown
--- *2026-06-12 09:30*
```

在 Obsidian 阅读视图和 Live Preview 编辑器中，插件会把这一行渲染为带时间标签的分割线。Markdown 源码仍保持上面的单行格式。

## 规则

- 只转换整行 4 个及以上 `-`，前后可以有空格。
- 不转换普通正文中的连续连字符。
- 不转换标准 `---`。
- 不转换围栏代码块内部的内容。
- 时间格式为本机当前时间 `YYYY-MM-DD HH:mm`。
- 只特殊渲染 `--- *YYYY-MM-DD HH:mm*`，普通单独的 `---` 分割线不受影响。
- Live Preview 中光标进入该行时显示源码，光标移开后恢复时间分割线渲染，避免影响删除和编辑。

## 安装

把 `main.js`、`manifest.json`、`styles.css` 和本文件复制到你的 vault：

```text
.obsidian/plugins/hr-timestamp/
```

然后在 Obsidian 的社区插件设置中启用 `HR Timestamp`。
