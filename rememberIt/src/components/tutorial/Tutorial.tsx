import { useState } from "react";
import "./Tutorial.css";

interface Slide {
  img: string;
  description: string;
}

const welcome: Slide[] = [
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
  },
  {
    img: 'https://placehold.co/600x400/EEE/31343C',
    description: 'Plugin extensible',
  },
  {
    img: 'https://placehold.co/600x400/EEE/31343C',
    description: 'Another slide',
  },
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
      setSlide(slide - 1);
    } else {
      setSlide(welcome.length - 1);
    }
  }

  const setPage = (a: number) => {
    setSlide(a);
  }


  return (
    <main className="slideshow">
      <img src={welcome[slide].img} alt="" />
      <p className="description">{welcome[slide].description}</p>
        <div className="pagination">
          <button onClick={decrement}>&lt;</button>
          
          {
            welcome.map((_item, index) => {
              return <button key={index} className={slide === index ? "active" : ""}
              onClick={() => setPage(index)}>{index + 1}</button>
            })
          }

          <button onClick={increment}>&gt;</button>
      </div>
    </main>
  );
}

function Tutorial() {

  return (
    <main className="tutorial">
      <h1>Welcome to RememberIt</h1>
      <div className="overlay flex justify-center">
        <Slideshow />
      </div>
    </main>
  );
}

export default Tutorial;