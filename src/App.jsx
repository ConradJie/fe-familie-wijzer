import './App.css'
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import logo from './assets/familiewijzer-secondary.svg'
import Home from "./pages/homePage/Home.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Persons from "./pages/personsPage/Persons.jsx";
import Children from "./pages/childrenPage/Children.jsx";
import Relations from "./pages/relationsPage/Relations.jsx";
import PersonNew from "./pages/personsPage/PersonNew.jsx";
import PersonDetail from "./pages/personsPage/PersonDetail.jsx";
import PersonUpdate from "./pages/personsPage/PersonUpdate.jsx";
import Trees from "./pages/treesPage/Trees.jsx";
import SignUp from "./pages/signUpPage/SignUp.jsx";
import Login from "./pages/loginPage/Login.jsx";

function App() {
    const navigate = useNavigate();

    return (
        <div className="app-main">
            <nav className="outer-content-container main-navigation">
                <ul className="outer-content-container main-navigation-links">
                    <li><Link to="/"><img id="nav-logo" src={logo}
                                          alt="Home pagina Familie Wijzer"/></Link></li>
                    <li><Link to="/persons">Personen</Link></li>
                    <li><Link to="/relations">Relaties</Link></li>
                    <li><Link to="/children">Kinderen</Link></li>
                    <li><Link to="/trees">Stambomen</Link></li>
                </ul>
                <ul className="outer-content-container main-navigation-login">
                    <li><Link to="/signin">Registreren</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/persons" element={<Persons/>}/>
                <Route path="/personNew" element={<PersonNew/>}/>
                <Route path="/personDetail/:id" element={<PersonDetail/>}/>
                <Route path="/personUpdate/:id" element={<PersonUpdate/>}/>
                <Route path="/relations" element={<Relations/>}/>
                <Route path="/children" element={<Children/>}/>
                <Route path="/trees" element={<Trees/>}/>
                <Route path="/signin" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

            <footer className="main-footer outer-content-container">
                &copy; 2023 Familie Wijzer
            </footer>
        </div>
    )
}

export default App
