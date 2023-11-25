import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useFetch } from 'Components/CustomHook';
import { getLocalStorage } from '@/Utils';
import SearchList from './SearchList';

const SearchBar = () => {
  // Custom hook for fetching data
  const { data, fetchData, loading, error } = useFetch();

  // State for storing fetched users and select options
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState();

  // Function to handle user search
  const searchHandler = async () => {
    const userData = getLocalStorage('headerData');
    const url = 'http://206.189.91.54/api/v1/users';
    const config = {
      method: 'GET',
      headers: { ...userData },
    };
    fetchData(url, config);
  };

  // Effect to trigger search on component mount
  useEffect(() => {
    searchHandler();
  }, []);

  // Effect to update users and options when data changes
  useEffect(() => {
    if (!loading && !error && data && data.data) {
      // Store the last 10 users
      setUsers(data.data.slice(-10));

      // Create options from user data
      setOptions(
        data.data.flatMap((user) => [{ value: user.id, label: user.email }])
      );
    }
  }, [data, loading, error]);

  // Handle changes in the selected option
  const handleChange = (selectedOption) => {
    // Add a custom class to the selected option
    const modifiedOption = { ...selectedOption, class: 'User' };
    // Update selected options
    setSelectedOptions(modifiedOption);
  };

  // Load options for the search input
  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      // Filter options based on search value
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filtered);
    }, 2000);
  };

  return (
    <>
      {/* AsyncSelect for the search input */}
      <AsyncSelect
        className="search-input"
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder="Search..."
      />
      {/* Display search results */}
      <SearchList
        users={users}
        loading={loading} 
        error={error}  
        selectedOptions={selectedOptions}
      />
    </>
  );
};

export default SearchBar;
