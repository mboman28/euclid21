import { Routes, Route } from "react-router";

import Main from "./Main";
import NavBar from "./NavBar";
import About from "./About";
import Help from "./Help";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About/>} />
        <Route path="/help" element={<Help />} />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
