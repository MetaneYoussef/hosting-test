import React, { useState } from "react";
import films from "../MovieList/films"; // Assurez-vous que le chemin est correct

const SearchComponent = ({ isExpanded, setExpanded }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);

    if (query) {
      const allFilms = Object.values(films).flat();
      const filtered = allFilms.filter((film) =>
        film.title.toLowerCase().includes(query)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleFilmClick = (film) => {
    alert(`Film sélectionné : ${film.title}`);
  };

  return (
    <div className={`flex items-center transition-all duration-500 ease-in-out ${isExpanded ? 'w-full' : 'w-68'} relative mr-10`}>
      <input
        type="text"
        placeholder="Recherchez..."
        value={query}
        onChange={handleSearch}
        onFocus={() => setExpanded(true)}
        className="p-1.5 bg-black text-white border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-black-600 transition-all duration-500 ease-in-out w-full"
      />
      {isExpanded && (
        <button onClick={() => setExpanded(false)} className="absolute right-0 text-2xl text-white mr-4">×</button>
      )}
      <div className={`absolute mt-2 w-80 bg-black text-white rounded-lg shadow-lg overflow-hidden z-10 top-full ${!isExpanded ? 'hidden' : ''}`}>
        {query && results.length > 0 ? (
          results.map((film) => (
            <div
              key={film.id}
              className="px-4 py-2 hover:bg-gray-300 hover:text-black cursor-pointer transition-colors"
              onClick={() => handleFilmClick(film)}
            >
              {film.title}
            </div>
          ))
        ) : query && (
          <div className="px-4 py-2">
            Aucun film trouvé.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;