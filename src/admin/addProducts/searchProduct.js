import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';

export default function SearchProduct({onSearch}) {

  const [searchWord, setSearchWord] = useState(null);

  const handleSearch = (event) => {
    setSearchWord(event.target.value);
    onSearch(event.target.value);
  };
  return (
    <>
    <TextField
            id="demo-helper-text-misaligned"
            label=" חיפוש.."
            onInput={handleSearch}
            value={searchWord}
          />                                                 
    
</>
  )
}
