import React from "react";


const SearchList = ({users, loading, error}) => {
  
  return (
    <>
      <div className="search-result-container">
        <h3>Search Results</h3>
        <div className="result-container">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {users.length > 0 && (
            <ul className="list">
              {users.map((item, index) => (
                <li key={index}>{item.email}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchList;
