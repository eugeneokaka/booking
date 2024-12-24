import Hero from "./components/hero";
import Destination from "./destination";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./login";
import Home from "./home";
import Book from "./book";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="book" element={<Book />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
