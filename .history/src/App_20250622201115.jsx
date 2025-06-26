import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Cadastrar from "./components/Auth/Cadastrar";
import Dashboard from "./components/Dashboard";
import Produtos from "./components/Produtos";
import Clientes from "./components/Clientes";
import NotaFiscal from "./components/NotaFiscal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/notas" element={<NotaFiscal />} />
    </Routes>
  );
}

export default App;
