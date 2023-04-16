import styled from 'styled-components';

import { IoSearch } from 'react-icons/io5';

const InputContainer = styled.label`
  background-color: var(--colors-ui-base);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  border-radius: var(--radii);
  box-shadow: var(--shadow);
  width: 100%;
  margin-bottom: 1rem;
  overflow: hidden;

  @media (min-width: 767px) {
    margin-bottom: 0;
    width: 300px;
  }
`;

const Input = styled.input.attrs({
  type: 'search',
  placeholder: 'Search for a country...',
})`
  margin-left: 2rem;
  border: none;
  outline: none;
  color: var(--color-text);
  background-color: var(--colors-ui-base);
`;

export const Search = (props) => {
  const { search, setSearch } = props;
  return (
    <>
      <InputContainer>
        <IoSearch />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </InputContainer>
    </>
  );
};
