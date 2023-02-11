import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countryService from "../utils/services";
import { paginationLoader } from "../utils/helpers";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Paper,
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";

import { Search, SearchIconWrapper, StyledInputBase } from "../utils/styles";

const Countries = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await countryService.getAll();
      setAllCountries(countries);
      setCountries(countries);
    };
    fetchCountries();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const searchByName = () => {
    // console.log(allCountries);
    const result = allCountries.filter((country) =>
      JSON.stringify(country.name).toLowerCase().includes(search.toLowerCase())
    );
    setCountries(result);
    setPage(0);
    setSearch("");
  };

  const countriesToShow = paginationLoader(countries, page, rowsPerPage);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <PublicIcon sx={{ mr: 2 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Countries
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchByName();
                  }
                }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Flag</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Region</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Population</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Languages</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="countrytablebody">
            {countriesToShow.map((c) => (
              <TableRow key={c.ccn3}>
                <TableCell>
                  <img
                    src={c.flags.png}
                    height="100"
                    width="150"
                    alt={c.name.common}
                  />
                </TableCell>
                <TableCell>{c.name.official}</TableCell>
                <TableCell>{c.region}</TableCell>
                <TableCell>{c.population}</TableCell>
                <TableCell>
                  <ul>
                    {Object.values(c.languages).map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Link to={`/countries/${c.name.common}`}>
                    <ArrowForwardIosRoundedIcon
                      className="countryDetailButton"
                      color="primary"
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={countries.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>
    </>
  );
};

export default Countries;
