import { Editor } from "obsidian";

/** Insert `text` after current cursor. */
function insertText(editor: Editor, text: string) {
  const cursor = editor.getCursor();

  editor.transaction({
    changes: [{ from: cursor, text: text }],
    selection: { from: { ch: cursor.ch + text.length, line: cursor.line } },
  });
}

function insertStart(editor: Editor, content: string): void {
  const text = "> **\\[" + content + "\\]>** ";
  insertText(editor, text);
}

function insertEnd(editor: Editor, content: string): void {
  const text = "> **<\\[" + content + "\\]**";
  insertText(editor, text);
}

export { insertEnd, insertStart };
