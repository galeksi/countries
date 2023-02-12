import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1'

// Gets all entries from API
const getAll = async () => {
  const request = await axios.get(`${baseUrl}/all`)
  return request.data
}

// Gets single country entry by 'common' name
const getSingle = async (name) => {
  const request = await axios.get(`${baseUrl}/name/${name}`)
  return request.data
}

const countryService = { getAll, getSingle }
export default countryService
