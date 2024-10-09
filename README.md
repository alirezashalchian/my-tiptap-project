This project is a text editor built with [Next.js](https://nextjs.org/), [Tiptap](https://tiptap.dev/) and [MUI Joy](https://mui.com/joy-ui/getting-started/) featuring AI integration. It provides a customizable editing experience with various formatting options and an AI-powered assistant.

## Installation

To install this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install @tiptap/react @tiptap/core @tiptap/starter-kit @mui/material @mui/joy @mui/icons-material @emotion/react @emotion/styled
   # or
   yarn install @tiptap/react @tiptap/core @tiptap/starter-kit @mui/material @mui/joy @mui/icons-material @emotion/react @emotion/styled
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

   Replace `your_openai_api_key` with your actual OpenAI API key.

4. (Optional) Configure AI settings:
   If you want to customize the AI behavior, you can modify the `config/ai-config.js` file.

5. (Optional) Customize the editor:
   You can adjust the editor's appearance and behavior by modifying the components in the `components` directory, especially `Editor.js` and `AICommand.js`.

Now you're ready to run the project using the instructions in the "Getting Started" section below.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
