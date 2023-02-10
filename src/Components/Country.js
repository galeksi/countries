import { useState, useEffect } from "react";
import countryService from "../Services/countries";
import { useParams } from "react-router-dom";

const Country = () => {
  const [country, setCountry] = useState(null);
  const name = useParams().name;

  useEffect(() => {
    const fetchCountry = async () => {
      const country = await countryService.getSingle(name);
      setCountry(country[0]);
    };

    fetchCountry();
  }, [name]);

  console.log(country);
  if (!country) return <h2>Loading</h2>;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <h3>{country.capital[0]}</h3>
      <div>
        <img src={country.flags.png} alt={country.name.common} />
      </div>
      <p>
        The country belongs to <b>{country.region}</b> and{" "}
        <b>{country.subregion}</b> sub-region.
        <br />
        Located at <b>Lat {country.latlng[0]}</b> and{" "}
        <b>Lng {country.latlng[1]}</b>, this country has a population of{" "}
        <b>{country.population}.</b>
        <br />
        According to the CIA World Factbook it{" "}
        {country.independent ? "has" : "has not"} gained independence.
      </p>
    </div>
  );
};

export default Country;
