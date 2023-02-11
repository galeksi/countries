import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countryService from "../Services/countries";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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

  const paginationLoader = (data, currentPage, rowsPerPage) => {
    const itemOffset = currentPage * rowsPerPage;
    const endOffset = itemOffset + rowsPerPage;
    const itemsToView = data.slice(itemOffset, endOffset);
    return itemsToView;
  };

  const searchByName = () => {
    const result = allCountries.filter((country) =>
      JSON.stringify(country.name).toLowerCase().includes(search.toLowerCase())
    );
    setCountries(result);
    setPage(0);
    setSearch("");
  };

  const countriesToShow = paginationLoader(countries, page, rowsPerPage);

  console.log(countriesToShow);

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
                    console.log("Pressed enter");
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
          <TableBody>
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
                  <Link to={`/${c.name.common}`}>
                    <ArrowForwardIosRoundedIcon color="primary" />
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
