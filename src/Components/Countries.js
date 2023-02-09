import { useState, useEffect } from "react";
import countryService from "../Services/countries";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await countryService.getAll();
      setCountries(countries);
    };

    fetchCountries();
  }, []);

  console.log(countries);
  const countriesToShow = countries.slice(0, 5);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Flag</td>
            <td>Name</td>
            <td>Region</td>
            <td>Population</td>
            <td>Languages</td>
            <td>Details</td>
          </tr>
        </thead>
        <tbody>
          {countriesToShow.map((c) => (
            <tr key={c.cioc}>
              <td>
                <img src={c.flags.png} alt={c.name.common} />
              </td>
              <td>{c.name.official}</td>
              <td>{c.region}</td>
              <td>{c.population}</td>
              <td>
                <ul>
                  {Object.values(c.languages).map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </td>
              <td>link</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Countries;
