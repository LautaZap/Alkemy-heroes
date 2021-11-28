import Login from "./routes/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from "./routes/Team";
import PrivateRoute from "./components/PrivateRoute";
import HeroSearch from "./routes/HeroSearch";
import NotFound from "./routes/NotFound";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/search" element={<PrivateRoute />}>
            <Route exact path="/search" element={<HeroSearch />} />
          </Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Team />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
