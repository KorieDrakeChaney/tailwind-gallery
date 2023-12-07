import React from "react";
import GalleryItem from "./item";

type GalleryProps = {
  components: Array<React.ReactNode>;
};

const Gallery = ({ components }: GalleryProps) => {
  return (
    <div>
      {components.map((component, index) => (
        <GalleryItem key={index} component={component} />
      ))}
    </div>
  );
};

export default Gallery;
