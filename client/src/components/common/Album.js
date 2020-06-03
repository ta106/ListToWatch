import React from "react";
import AlbumItem from "./AlbumItem";

export default function Album({ imgs }) {
  return (
    <div className="container">
      <div className="row">
        {imgs.map((img) => {
          return (
            <AlbumItem
              key={img.id}
              name={img.name}
              id={img.id}
              img={img.img_url}
              children={img.children}
            ></AlbumItem>
          );
        })}
      </div>
    </div>
  );
}
