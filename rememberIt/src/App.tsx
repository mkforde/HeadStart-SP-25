import { useState } from "react";
import "./App.css";
import Tutorial from "./components/tutorial/Tutorial";
import RegularEditor from "./components/editor/RegularEditor";

function App() {

  let [showTutorial, setShowTutorial] = useState(true);

  function toggleTutorial() {
    setShowTutorial(!showTutorial)
  }

  function ExitButton() {
    return (
      <button onClick={toggleTutorial} className="ml-auto rounded-md p-2 bg-gray-100">X</button>
    );
  }

  return (
    <main className="container mt-10">
      {showTutorial ?
        <div className="welcome-screen flex flex-col">
          <ExitButton />
          <Tutorial />
        </div>
        : <RegularEditor />}
    </main>
  );
}

export default App;
