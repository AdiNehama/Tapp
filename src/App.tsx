import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "../src/pages/homePage/home";

import ScrollToTop from "../src/components/scrolltotop"; // ייבוא הקובץ
import Ecommerce from "../src/components/ecommerce/ecommerce";
import Yahtzee from "../src/components/yahtzee/yahtzee";


function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop /> {/* הפעלת הפונקציונליות */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/yahtzee" element={<Yahtzee />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
