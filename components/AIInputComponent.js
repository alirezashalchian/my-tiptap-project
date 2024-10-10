import React, { useState, useEffect, useRef } from "react";
import { Textarea, IconButton, Box } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { NodeViewWrapper } from "@tiptap/react";

const AIInputComponent = ({ editor, node, getPos }) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    try {
      const aiResponse = `AI response to: "${inputValue}"`;
      // add the actual AI API here

      const pos = getPos();
      if (typeof pos === "number") {
        const { state } = editor;
        const { tr } = state;
        const end = pos + node.nodeSize;

        tr.delete(pos, end);
        tr.insert(pos, state.schema.text(aiResponse));
        editor.view.dispatch(tr);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  const handleClose = () => {
    const pos = getPos();
    if (typeof pos === "number") {
      editor.commands.deleteRange({ from: pos, to: pos + node.nodeSize });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <NodeViewWrapper>
      <Box sx={{ position: "relative", width: "100%" }}>
        <Textarea
          slotProps={{
            textarea: {
              ref: textareaRef,
            },
          }}
          autoFocus
          minRows={5}
          maxRows={10}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={node.attrs.placeholder}
          onKeyDown={handleKeyDown}
          sx={{
            width: "100%",
            "&:focus-visible": {
              outline: "none",
            },
            "& .MuiInput-root": {
              "--Input-focusedHighlight": "rgba(0, 0, 0, 0)",
            },
            "& .MuiTextarea-root": {
              "&:focus": {
                boxShadow: "none",
              },
            },
            pr: "40px",
          }}
        />
        <IconButton
          onClick={handleClose}
          size="sm"
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          onClick={handleSubmit}
          size="sm"
          disabled={inputValue.trim() === ""}
          sx={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </NodeViewWrapper>
  );
};

export default AIInputComponent;
