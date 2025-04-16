import ReactMarkdown from "react-markdown";

interface PreviewProps {
  markdown: string;
  className?: string; // Add optional className prop for more flexible styling
}

function Preview({ markdown, className = "" }: PreviewProps) {
  const MarkdownComponent = ReactMarkdown as any;
  return (
    <div className={`p-6 ${className}`}>
      <MarkdownComponent>{markdown}</MarkdownComponent>
    </div>
  );
}

export default Preview;
