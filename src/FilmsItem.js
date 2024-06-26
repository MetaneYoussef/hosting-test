import React from "react";
import "./styles.css"; // Assurez-vous que le chemin d'accès est correct

const FilmsItem = ({ film, onClick }) => {
  return (
    <div style={{ display: "inline-block", margin: "10px" }}>
      <img
        src={film.imageUrl}
        alt={film.title}
        style={{ width: "150px", height: "auto", cursor: "pointer" }}
        onClick={() => onClick(film)}
      />
    </div>
  );
};

export default FilmsItem;
