import React from "react";
import dynamic from "next/dynamic";
import { Container, Typography } from "@mui/joy";

const Editor = dynamic(() => import("../components/Tiptap"), {
  ssr: false,
});

const EditorPage = () => {
  return (
    <Container>
      <Typography level="h2" component="h1" sx={{ mb: 2 }}>
        My Rich Text Editor
      </Typography>
      <Editor />
    </Container>
  );
};

export default EditorPage;
