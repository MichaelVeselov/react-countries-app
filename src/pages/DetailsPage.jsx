import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { searchByCountry } from '../config';

import { IoArrowBack } from 'react-icons/io5';
import { Button } from '../components/Button';
import { Info } from '../components/Info';

export const DetailsPage = () => {
  const [country, setCountry] = useState(null);

  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(searchByCountry(name)).then((response) => {
      const { data } = response;
      setCountry(data[0]);
    });
  }, [name]);

  if (country) {
    const countryInfo = {
      name: country?.name.common,

      nativeNames: Object.keys(country?.name.nativeName).map((key) => [
        key,
        country.name.nativeName[key].common,
      ]),

      flag: country.flags.png || country.flags.svg,
      flagDescription: country.flags.alt,

      capital: country.capital[0],

      population: country.population.toLocaleString(),

      region: country.region,

      subregion: country.subregion,

      topLevelDomains: country.tld,

      currencies: Object.keys(country.currencies).map((key) => [
        key,
        country.currencies[key].name,
      ]),

      languages: Object.keys(country.languages).map((key) => [
        key,
        country.languages[key],
      ]),

      borders: country.borders,
    };

    return (
      <div>
        <Button onClick={() => navigate(-1)}>
          <IoArrowBack /> Back
        </Button>
        <Info {...countryInfo} />
      </div>
    );
  }
};
