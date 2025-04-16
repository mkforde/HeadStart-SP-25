import { useState, useEffect } from "react";
import { Slideshow, type Slide } from "../common/Slideshow";
import { type TemplateName } from "../../journal/journal";

// Define template information including images and descriptions
const templateSlides: (Slide & { templateName: TemplateName | null })[] = [
  {
    img: "https://lifepointministries.net/wp-content/uploads/2022/08/Blank-Page.png", // Add appropriate image path
    description: "Blank - Start with a clean slate",
    templateName: null,
  },
  {
    img: "https://raw.githubusercontent.com/mkforde/rememberIt-images/refs/heads/main/template-screens/screen4.png", // Add appropriate image path
    description:
      "Morning Journaling - Begin your day with gratitude, priorities, and self-reflection",
    templateName: "muchiri",
  },
  {
    img: "https://raw.githubusercontent.com/mkforde/rememberIt-images/refs/heads/main/template-screens/screen1.png", // Add appropriate image path
    description:
      "Daily Journal - Track your focus, to-dos, and reflections for the day",
    templateName: "daily",
  },
  {
    img: "https://raw.githubusercontent.com/mkforde/rememberIt-images/refs/heads/main/template-screens/screen2.png", // Add appropriate image path
    description:
      "Evening Reflection - Review your day, accomplishments, and prepare for tomorrow",
    templateName: "evening",
  },
  {
    img: "https://raw.githubusercontent.com/mkforde/rememberIt-images/refs/heads/main/template-screens/screen3.png", // Add appropriate image path
    description:
      "Gratitude Journal - Focus on appreciation and positive moments",
    templateName: "gratitude",
  },
];

interface TemplateSelectorProps {
  onTemplateSelect?: (templateName: TemplateName | null) => void;
  className?: string;
}

function TemplateSelector({
  onTemplateSelect,
  className = "",
}: TemplateSelectorProps = {}) {
  // Convert the extended slides to the format expected by Slideshow
  const slideshowSlides: Slide[] = templateSlides.map(
    ({ img, description }) => ({
      img,
      description,
    })
  );

  // Handle template selection (in the future, this will do something)
  const handleTemplateSelect = (index: number) => {
    if (onTemplateSelect) {
      onTemplateSelect(templateSlides[index].templateName);
    }
  };

  // Prevent form submission when clicking within the slideshow
  const handleSlideshowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onClick={handleSlideshowClick}>
      <Slideshow
        className={`bg-base-100 ${className}`}
        slides={slideshowSlides}
      />
    </div>
  );
}

export default TemplateSelector;
