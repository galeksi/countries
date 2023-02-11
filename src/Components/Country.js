import { useState, useEffect } from 'react'
import countryService from '../utils/services'
import { useParams, Link } from 'react-router-dom'

import { Typography, Box, Stack, Avatar } from '@mui/material'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import { stringToColor, Prime } from '../utils/styles'

const Country = () => {
  const [country, setCountry] = useState(null)
  const name = useParams().name

  useEffect(() => {
    const fetchCountry = async () => {
      const country = await countryService.getSingle(name)
      setCountry(country[0])
    }

    fetchCountry()
  }, [name])

  if (!country) return <h2>Loading</h2>

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: '60%' }}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="left" alignItems="center">
            <Avatar
              sx={{
                bgcolor: stringToColor(name),
                width: 80,
                height: 80,
                mr: 3,
              }}
            >
              <Typography variant="h4">{`${country.cca2}`}</Typography>
            </Avatar>
            <div>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
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
            The country belongs to <Prime>{country.region}</Prime> and{' '}
            <Prime>{country.subregion}</Prime> sub-region. Located at{' '}
            <Prime>Lat {country.latlng[0]}</Prime> and{' '}
            <Prime>Lng {country.latlng[1]}</Prime>, this country has a
            population of <Prime>{country.population}</Prime>. According to the
            CIA World Factbook it {country.independent ? 'has' : 'has not'}{' '}
            gained independence.
          </Typography>
          <Box display="flex" justifyContent="left" alignItems="center">
            <Link to={'/countries'}>
              <ArrowBackIosRoundedIcon
                className="countryDetailBack"
                fontSize="large"
                color="action"
              />
            </Link>
            <Link to={`${country.maps.googleMaps}`} target="_blank">
              <LocationOnIcon fontSize="large" color="primary" />
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Country
