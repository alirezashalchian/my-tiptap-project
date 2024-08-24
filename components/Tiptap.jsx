import React, { useState, useCallback, useEffect } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import LinkIcon from "@mui/icons-material/Link";
import SubscriptIcon from "@mui/icons-material/Subscript";
import SvgIcon from "@mui/joy/SvgIcon";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import styled from "@emotion/styled";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
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
import getSuggestionItems from "./items";
import Commands from "./commands";
import renderItems from "./renderItems";

const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
  ".hljs": {
    background: "none",
    padding: 0,
  },

  ".ProseMirror": {
    padding: theme.spacing(2),
    border: `1px solid ${theme.vars.palette.neutral.outlinedBorder}`,
    borderRadius: theme.vars.radius.sm,
    minHeight: 200,
    fontFamily: theme.vars.fontFamily.body,
    outline: "none",

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

    "& img": {
      display: "block !important", // Added !important
      maxWidth: "100% !important",
      height: "auto !important",
      margin: "1em auto !important", // Centers the image horizontally
    },

    "& .image-wrapper": {
      display: "flex !important",
      justifyContent: "center !important",
      alignItems: "center !important",
      margin: "1em 0 !important",
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
      ".hljs-comment, .hljs-quote": {
        color: "#616161",
      },
      ".hljs-variable, .hljs-template-variable, .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-selector-id, .hljs-selector-class":
        {
          color: "#F98181",
        },
      ".hljs-number, .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal, .hljs-type, .hljs-params":
        {
          color: "#FBBC88",
        },
      ".hljs-string, .hljs-symbol, .hljs-bullet": {
        color: "#B9F18D",
      },
      ".hljs-title, .hljs-section": {
        color: "#FAF594",
      },
      ".hljs-keyword, .hljs-selector-tag": {
        color: "#70CFF8",
      },
      ".hljs-emphasis": {
        fontStyle: "italic",
      },
      ".hljs-strong": {
        fontWeight: 700,
      },
    },
  },
}));

const customLink = Link.extend({
  inclusive: false,
});

const RichTextEditor = () => {
  const [formats, setFormats] = useState(() => [""]);
  const [color, setColor] = useState("#000");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "image-wrapper",
        },
      }),
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
    ],
    content: "<p>Use / command to see different options</p>",
    editorProps: {
      attributes: {
        class: "tiptap custom-tiptap",
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Add protocol if not present
    const urlWithProtocol = !/^https?:\/\//i.test(url) ? `https://${url}` : url;

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: urlWithProtocol })
      .run();
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const updateFormats = () => {
        const newFormats = [];
        if (editor.isActive("bold")) newFormats.push("bold");
        if (editor.isActive("italic")) newFormats.push("italic");
        if (editor.isActive("underline")) newFormats.push("underlined");
        if (editor.isActive("strike")) newFormats.push("strike");
        if (editor.isActive("subscript")) newFormats.push("subscript");
        if (editor.isActive("link")) newFormats.push("link");
        setFormats(newFormats);
      };

      editor.on("selectionUpdate", updateFormats);
      editor.on("update", updateFormats);

      return () => {
        editor.off("selectionUpdate", updateFormats);
        editor.off("update", updateFormats);
      };
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
              variant={editor.isActive("bold") ? "soft" : "plain"}
            >
              <FormatBoldIcon />
            </IconButton>
            <IconButton
              value="italic"
              aria-label="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              variant={editor.isActive("italic") ? "soft" : "plain"}
            >
              <FormatItalicIcon />
            </IconButton>
            <IconButton
              value="underline"
              aria-label="underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              variant={editor.isActive("underline") ? "soft" : "plain"}
            >
              <FormatUnderlinedIcon />
            </IconButton>
            <IconButton
              value="strike"
              aria-label="strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              variant={editor.isActive("strike") ? "soft" : "plain"}
            >
              <FormatStrikethroughIcon />
            </IconButton>
            <IconButton
              value="link"
              aria-label="link"
              onClick={setLink}
              variant={editor.isActive("link") ? "soft" : "plain"}
            >
              <LinkIcon />
            </IconButton>
            <IconButton
              value="subscript"
              aria-label="subscript"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              variant={editor.isActive("subscript") ? "soft" : "plain"}
            >
              <SubscriptIcon />
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
