import { Routes, Route } from "react-router";

import Main from "./Main";

function App() {
  // TODO: react router + about page
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
