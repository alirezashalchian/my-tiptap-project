import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/Tiptap"), {
  ssr: false,
});

const EditorPage = () => {
  return (
    <div>
      <h1>My Rich Text Editor</h1>
      <Editor />
    </div>
  );
};

export default EditorPage;
