import React, { useState, useCallback, useEffect } from "react";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StyledEditorContent from "./StyledEditorContent";
import Toolbar from "./Toolbar";
import ColorPicker from "./ColorPicker";
import { editorConfig } from "./EditorConfig";

const RichTextEditor = () => {
  const [formats, setFormats] = useState(() => [""]);
  const [color, setColor] = useState("#000");

  const editor = useEditor(editorConfig);

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
      const updateFormatsAndColor = () => {
        const newFormats = [];
        if (editor.isActive("bold")) newFormats.push("bold");
        if (editor.isActive("italic")) newFormats.push("italic");
        if (editor.isActive("underline")) newFormats.push("underlined");
        if (editor.isActive("strike")) newFormats.push("strike");
        if (editor.isActive("subscript")) newFormats.push("subscript");
        if (editor.isActive("link")) newFormats.push("link");
        setFormats(newFormats);

        // Update color based on current selection
        const currentColor = editor.getAttributes("textStyle").color;
        if (currentColor) {
          setColor(currentColor);
        } else {
          // If no color is set, default to black
          setColor("#000000");
        }
      };

      editor.on("selectionUpdate", updateFormatsAndColor);
      editor.on("update", updateFormatsAndColor);

      return () => {
        editor.off("selectionUpdate", updateFormatsAndColor);
        editor.off("update", updateFormatsAndColor);
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
          <Toolbar
            editor={editor}
            formats={formats}
            setFormats={setFormats}
            setLink={setLink}
          />
          <Divider
            orientation="vertical"
            sx={{ height: "60%", alignSelf: "center" }}
          />
          <ColorPicker color={color} handleColorChange={handleColorChange} />
        </Sheet>
      </BubbleMenu>
    </>
  );
};

export default RichTextEditor;
