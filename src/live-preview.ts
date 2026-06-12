import { RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType
} from "@codemirror/view";
import { parseSingleLineTimestampDivider } from "./pattern";

class TimestampDividerWidget extends WidgetType {
  constructor(private readonly timestamp: string) {
    super();
  }

  eq(other: WidgetType): boolean {
    return other instanceof TimestampDividerWidget && other.timestamp === this.timestamp;
  }

  toDOM(): HTMLElement {
    const wrapper = document.createElement("span");
    wrapper.className = "hr-timestamp-divider hr-timestamp-live-divider";

    const label = document.createElement("span");
    label.className = "hr-timestamp-label";
    label.textContent = this.timestamp;

    wrapper.appendChild(label);
    return wrapper;
  }

  ignoreEvent(): boolean {
    return false;
  }
}

export const livePreviewTimestampDividerExtension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = buildTimestampDividerDecorations(view);
    }

    update(update: ViewUpdate): void {
      if (update.docChanged || update.viewportChanged || update.selectionSet) {
        this.decorations = buildTimestampDividerDecorations(update.view);
      }
    }
  },
  {
    decorations: (plugin) => plugin.decorations
  }
);

function buildTimestampDividerDecorations(view: EditorView): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();

  for (const range of view.visibleRanges) {
    let position = range.from;

    while (position <= range.to) {
      const line = view.state.doc.lineAt(position);
      const timestamp = parseSingleLineTimestampDivider(line.text);

      if (timestamp !== null && !lineContainsSelection(view, line.from, line.to)) {
        builder.add(
          line.from,
          line.to,
          Decoration.replace({
            widget: new TimestampDividerWidget(timestamp),
            inclusive: false
          })
        );
      }

      if (line.to + 1 > range.to) {
        break;
      }

      position = line.to + 1;
    }
  }

  return builder.finish();
}

function lineContainsSelection(view: EditorView, from: number, to: number): boolean {
  return view.state.selection.ranges.some((range) => range.from <= to && range.to >= from);
}
