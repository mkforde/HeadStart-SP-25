import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";
import {
  BoldItalicUnderlineToggles,
  Button,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  Separator,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import React from "react";

interface EditorProps {
  markdown: string;
  onChange: (markdown: string) => void;
}

function Editor({ markdown, onChange }: EditorProps) {
  const ref = React.useRef<MDXEditorMethods>(null);

  async function readSelectedFile() {
    try {
      const filePath = await open({
        filters: [
          {
            name: "Text Files",
            extensions: ["mdx", "md"],
          },
        ],
      });
      if (filePath) {
        const contents = await readTextFile(filePath);
        ref.current?.setMarkdown(contents);
        onChange(contents);
        console.log("File contents:", contents);
      }
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }

  return (
    <div className="h-full w-full">
      <MDXEditor
        className="h-full w-full prose prose-sm max-w-none"
        ref={ref}
        onChange={onChange}
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          diffSourcePlugin({
            diffMarkdown: "View Markdown Source Code",
            viewMode: "source",
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper options={["source", "rich-text"]}>
                <Button onClick={readSelectedFile} className="btn btn-sm">Open Journal</Button>
                <Separator></Separator>
                <UndoRedo />
                <BoldItalicUnderlineToggles options={["Bold", "Italic"]} />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  );
}

export default Editor;
