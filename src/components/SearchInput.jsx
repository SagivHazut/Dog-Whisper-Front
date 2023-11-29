import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { BreedsImages } from './BreedsImages'

export const SearchInput = ({ apiData }) => {
  const [inputValue, setInputValue] = useState('')
  const options = apiData?.map((item) => item.name)

  const filterOptions = (options, { inputValue }) => {
    if (inputValue.trim() === '') {
      return options
    }
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  const filteredData =
    inputValue.trim() === ''
      ? apiData
      : apiData.filter((item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        )

  return (
    <>
      <Autocomplete
        sx={{
          width: '50%',
          margin: 'auto',
          display: 'block',
        }}
        freeSolo
        options={options}
        filterOptions={filterOptions}
        value={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <BreedsImages apiData={filteredData} />
    </>
  )
}
