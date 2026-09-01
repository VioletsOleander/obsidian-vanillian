import { Plugin } from "obsidian";
import { insertSurround } from "./utils";

import type { Editor } from "obsidian";

class Vanillian extends Plugin {
  override async onload(): Promise<void> {
    this.addCommand({
      id: "insert-remark",
      name: "Insert remark",
      editorCallback: (editor: Editor) => {
        insertSurround(editor, "Remark");
      },
    });

    this.addCommand({
      id: "insert-background-knowledge",
      name: "Insert background knowledge",
      editorCallback: (editor: Editor) => {
        insertSurround(editor, "Background Knowledge");
      },
    });

    this.addCommand({
      id: "insert-derivation",
      name: "Insert derivation",
      editorCallback: (editor: Editor) => {
        insertSurround(editor, "Derivation");
      },
    });
  }
}

export default Vanillian;
export { Vanillian };
