import ReactMarkdown from "react-markdown";

interface PreviewProps {
  markdown: string;
}

function Preview({ markdown }: PreviewProps) {
  const MarkdownComponent = ReactMarkdown as any;
  return (
    <div className="h-screen p-6">
      <MarkdownComponent>{markdown}</MarkdownComponent>
    </div>
  );
}

export default Preview;
