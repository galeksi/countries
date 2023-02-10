import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Countries from "./Components/Countries";
import Country from "./Components/Country";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:name" element={<Country />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
