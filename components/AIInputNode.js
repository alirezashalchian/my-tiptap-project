import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import AIInputComponent from "./AIInputComponent";

export const AIInputNode = Node.create({
  name: "aiInput",
  group: "block",
  content: "inline*",

  addAttributes() {
    return {
      placeholder: {
        default: "Ask AI...",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="ai-input"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "ai-input", ...HTMLAttributes }, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AIInputComponent);
  },
});
