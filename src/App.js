import logo from './logo.svg';
import './App.css';
import Navbar1 from './Navbar';
import TodoList from './TodoList';
import MainPage from './MainPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<MainPage/>} path='/'/>
      <Route element={<MainPage/>} path='/user/:name'/>
    </Routes>
    </BrowserRouter>
   
    </>
  );
}

export default App;
