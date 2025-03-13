import { UnControlled as CodeMirror } from "react-codemirror2"

function RegularEditor() {

  return (

    <CodeMirror
      value='<h1>I love react-codemirror2</h1>'
      options={{
        mode: 'xml',
        theme: 'material',
        lineNumbers: true
      }}
    />


  );

}

// The Markdown parser will dynamically load parsers
// for code blocks, using @codemirror/language-data to
// look up the appropriate dynamic import.

export default RegularEditor
