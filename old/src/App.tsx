import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Tutorial from "./tutorial/Tutorial";
import RegularEditor from "./editor/RegularEditor";


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  //<Tutorial />
  return (

    < main className="container" >
      <RegularEditor />
    </main >
  );
}


export default App;


