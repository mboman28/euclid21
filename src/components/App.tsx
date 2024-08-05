import { Routes, Route } from "react-router";

import Main from "./Main";
import NavBar from "./NavBar";
import About from "./About";
import Help from "./Help";

function App() {
  // TODO: react router + about page
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About/>} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </>
  );
}

export default App;
