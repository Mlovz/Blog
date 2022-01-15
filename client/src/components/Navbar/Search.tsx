import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="search">
      <span>
        <i className="fal fa-search"></i>
      </span>
      <input
        type="text"
        className=""
        value={search}
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
