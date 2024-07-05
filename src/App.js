import LoginForm from './Components/LoginForm/LoginForm';
import Home from './Components/Home/Home';
import VerProductos from './Components/VerProductos/VerProductos'
import AdministrarProductos from './Components/AdministrarProductos/AdministrarProductos'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginForm/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/VerProductos" element={<VerProductos/>}></Route>
        <Route path="/AdministrarProductos" element={<AdministrarProductos/>}></Route>
      </Routes>
    </Router>


  );
}

export default App;
