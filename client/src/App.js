import './App.css';
import { BrowserRouter, Route,Routes}  from "react-router-dom";
import About from "./components/About";
import Register from './components/Register';
import Login from "./components/Login"
import AddProduct from "./components/AddProduct"
import Error from './components/Error';
import Mainheader from "./Mainheader"


function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/"  element={<Mainheader />} >
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/addproduct" element={<AddProduct/>} />
    <Route path="/about" element={<About/>} />
    <Route path="*" element={<Error/>} />
 </Route>
  </Routes>
  </BrowserRouter>
}

export default App;





