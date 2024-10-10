# Tiptap AI-Enhanced Rich Text Editor

## Project Description

This project is a text editor built with [Next.js](https://nextjs.org/), [Tiptap](https://tiptap.dev/) and [MUI Joy](https://mui.com/joy-ui/getting-started/) featuring AI integration. It provides a customizable editing experience with various formatting options and an AI-powered assistant. Upon selecting a piece of text, a toolbar will appear with various marks to edit the selected text, and when users type "/", a list of extensions will appear to choose from.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/alirezashalchian/my-tiptap-project.git
   cd my-tiptap-project
   ```

2. Install dependencies:

   ```
      npm install @tiptap/react @tiptap/core @tiptap/starter-kit @mui/material @mui/joy @mui/icons-material @emotion/react @emotion/styled @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-dropcursor @tiptap/extension-strike @tiptap/extension-underline @tiptap/extension-subscript @tiptap/extension-link @tiptap/extension-image @tiptap/pm @tiptap/suggestion @tiptap/extension-bubble-menu @tiptap/extension-floating-menu @tiptap/extension-code-block @tiptap/extension-code-block-lowlight highlight.js lowlight tippy.js
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

## Quick Start Guide

1. Start the development server:

   ```
   npm run dev
   ```

2. Open `http://localhost:3000` in your browser.

3. You should see the rich text editor with an AI assistant option in the toolbar.

## Dependencies

- @tiptap/react
- @tiptap/core
- @tiptap/pm
- @tiptap/starter-kit
- @mui/material
- @mui/joy
- @mui/icons-material
- @emotion/react
- @emotion/styled
- @tiptap/extension-color
- @tiptap/extension-text-style
- @tiptap/extension-dropcursor
- @tiptap/extension-strike
- @tiptap/extension-underline
- @tiptap/extension-subscript
- @tiptap/extension-link
- @tiptap/extension-image
- @tiptap/pm @tiptap/suggestion
- @tiptap/extension-bubble-menu
- @tiptap/extension-floating-menu
- @tiptap/extension-code-block
- @tiptap/extension-code-block-lowlight
- @fontsource/inter
- highlight.js
- lowlight
- tippy.js

## Project Structure and File Guidelines

### 1. AICommand.js

**Purpose**: Defines the command for inserting an AI input node into the editor.

**Guidelines**:

- Modify the `command` function to change AI input insertion behavior.
- Adjust the `title` or `category` if needed.

### 2. AIInputComponent.js

**Purpose**: React component for the AI input interface.

**Guidelines**:

- Implement AI API call in the `handleSubmit` function.
- Modify UI or add features to enhance AI interaction.

### 3. AIInputNode.js

**Purpose**: Defines the Tiptap node for AI input.

**Guidelines**:

- Modify attributes or parsing logic if needed.
- Adjust HTML rendering of the node if required.

### 4. ColorPicker.js

**Purpose**: Color picker component for text formatting.

**Guidelines**:

- Customize color options or UI as needed.
- Add additional color-related functionality if required.

### 5. commands.js

**Purpose**: Defines editor commands for the toolbar.

**Guidelines**:

- Add or modify editor commands as needed.
- Ensure new commands are integrated with the toolbar.

### 6. CommandsList.js

**Purpose**: Renders the list of available editor commands.

**Guidelines**:

- Update UI or functionality of the commands list.
- Add new command categories or groupings if needed.

### 7. EditorConfig.js

**Purpose**: Configuration for the Tiptap editor.

**Guidelines**:

- Add or remove Tiptap extensions.
- Modify editor options or default content.

### 8. items.js

**Purpose**: Defines toolbar items and their properties.

**Guidelines**:

- Add new toolbar items or modify existing ones.
- Ensure new items are linked to their respective commands.

### 9. renderedItems.js

**Purpose**: Renders toolbar items based on their type.

**Guidelines**:

- Add support for new types of toolbar items.
- Modify rendering logic for existing item types.

### 10. StyledEditorContent.js

**Purpose**: Styled component for the editor content.

**Guidelines**:

- Modify styling of the editor content area.
- Add additional styled components for editor elements if needed.

### 11. Tiptap.js

**Purpose**: Main component that integrates all editor components.

**Guidelines**:

- Modify overall structure of the editor.
- Add global editor features or integrations.

### 12. Toolbar.js

**Purpose**: Renders the editor toolbar.

**Guidelines**:

- Modify toolbar layout or functionality.
- Add new sections or groupings to the toolbar.

## Adding New Tiptap Nodes or Marks

1. Create a new file for your node/mark (e.g., `MyCustomNode.js`).
2. Define the node/mark using Tiptap's API.
3. Import and add the new node/mark to the extensions array in `EditorConfig.js`.
4. If needed, add corresponding toolbar items in `items.js` and implement necessary commands.

Example:

```javascript
// MyCustomNode.js
import { Node } from '@tiptap/core';

export const MyCustomNode = Node.create({
  name: 'myCustomNode',
  group: 'block',
  content: 'inline*',
  // ... define attributes, parseHTML, renderHTML, etc.
});

// EditorConfig.js
import { MyCustomNode } from './MyCustomNode';

// In the extensions array
extensions: [
  // ... other extensions
  MyCustomNode,
],
```

## AI Integration

The AI functionality is integrated through the AIInputComponent. To customize or enhance the AI integration:

1. Modify the `handleSubmit` function in `AIInputComponent.js`.
2. Implement proper error handling for API calls.
3. Adjust the UI to provide feedback during AI processing.

Ensure that your OpenAI API key is properly set in the `.env.local` file for the AI functionality to work.

## Styling

The project uses a combination of Material-UI (MUI) components and custom styled components. To modify the styling:

1. Use MUI's theming system for global style changes.
2. Modify `StyledEditorContent.js` for editor-specific styles.
3. Use inline styles or create new styled components for component-specific styling.

## Testing

(Add information about testing procedures and guidelines here)

## Contributing

(Add guidelines for contributing to the project here)

## License

(Specify the license under which this project is released)
