import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Underline from "@tiptap/extension-underline";
import Commands from "./commands";
import getSuggestionItems from "./items";
import renderItems from "./renderItems";
import { AIInputNode } from "./AIInputNode";

const customLink = Link.extend({
  inclusive: false,
});

const customImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "image-wrapper",
        renderHTML: (attributes) => {
          return {
            class: `image-wrapper ${attributes.class || ""}`.trim(),
          };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const { src, alt, title, class: className } = HTMLAttributes;
    return ["div", { class: className }, ["img", { src, alt, title }]];
  },
});

export const editorConfig = {
  extensions: [
    StarterKit.configure({ codeBlock: false }),
    customImage,
    Dropcursor,
    Underline,
    customLink.configure({
      openOnClick: false,
      linkOnPaste: true,
      defaultProtocol: "https",
    }),
    Color,
    Subscript,
    TextStyle,
    CodeBlockLowlight.configure({
      lowlight: createLowlight(common),
    }),
    Commands.configure({
      suggestion: {
        items: ({ query }) => getSuggestionItems(query),
        render: renderItems,
      },
    }),
    AIInputNode,
  ],
  content: "<p>Use / command to see different options</p>",
  editorProps: {
    attributes: {
      class: "tiptap custom-tiptap",
    },
  },
};
