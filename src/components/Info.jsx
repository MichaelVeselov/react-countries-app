import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import axios from 'axios';
import { filterByCode } from '../config';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

export const Info = (props) => {
  const {
    name,
    nativeNames = [],
    flag,
    flagDescription,
    capital,
    population,
    region,
    subregion,
    topLevelDomains = [],
    currencies = [],
    languages = [],
    borders = [],
  } = props;

  const [neighbors, setNeighbors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (borders.length)
      axios.get(filterByCode(borders)).then((response) => {
        const { data } = response;
        setNeighbors(data.map((country) => country.name.common));
      });
  }, [borders]);

  return (
    <Wrapper>
      <InfoImage src={flag} alt={flagDescription} />
      <div>
        <InfoTitle>{name}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Names: </b>
              {nativeNames.map(([language, name]) => (
                <span key={language}>'{name}', </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Population: </b>
              {population.toLocaleString()}
            </ListItem>
            <ListItem>
              <b>Region: </b>
              {region}
            </ListItem>
            <ListItem>
              <b>Sub Region: </b>
              {subregion}
            </ListItem>
            <ListItem>
              <b>Capital: </b>
              {capital}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domains: </b>
              {topLevelDomains.map((domain) => (
                <span key={domain}>'{domain}', </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currency: </b>
              {currencies.map(([code, currency]) => (
                <span key={code}>'{currency}', </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Languages: </b>
              {languages.map(([language, name]) => (
                <span key={language}>'{name}', </span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries: </b>
          {!borders.length ? (
            <span>There are no border countries...</span>
          ) : (
            <TagGroup>
              {neighbors.map((neighbor) => (
                <Tag
                  key={neighbor}
                  onClick={() => navigate(`/country/${neighbor}`)}
                >
                  {neighbor}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
