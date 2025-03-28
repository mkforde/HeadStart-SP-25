import { Allotment } from "allotment";
import Editor from "./Editor";
import Preview from "./Preview";
import { useState } from "react";

function EditorWithPreview() {
  const [markdown, setMarkdown] = useState("# Hello World");

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-base-100">
      <Allotment className="h-full">
        <Allotment.Pane>
          <Editor markdown={markdown} onChange={setMarkdown} />
        </Allotment.Pane>
        <Allotment.Pane>
          <div className="p-2.5 bg-base-300 border-b border-base-300">Preview</div>
          <Preview markdown={markdown} />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default EditorWithPreview;
