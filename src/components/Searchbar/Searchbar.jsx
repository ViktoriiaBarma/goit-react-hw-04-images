import React, { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
//import PropTypes from 'prop-types';

export const Searchbar = ({hendleInput}) => {

  const [value, setValue] = useState('') 


  const handleChange = ({target: {value}}) => {
    setValue(value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return 'Please enter key words for search';
    }
    hendleInput(value);
    setValue('');
  };
  
  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">Search</SearchFormBtn>
        <SearchFormInput
          type="text"
          autoComplete='off'
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};
