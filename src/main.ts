import { Prec } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { Plugin, SuggestModal } from "obsidian";

import { insertSurround } from "./utils";

import type { App, Editor, PluginManifest } from "obsidian";

export default class Vanillian extends Plugin {
  #original: null | (() => void | Promise<void>);

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
    this.#original = null;
  }

  override async onload() {
    this.#addCommands();
    this.#mapKeys();
    this.#addExtensions();
  }

  override onunload(): void {
    // Recover the original onOpen.
    // Effectively preventing hotreloading to cause recursive monkypatch.
    // Notice that the registered keys will not be unregistered.
    if (this.#original !== null) {
      SuggestModal.prototype.onOpen = this.#original;
    }
  }

  #addCommands() {
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

  #mapKeys() {
    // Monkeypatch to add keymaps.
    // If the specific modal has its customized onOpen, this patch will not be called.
    const original = SuggestModal.prototype.onOpen; // eslint-disable-line

    this.#original = original;

    SuggestModal.prototype.onOpen = async function() {
      await original.call(this);

      this.scope.register(["Ctrl"], "j", () => {
        this.inputEl.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowDown",
            code: "ArrowDown",
            bubbles: true,
            cancelable: true,
          }),
        );

        return false;
      });

      this.scope.register(["Ctrl"], "k", () => {
        this.inputEl.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowUp",
            code: "ArrowUp",
            bubbles: true,
            cancelable: true,
          }),
        );

        return false;
      });
    };
  }

  #addExtensions() {
    const keymaps = Prec.high(keymap.of(
      [
        {
          key: "Tab",
          run: (view) => {
            // With selection, fallback.
            if (!view.state.selection.main.empty) {
              return false;
            }

            // Insert 4 spaces.
            view.dispatch(view.state.update({
              changes: { from: view.state.selection.main.from, insert: "    " },
              selection: { anchor: view.state.selection.main.from + 4 },
            }));

            return true;
          },
        },
        {
          key: "Backspace",
          run: (view) => {
            // With selection, fallback.
            if (!view.state.selection.main.empty) {
              return false;
            }

            const from = view.state.selection.main.from - 4;
            const to = view.state.selection.main.from;
            const before = view.state.doc.sliceString(from, to);

            // No 4 spaces, fallback.
            if (before !== "    ") {
              return false;
            }

            // Delete 4 spaces.
            view.dispatch(view.state.update({
              changes: { from: from, to: to, insert: "" },
              selection: { anchor: from },
            }));

            return true;
          },
        },
      ],
    ));

    this.registerEditorExtension(keymaps);
  }
}
