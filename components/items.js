const getSuggestionItems = (query) => {
  if (typeof query !== "string") {
    console.log("Query is not a string:", query);
    query = "";
  }
  return [
    {
      title: "Heading 1",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Heading 2",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Heading 3",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Blockquote",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: "Code Block",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("codeBlock").run();
      },
    },
    {
      title: "Ordered List",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Insert Image",
      command: ({ editor, range }) => {
        const url = window.prompt("Enter the image URL:");
        if (url) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setImage({ src: url, alt: "Image" })
            .run();
        }
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
};

export default getSuggestionItems;
