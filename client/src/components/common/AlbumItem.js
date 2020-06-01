import React from "react";

export default function AlbumItem({ id, name, img, children }) {
  return (
    <div key={id || name} className="col-md-2">
      <div className="card mb-4 shadow-sm">
        {img && img !== "N/A" ? (
          <img src={img} width="100%" height="175" alt={name} />
        ) : (
          <img
            src={
              "https://lh3.googleusercontent.com/proxy/IaOygzPxsyz2gqbR6cUR_N6Q14WDdPkiNAd5WdoiiHaLgxQ-XWLXaTaScD0G2adPD8WobsUHBssxye5553V6ZeNpJtsH5YyGwIVGSwgMKHO7rFJEM2RtHViPUVyiQPUusjfxtIQK"
            }
            width="100%"
            height="175"
            alt={name}
          />
        )}

        <div className="card-body">
          <p className="card-text">{name}</p>
          {children}
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted"></small>
          </div>
        </div>
      </div>
    </div>
  );
}
