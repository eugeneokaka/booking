import Hero from "./components/hero";
import Destination from "./destination";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./login";
import Home from "./home";
import Book from "./book";
import Signup from "./signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="book" element={<Book />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
