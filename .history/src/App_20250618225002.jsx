import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Cadastrar from "./components/Auth/Cadastrar";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
    </Routes>
  );
}

export default App;
