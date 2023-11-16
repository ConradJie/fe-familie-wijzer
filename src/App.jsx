import './App.css'
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import logo from './assets/familiewijzer-secondary.svg'
import Home from "./pages/homePage/Home.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Children from "./pages/childrenPage/Children.jsx";
import Relations from "./pages/relationsPage/Relations.jsx";
import Persons from "./pages/personsPage/Persons.jsx";
import PersonNew from "./pages/personsPage/PersonNew.jsx";
import PersonUpdate from "./pages/personsPage/PersonUpdate.jsx";
import PersonDelete from "./pages/personsPage/PersonDelete.jsx";
import PersonDetail from "./pages/personsPage/PersonDetail.jsx";
import Trees from "./pages/treesPage/Trees.jsx";
import SignUp from "./pages/signUpPage/SignUp.jsx";
import Login from "./pages/loginPage/Login.jsx";
import PersonEvents from "./pages/eventsPage/PersonEvents.jsx";
import PersonEventNew from "./pages/eventsPage/PersonEventNew.jsx";
import PersonEventUpdate from "./pages/eventsPage/PersonEventUpdate.jsx";
import PersonEventDelete from "./pages/eventsPage/PersonEventDelete.jsx";
import EventMultimedias from "./pages/eventMultimediasPage/EventMultimedias.jsx";
import EventMultimediaNew from "./pages/eventMultimediasPage/EventMultimediaNew.jsx";
import EventMultimediaUpdate from "./pages/eventMultimediasPage/EventMultimediaUpdate.jsx";
import EventMultimediaDelete from "./pages/eventMultimediasPage/EventMultimediaDelete.jsx";
import RelationNew from "./pages/relationsPage/RelationNew.jsx";
import RelationDelete from "./pages/relationsPage/RelationDelete.jsx";
import RelationUpdate from "./pages/relationsPage/RelationUpdate.jsx";
import ChildNew from "./pages/childrenPage/ChildNew.jsx";
import ChildDelete from "./pages/childrenPage/ChildDelete.jsx";
import RelationEvents from "./pages/eventsPage/RelationEvents.jsx";
import RelationEventNew from "./pages/eventsPage/RelationEventNew.jsx";
import RelationEventUpdate from "./pages/eventsPage/RelationEventUpdate.jsx";

function App() {
    const navigate = useNavigate();

    return (
        <div className="main-app">
            <nav className="outer-content-container main-navigation">
                <ul className="outer-content-container main-navigation-links">
                    <li><Link to="/"><img id="nav-logo" src={logo}
                                          alt="Home pagina Familie Wijzer"/></Link></li>
                    <li><Link to="/persons">Personen</Link></li>
                    <li><Link to="/overviews">Overzichten</Link></li>
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
                <Route path="/personUpdate/:id" element={<PersonUpdate/>}/>
                <Route path="/personDelete/:id" element={<PersonDelete/>}/>
                <Route path="/personDetail/:id" element={<PersonDetail/>}/>
                <Route path="/personEvents/:id" element={<PersonEvents/>}/>
                <Route path="/personEventNew/:pid" element={<PersonEventNew/>}/>
                <Route path="/personEventUpdate/:pid/:id" element={<PersonEventUpdate/>}/>
                <Route path="/personEventDelete/:pid/:id" element={<PersonEventDelete/>}/>
                <Route path="/eventMultimedias/:t/:tid/:eid" element={<EventMultimedias/>}/>
                <Route path="/eventMultimediaNew/:t/:tid/:eid" element={<EventMultimediaNew/>}/>
                <Route path="/eventMultimediaUpdate/:t/:tid/:eid/:id" element={<EventMultimediaUpdate/>}/>
                <Route path="/eventMultimediaDelete/:t/:tid/:eid/:id" element={<EventMultimediaDelete/>}/>
                <Route path="/relations/:pid" element={<Relations/>}/>
                <Route path="/relationNew/:pid" element={<RelationNew/>}/>
                <Route path="/relationUpdate/:pid/:rid/:sid" element={<RelationUpdate/>}/>
                <Route path="/relationDelete/:pid/:rid/:sid" element={<RelationDelete/>}/>
                <Route path="/relationEvents/:pid/:rid/:sid" element={<RelationEvents/>}/>
                <Route path="/relationEventNew/:pid/:rid/:sid" element={<RelationEventNew/>}/>
                <Route path="/relationEventUpdate/:pid/:rid/:sid/:id" element={<RelationEventUpdate/>}/>
                <Route path="/relationEventDelete/:pid/:rid/:sid/:id" element={<RelationDelete/>}/>
                <Route path="/children/:pid/:rid/:sid" element={<Children/>}/>
                <Route path="/childNew/:pid/:rid/:sid" element={<ChildNew/>}/>
                <Route path="/childDelete/:pid/:rid/:sid/:id" element={<ChildDelete/>}/>
                <Route path="/trees" element={<Trees/>}/>
                <Route path="/signin" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

            <footer className="main-footer outer-content-container">
                2023 &copy; Familie Wijzer
            </footer>
        </div>
    )
}

export default App
