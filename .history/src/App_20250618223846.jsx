import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
// Importe outros componentes de página conforme necessário

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Outras rotas */}
    </Routes>
  );
}

export default App;
