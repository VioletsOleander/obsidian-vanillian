import { Editor } from "obsidian";

/** Insert a surrounding section for `content` after current cursor. */
function insertSurround(editor: Editor, content: string): void {
  const cursor = editor.getCursor();

  const begin = "> **\\[" + content + "\\]>** ";
  const end = "> **<\\[" + content + "\\]**\n";
  const text = begin + "\n\n" + end;

  editor.transaction({
    changes: [
      { from: cursor, text: text },
    ],
    selection: { from: { ch: cursor.ch + begin.length, line: cursor.line } },
  });
}

export { insertSurround };
