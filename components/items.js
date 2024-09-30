import AICommand from "./AICommand";

const getSuggestionItems = (query) => {
  const items = [
    {
      title: "Heading 1",
      category: "Blocks",
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
      category: "Blocks",
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
      category: "Blocks",
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
      category: "Blocks",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: "Code Block",
      category: "Blocks",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setCodeBlock({ language: "javascript" })
          .run();
      },
    },
    {
      title: "Bullet List",
      category: "Blocks",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Ordered List",
      category: "Blocks",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Insert Image",
      category: "Media",
      command: ({ editor, range }) => {
        const url = window.prompt("Enter the image URL:");
        if (url) {
          const img = new Image();
          img.onload = () => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setImage({ src: url, alt: "Image" })
              .run();
          };
          img.onerror = () => {
            alert(
              "Failed to load the image. Please check the URL and try again."
            );
          };
          img.src = url;
        }
      },
    },
    AICommand,
  ];

  if (query) {
    return items.filter((item) =>
      item.title.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  return items;
};

export default getSuggestionItems;
