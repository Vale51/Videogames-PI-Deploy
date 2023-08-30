import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Landing from './components-copy/Landing/Landing';
import Home from './components-copy/Home/Home';
import Form from './components-copy/Form/Form';
import Nav from './components-copy/Nav/Nav';
import Detail from './components-copy/Detail/Detail';
import axios from "axios"
axios.defaults.baseURL = "https://videogames-pi-deploy-production.up.railway.app/"

export default function App() {
  const location = useLocation();


  return (
    <div class="overflow">
   
  { location.pathname !== "/" && <Nav currentPath={location.pathname} /> }

  <Routes>

    <Route path="/" element={<Landing />} />
    <Route path="/home"
      element={<Home />}
    />
    <Route path="/form"
      element={<Form />}
    />

    <Route path="/detail/:id"
      element={<Detail />}
    />


  </Routes>
    </div >
  );
}


