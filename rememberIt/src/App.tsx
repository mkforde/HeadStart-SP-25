import { useState } from "react";
import "./App.css";
import Tutorial from "./tutorial/Tutorial";
import RegularEditor from "./editor/RegularEditor";

function App() {

  let [showTutorial, setShowTutorial] = useState(true);

  function toggleTutorial() {
    setShowTutorial(!showTutorial)
  }


  function ExitButton() {
    return (
      <div className="exit">
        <button onClick={toggleTutorial} className="close">X</button>
      </div>
    );
  }




  return (
    <main className="container">
      {showTutorial ?
        <div className="welcome-screen">
          <ExitButton />
          <Tutorial />
        </div>
        : <RegularEditor textContent={"textfile"} />}
    </main>
  );
}

export default App;
