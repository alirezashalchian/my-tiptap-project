const AICommand = {
  title: "Ask AI",
  category: "AI",
  command: ({ editor, range }) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertContent({ type: "paragraph" }) // Ensure we're in a new paragraph
      .insertContent({
        type: "aiInput",
        attrs: { placeholder: "Ask AI..." },
      })
      .run();

    // Blur the editor to allow our AIInputComponent to take focus
    editor.commands.blur();
  },
};

export default AICommand;
