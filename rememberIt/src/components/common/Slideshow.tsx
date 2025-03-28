import { useState } from "react";

export interface Slide {
  img: string;
  description: string;
}

interface SlideshowProps {
  slides: Slide[];
  className?: string;
}

export function Slideshow({ slides, className = "" }: SlideshowProps) {
  const [slide, setSlide] = useState(0);

  const increment = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      setSlide(0);
    }
  };

  const decrement = () => {
    if (slide > 0) {
      setSlide(slide - 1);
    } else {
      setSlide(slides.length - 1);
    }
  };

  const setPage = (index: number) => {
    setSlide(index);
  };

  return (
    <div className={`slideshow bg-base-200 rounded-lg shadow-xl p-6 max-w-3xl mx-auto ${className}`}>
      <div className="relative">
        <img 
          src={slides[slide].img} 
          alt={slides[slide].description}
          className="rounded-lg shadow-md w-full h-[400px] object-cover transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        <p className="absolute bottom-4 left-4 right-4 text-white text-lg font-medium">
          {slides[slide].description}
        </p>
      </div>
      
      <div className="pagination flex justify-center items-center gap-2 mt-4">
        <button 
          className="btn btn-circle btn-sm" 
          onClick={decrement}
          aria-label="Previous slide"
        >
          &lt;
        </button>

        <div className="flex gap-1">
          {slides.map((_item, index) => (
            <button
              key={index}
              className={`btn btn-circle btn-sm ${
                slide === index ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => setPage(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button 
          className="btn btn-circle btn-sm" 
          onClick={increment}
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </div>
  );
} 