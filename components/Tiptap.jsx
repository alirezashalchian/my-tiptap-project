import React, { useCallback } from "react";
import { Box, Button, Typography } from "@mui/joy";
import styled from "@emotion/styled";
import { useEditor, EditorContent } from "@tiptap/react";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlock from "@tiptap/extension-code-block";

const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
  ".ProseMirror": {
    padding: theme.spacing(2),
    border: `1px solid ${theme.vars.palette.neutral.outlinedBorder}`,
    borderRadius: theme.vars.radius.sm,
    minHeight: 200,
    fontFamily: theme.vars.fontFamily.body,

    "&:first-child": {
      marginTop: 0,
    },

    pre: {
      background: theme.vars.palette.neutral[900],
      borderRadius: theme.vars.radius.sm,
      color: theme.vars.palette.neutral[100],
      fontFamily: "JetBrainsMono, monospace",
      margin: theme.spacing(3, 0),
      padding: theme.spacing(1, 2),

      code: {
        background: "none",
        color: "inherit",
        fontSize: "0.8rem",
        padding: 0,
      },
    },
  },
}));

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      Text,
      Document,
      Paragraph,
      Underline,
      StarterKit,
      Link,
      CodeBlock,
      Heading,
      Image,
      Blockquote,
      ListItem,
      OrderedList,
    ],
    content: "<p>Hello World!</p>",
  });
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
        <Button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          Toggle underline
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Toggle code block
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Toggle blockquote
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </Button>
        <Button onClick={addImage}>Set image</Button>
        <Button
          onClick={() => {
            const url = prompt("Enter video URL");
            if (url) {
              editor.chain().focus().setVideo({ src: url }).run();
            }
          }}
        >
          Video
        </Button>
      </Box>
      <StyledEditorContent editor={editor} />
    </Box>
  );
};

export default RichTextEditor;
