import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
