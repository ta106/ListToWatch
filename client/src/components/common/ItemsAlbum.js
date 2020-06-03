import React, { useState } from "react";
import Album from "./Album";
import ItemDetails from "./ItemDetails";

export default function ItemsAlbum({ list, action, className }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imdbID, setImdbID] = useState(-1);
  return (
    <>
      <Album
        key={1}
        imgs={list.map((item) => {
          return {
            id: item.id,
            name: item.name || item.Title,
            img_url: item.img_url || item.Poster,
            children: (
              <div className="btn-group">
                <button
                  type="button"
                  className={className}
                  onClick={() => {
                    setImdbID(item.imdbID);
                    setIsOpen(true);
                  }}
                >
                  {action}
                </button>
              </div>
            ),
          };
        })}
      ></Album>

      {modalIsOpen && (
        <ItemDetails
          setIsOpen={setIsOpen}
          imdbID={imdbID}
          modalIsOpen={modalIsOpen}
        />
      )}
    </>
  );
}
