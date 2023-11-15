import React from "react";
import Button from "components/Button";
import Input from "components/Input";
import { BsSearch } from "react-icons/bs";
import  SearchList from "./SearchList";

const SearchBar = () => {
  return (
    <>
      <div className="search-bar">
        <Input type="text" placeholder="search..." />
        <Button text={<BsSearch size={25} />} />
      </div>
      <SearchList/>
    </>
  );
};

export default SearchBar;
