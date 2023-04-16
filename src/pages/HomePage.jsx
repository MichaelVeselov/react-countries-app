import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ALL_COUNTRIES } from '../config';

import { orderBy } from 'lodash';

import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { Card } from '../components/Card';

export const HomePage = (props) => {
  const { countries, setCountries } = props;

  const [filteredCountries, setFilteredCountries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then((response) => {
        const { data } = response;
        setCountries(data);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);

  const handleSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((country) => country.region.includes(region));
    }

    if (search) {
      data = data.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const sortedData = orderBy(data, ['name'], ['asc']);

    setFilteredCountries(sortedData);
  };

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((country) => {
          const countryInfo = {
            img: country.flags.png,
            name: country.name,
            info: [
              {
                title: 'Population',
                description: country.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: country.region,
              },
              {
                title: 'Capital',
                description: country.capital,
              },
            ],
          };
          return (
            <Card
              key={country.name}
              {...countryInfo}
              onClick={() => {
                navigate(`/country/${country.name}`);
              }}
            ></Card>
          );
        })}
      </List>
    </>
  );
};
