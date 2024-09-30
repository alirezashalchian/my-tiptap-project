import React from "react";
import IconButton from "@mui/joy/IconButton";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import LinkIcon from "@mui/icons-material/Link";
import SubscriptIcon from "@mui/icons-material/Subscript";

const Toolbar = ({ editor, formats, setFormats, setLink }) => {
  return (
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
  );
};
export default Toolbar;
