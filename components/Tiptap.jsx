// components/tiptap.jsx
import React, { useState, useCallback } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import SvgIcon from "@mui/joy/SvgIcon";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import styled from "@emotion/styled";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Underline from "@tiptap/extension-underline";
import getSuggestionItems from "./items";
import Commands from "./commands";
import renderItems from "./renderItems";

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

    "& blockquote": {
      borderLeft: `3px solid ${theme.vars.palette.neutral[300]}`,
      margin: theme.spacing(3, 0),
      paddingLeft: theme.spacing(2),
      color: theme.vars.palette.neutral[700],
      fontStyle: "italic",
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
  const [formats, setFormats] = useState(() => [""]);
  const [color, setColor] = useState("#000");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Dropcursor,
      Underline,
      Color,
      TextStyle,
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
    ],
    content: "<p>Use / command to see different options</p>",
    editorProps: {
      attributes: {
        class: "tiptap custom-tiptap",
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("Enter the image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: "Image" }).run();
    }
  }, [editor]);

  const handleColorChange = useCallback(
    (event) => {
      const newColor = event.target.value;
      setColor(newColor);
      if (editor) {
        editor.chain().focus().setColor(newColor).run();
      }
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <>
      <StyledEditorContent editor={editor} />
      <EditorContent editor={editor} className="editor" />
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Sheet
          variant="outlined"
          sx={{ borderRadius: "md", display: "flex", gap: 2, p: 0.5 }}
        >
          <ToggleButtonGroup
            variant="plain"
            spacing={0.5}
            value={formats}
            onChange={(event, newFormats) => {
              setFormats(newFormats);
            }}
            aria-label="text formatting"
          >
            <IconButton
              value="bold"
              aria-label="bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FormatBoldIcon />
            </IconButton>
            <IconButton
              value="italic"
              aria-label="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <FormatItalicIcon />
            </IconButton>
            <IconButton
              value="underlined"
              aria-label="underlined"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <FormatUnderlinedIcon />
            </IconButton>
            <IconButton
              value="strike"
              aria-label="strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <FormatStrikethroughIcon />
            </IconButton>
          </ToggleButtonGroup>
          <Divider
            orientation="vertical"
            sx={{ height: "60%", alignSelf: "center" }}
          />
          <Button
            component="label"
            tabIndex={-1}
            role={undefined}
            aria-label="fill color"
            variant="outlined"
            color="neutral"
            endDecorator={
              <SvgIcon fontSize="md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </SvgIcon>
            }
            sx={{ pl: 1 }}
          >
            <AspectRatio
              variant="plain"
              ratio="1"
              sx={{
                borderRadius: "50%",
                width: "1.5em",
                bgcolor: color,
              }}
            >
              <div />
            </AspectRatio>
            <Box
              component="input"
              type="color"
              value={color}
              onChange={handleColorChange}
              sx={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: "1px",
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: "1px",
              }}
            />
          </Button>
        </Sheet>
      </BubbleMenu>
    </>
  );
};

export default RichTextEditor;
