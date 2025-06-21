import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Cadastrar from "./components/Auth/Cadastrar";
import Dashboard from "./components/Dashboard";
import Produtos from "./components/Produtos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />
    </Routes>
  );
}

export default App;
