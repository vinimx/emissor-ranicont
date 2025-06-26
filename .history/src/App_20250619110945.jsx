import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Cadastrar from "./components/Auth/Cadastrar";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
