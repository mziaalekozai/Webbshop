import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Sök..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "100%", padding: "10px" }}
      />
    </div>
  );
};

export default Search;
