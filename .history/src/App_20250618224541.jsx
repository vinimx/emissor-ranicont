import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
