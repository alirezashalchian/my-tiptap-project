import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";

const AIInputComponent = ({ editor, node, getPos }) => {
  const textareaRef = useRef(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = () => {
    const userInput = textareaRef.current.value;
    // Replace this with your actual AI API call
    const aiResponse = `AI response to: "${userInput}"`;

    const pos = getPos();
    if (typeof pos === "number") {
      editor
        .chain()
        .focus()
        .deleteRange({ from: pos, to: pos + node.nodeSize })
        .insertContent(aiResponse)
        .run();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    const lineHeight = 20; // Adjust this value based on your font size
    const minRows = 1;
    const maxRows = 5; // Maximum number of visible rows before scrolling

    const previousRows = e.target.rows;
    e.target.rows = minRows; // Reset rows to recalculate

    const currentRows = Math.floor(e.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return (
    <NodeViewWrapper
      className="ai-input-wrapper"
      style={{ display: "flex", width: "100%", marginBottom: "8px" }}
    >
      <textarea
        ref={textareaRef}
        rows={rows}
        placeholder={node.attrs.placeholder}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        style={{
          width: "100%",
          resize: "none",
          border: "none",
          outline: "none",
          padding: "4px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px 0 0 4px",
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: "1.5",
          overflow: rows >= 5 ? "auto" : "hidden",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          padding: "4px 8px",
          borderRadius: "0 4px 4px 0",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Submit
      </button>
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
