
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
    description: 'It is highly extensible allowing you to customize your journal',
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
    if (slide < welcome.length - 1) {
      setSlide(slide + 1);
    } else {
      setSlide(0);
    }
  };

  const decrement = () => {
    if (slide > 0) {
      setSlide(slide -1);
    } else {
      setSlide(welcome.length -1);
    }
  }

  const setPage = (a:number) => {
    setSlide(a);
  }


  return (
    <main className="slideshow">
      <img src={welcome[slide].img} alt="" />
      <p className="description">{welcome[slide].description}</p>
      <div className="pagination">
        <button onClick={decrement}>&lt;</button>
        <button onClick={() => setPage(0)}>1</button>
        <button onClick={() => setPage(1)}>2</button>
        <button onClick={() => setPage(2)}>3</button>
        <button onClick={() => setPage(3)}>4</button>
        <button onClick={increment}>&gt;</button>
      </div>
    </main>
  );

}


function Tutorial() {

  return (
    <main className="container">
      <h1>Welcome to RememberIt</h1>

      <div className="overlay">
        <Slideshow></Slideshow>
      </div>

    </main>
  );
}

export default Tutorial;
