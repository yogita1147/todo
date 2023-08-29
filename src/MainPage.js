import logo from './logo.svg';
import './App.css';
import Navbar1 from './Navbar';
import TodoList from './TodoList';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {useParams} from 'react-router-dom';


function MainPage() {
    const params=useParams();
    const {name}=params;
  return (
    <>
    <Navbar1/>
    <TodoList name={name}/>
    </>
  );
}

export default MainPage;
