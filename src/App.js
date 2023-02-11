import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./Components/Countries";
import Country from "./Components/Country";
import { Container } from "@mui/material";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:name" element={<Country />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
