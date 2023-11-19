
import React, { useState, useEffect } from "react";
import AsynchSelect from 'react-select/async';
import useFetch from "components/CustomHook";
import { getLocalStorage } from "@/Utils";
import SearchList from "./SearchList"; 

const SearchBar = () => {
  const { data, loading, error, fetchData } = useFetch();
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState(null);

  const searchHandler = async () => {
    const userData = getLocalStorage("headerData");
    const url = "http://206.189.91.54/api/v1/users";
    const config = {
      method: "GET",
      headers: { ...userData },
    };
    fetchData(url, config);
    console.log(userData)
    console.log(data)
  };

  useEffect(() => {
    searchHandler();
    console.log(data)
  }, []);

  useEffect(() => {
    if (data && data.data) {
      setUsers(data.data.slice(-10));
      setOptions(data.data.flatMap((users) => [
        { value: users.id, label: users.email },
      ]))
      console.log(data.data.flatMap((users) => [
        users.email
      ]))
    }
  }, [data]);

  const handleChange = (selectedOption) => {
    console.log("changes", selectedOption)
  }

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filtered = options.filter(option => option.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      console.log("loadoptions", searchValue, filtered);
      callback(filtered);
    }, 2000)
  }

  return (
    <>
      <AsynchSelect
        className="search-input"
        loadOptions={loadOptions}
        isMulti
        onChange={handleChange}
        placeholder="search..."
      />
      <SearchList users={users} loading={loading} error={error} />
    </>
  );
};

export default SearchBar;
