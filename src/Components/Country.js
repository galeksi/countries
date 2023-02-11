import { useState, useEffect } from "react";
import countryService from "../Services/countries";
import { useParams, Link } from "react-router-dom";

// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Avatar from "@mui/material/Avatar";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Typography, Box, Stack, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

const Prime = styled("b")(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

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
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: "60%" }}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="left" alignItems="center">
            <Avatar
              sx={{
                bgcolor: stringToColor(name),
                width: 80,
                height: 80,
                mr: 3,
              }}
              children={`${country.cca2}`}
            />
            <div>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {country.name.common.toUpperCase()}
              </Typography>
              <Typography variant="h5">{country.capital[0]}</Typography>
            </div>
          </Box>
          <div>
            <img
              src={country.flags.png}
              width="100%"
              alt={country.name.common}
            />
          </div>
          <Typography variant="h6">
            The country belongs to <Prime>{country.region}</Prime> and{" "}
            <Prime>{country.subregion}</Prime> sub-region. Located at{" "}
            <Prime>Lat {country.latlng[0]}</Prime> and{" "}
            <Prime>Lng {country.latlng[1]}</Prime>, this country has a
            population of <Prime>{country.population}</Prime>. According to the
            CIA World Factbook it {country.independent ? "has" : "has not"}{" "}
            gained independence.
          </Typography>
          <Box display="flex" justifyContent="left" alignItems="center">
            <Link to={`/`}>
              <ArrowBackIosRoundedIcon fontSize="large" color="action" />
            </Link>
            <Link to={`${country.maps.googleMaps}`} target="_blank">
              <LocationOnIcon fontSize="large" color="primary" />
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Country;
