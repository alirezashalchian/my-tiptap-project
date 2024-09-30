import styled from "@emotion/styled";
import { EditorContent } from "@tiptap/react";

const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
  "&& .ProseMirror": {
    padding: theme.spacing(2),
    border: `1px solid ${theme.vars.palette.neutral.outlinedBorder}`,
    borderRadius: theme.vars.radius.sm,
    minHeight: 200,
    fontFamily: theme.vars.fontFamily.body,
    outline: "none",

    "& .image-wrapper": {
      display: "flex !important",
      justifyContent: "center !important",
      alignItems: "center !important",
      margin: "1em 0 !important",
      width: "100% !important",
    },

    "& img": {
      display: "block !important",
      maxWidth: "100% !important",
      height: "auto !important",
    },

    "&:first-child": {
      marginTop: 0,
      marginBottom: "48px",
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

export default StyledEditorContent;
