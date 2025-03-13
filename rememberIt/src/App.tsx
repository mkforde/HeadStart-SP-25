import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Tutorial from "./tutorial/Tutorial";
import view from "./editor/RegularEditor";
import { getMatches } from "@tauri-apps/plugin-cli";


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [filePath, setFilePath] = useState<string | null>(null);

  const fetchArgs = async () => {
    try {
      const matches = await getMatches();
      if (matches.args.file?.value) {
        setFilePath(matches.args.file.value as string);
      }
    } catch (error) {
      console.error('Error fetching command-line arguments:', error);
    }
  };

  fetchArgs();

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    //view

    // <Tutorial></Tutorial>
    <main className="container">
      <h1>HI</h1>
      <div>
        {filePath ? (
          <p>Opening file: {filePath}</p>
          // Implement your file opening logic here
        ) : (
          <p>No file specified.</p>
        )}
      </div>

    </main >
  );
}


export default App;


