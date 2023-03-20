import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import search from '../resources/search.svg';

interface SearchFieldProps {
  searchPrompt: string;
  setSearchPrompt: Dispatch<SetStateAction<string>>;
}

export default function SearchField({
  searchPrompt,
  setSearchPrompt
}: SearchFieldProps) {
  return (
    <SearchFieldContainer>
      <input
        type='text'
        placeholder='Name of pokemon'
        value={searchPrompt}
        onChange={(event) => setSearchPrompt(event.target.value)}
      />
      <MagnifyingGlass src={search} alt='magnifying glass' />
    </SearchFieldContainer>
  );
}

const SearchFieldContainer = styled.div`
  width: 250px;
  padding: 1em;
  padding-bottom: 0;

  display: flex;
  justify-content: center;

  > input {
    height: 3em;
    width: 100%;

    padding-left: 1em;
    border: 1px solid gray;
    border-right: none;

    &:focus {
      outline: none;
    }
  }
`;

const MagnifyingGlass = styled.img`
  height: 2.5em;
  border: 1px solid gray;
  border-left: none;
  background: white;
`;
