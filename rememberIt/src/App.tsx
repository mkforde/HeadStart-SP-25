import { useState } from "react";
import "./App.css";
import Tutorial from "./components/tutorial/Tutorial";
import EditorWithPreview from "./components/editor/EditorWithPreview";

function App() {
  let [showTutorial, setShowTutorial] = useState(true);

  function toggleTutorial() {
    setShowTutorial(!showTutorial);
  }

  function ExitButton() {
    return (
      <button onClick={toggleTutorial} className="btn btn-square ml-auto">
        X
      </button>
    );
  }

  return (
    <main className="w-full h-screen">
      {showTutorial ? (
        <div className="welcome-screen flex flex-col">
          <ExitButton />
          <Tutorial />
        </div>
      ) : (
        <div className="w-full h-full p-4">
          <EditorWithPreview />
        </div>
      )}
    </main>
  );
}

export default App;
