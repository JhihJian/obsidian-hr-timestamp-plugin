import { Text } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Plugin } from "obsidian";
import { livePreviewTimestampDividerExtension } from "./live-preview";
import { decorateTimestampDividers } from "./render";
import { planDividerReplacement } from "./transform";

export default class HrTimestampPlugin extends Plugin {
  async onload(): Promise<void> {
    this.registerEditorExtension(
      [
        livePreviewTimestampDividerExtension,
        EditorView.updateListener.of((update: ViewUpdate) => {
          handleEditorUpdate(update);
        })
      ]
    );

    this.registerMarkdownPostProcessor((element: HTMLElement) => {
      decorateTimestampDividers(element);
    });
  }
}

function handleEditorUpdate(update: ViewUpdate): void {
  if (!update.docChanged) {
    return;
  }

  if (!updateHasInsertedNewline(update)) {
    return;
  }

  const cursorPosition = update.state.selection.main.head;
  const documentText = update.state.doc.toString();
  const plan = planDividerReplacement(documentText, cursorPosition);

  if (plan === null) {
    return;
  }

  update.view.dispatch({
    changes: {
      from: plan.from,
      to: plan.to,
      insert: plan.insert
    },
    selection: {
      anchor: plan.from + plan.insert.length + 1
    }
  });
}

function updateHasInsertedNewline(update: ViewUpdate): boolean {
  let insertedNewline = false;

  update.changes.iterChanges((_fromA, _toA, _fromB, _toB, inserted: Text) => {
    if (inserted.toString().includes("\n")) {
      insertedNewline = true;
    }
  });

  return insertedNewline;
}
