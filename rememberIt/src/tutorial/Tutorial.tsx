
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./Tutorial.css";

interface Slide {
  img: string;
  description: string;
}

let welcome: Slide[] = [
  {
    img: "https://placehold.co/600x400/EEE/31343C",
    description: 'This app is a modern journaling app',
  },
  {
    img: 'https://placehold.co/600x400/EEE/31343C',
    description: 'It is highly extensible allowing you to customize your entries',
  },
  {
    img: 'https://placehold.co/600x400/EEE/31343C',
    description: 'Explore the various themes...',
  },
  {
    img: 'https://placehold.co/600x400/EEE/31343C',
    description: 'More info to come',
  }
]
function Slideshow() {
  const [slide, setSlide] = useState(0);
  const increment = () => {
    if (slide < welcome.length -1) {
      setSlide(slide + 1);
    } else {
      setSlide(0);
    }
  };

  return (
    <div>
      <img src={welcome[slide].img} alt="" />
      <p className="description">{welcome[slide].description}</p>
      <button onClick={increment}></button>
    </div>
  );

}


function Tutorial() {

  return (
    <main className="container">
      <h1>Welcome to RememberIt!</h1>

      <div className="overlay">
        <Slideshow></Slideshow>
      </div>

    </main>
  );
}

export default Tutorial;
