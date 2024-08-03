import React, { useCallback } from "react";
import { Box, Button, MenuItem } from "@mui/joy";
import styled from "@emotion/styled";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

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
    extensions: [StarterKit, Link, Image, Underline],
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
    <>
      <StyledEditorContent editor={editor} />
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Box
          sx={{
            backgroundColor: "grey",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
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
          >
            Blockquote
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            Ordered List
          </Button>
          <Button onClick={addImage}>Image</Button>
          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            Code Block
          </Button>
          <Button>Video</Button>
        </Box>
      </FloatingMenu>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Box
          sx={{
            backgroundColor: "grey",
            padding: "6px",
            display: "flex",
            gap: 1,
          }}
        >
          <Button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            Underline
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </Button>
        </Box>
      </BubbleMenu>
      <StyledEditorContent editor={editor} />
    </>
  );
};

export default RichTextEditor;
