import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/pages/home/";
import Detail from "./views/pages/detail";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
