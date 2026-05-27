import { Plugin } from "obsidian";
import { insertEnd, insertStart } from "./utils";

import type { Editor } from "obsidian";

class Vanillian extends Plugin {
  override async onload(): Promise<void> {
    this.addCommand({
      id: "insert-remark-start",
      name: "Insert remark start",
      editorCallback: (editor: Editor) => {
        insertStart(editor, "Remark");
      },
    });

    this.addCommand({
      id: "insert-remark-end",
      name: "Insert remark end",
      editorCallback: (editor: Editor) => {
        insertEnd(editor, "Remark");
      },
    });

    this.addCommand({
      id: "insert-background-konwledge-start",
      name: "Insert background knowledge start",
      editorCallback: (editor: Editor) => {
        insertStart(editor, "Background Knowledge");
      },
    });

    this.addCommand({
      id: "insert-background-konwledge-end",
      name: "Insert background knowledge end",
      editorCallback: (editor: Editor) => {
        insertEnd(editor, "Background Knowledge");
      },
    });
  }
}

export default Vanillian;
export { Vanillian };
