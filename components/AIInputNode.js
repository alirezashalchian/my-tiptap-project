import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import React, { useState, useEffect, useRef } from "react";
import { Textarea, IconButton, Stack } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const AIInputComponent = ({ editor, node, getPos }) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    // This effect will run after the component mounts
    const timeoutId = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async () => {
    try {
      // Replace this with the actual AI API call
      // const aiResponse = await fetchAIResponse(inputValue);
      const aiResponse = `AI response to: "${inputValue}"`;

      const pos = getPos();
      if (typeof pos === "number") {
        const { state } = editor;
        const { tr } = state;
        const end = pos + node.nodeSize;

        // Delete the AI input node
        tr.delete(pos, end);

        // Insert the AI response
        tr.insert(pos, state.schema.text(aiResponse));

        // Apply the transaction
        editor.view.dispatch(tr);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Handle error (e.g., show an error message to the user)
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
      <Stack spacing={1} direction="row" alignItems="flex-start">
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
            flexGrow: 1,
            "&:focus-visible": {
              outline: "none",
            },
          }}
        />
        <IconButton onClick={handleSubmit} size="sm">
          <SendIcon />
        </IconButton>
        <IconButton onClick={handleClose} size="sm">
          <CloseIcon />
        </IconButton>
      </Stack>
    </NodeViewWrapper>
  );
};

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
