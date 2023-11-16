import './Relations.css';
import useGetData from "../../hooks/useGetData.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Baby, BellSimple, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetPerson from "../../hooks/useGetPerson.js";

function Relations() {
    const {pid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouses = `http://localhost:8080/relations/persons/${pid}`;
    const urlNew = `/relationNew/${pid}`;
    const navigate = useNavigate();
    const urlGoBack = "/persons";
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {data, dataError, dataLoading} = useGetData(urlSpouses);

    return (
        <main className="main-person-relations">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {person && <h2>Relaties van {person.givenNames} {person.surname}</h2>}
            <table>
                <thead>
                <tr>
                    <th>Partner</th>
                    <th onClick={() => navigate(urlNew)}><PlusCircle width={24} height={24}/></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(data).length > 0 &&
                    data.map((s) => {
                        return (
                            <tr key={s.id}>
                                <td>{(s.spouseGivenNames !== null) ? s.spouseGivenNames : "-"}</td>
                                <td>{(s.spouseSurname !== null) ? s.spouseSurname : "-"}</td>
                                <td onClick={() => navigate(`/relationevents/${pid}/${s.id}/${s.spouseId}`)}><BellSimple width={24}
                                                                                                             height={24}/></td>
                                <td onClick={() => navigate(`/children/${pid}/${s.id}/${s.spouseId}`)}><Baby width={24}
                                                                                                             height={24}/></td>
                                <td onClick={() => navigate(`/relationUpdate/${pid}/${s.id}/${s.spouseId}`)}><Pencil
                                    width={24}
                                    height={24}/></td>
                                <td onClick={() => navigate(`/relationDelete/${pid}/${s.id}/${s.spouseId}`)}><Trash
                                    width={24}
                                    height={24}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {personLoading && <p>Loading person...</p>}
            {personError && <p>Person error:{personError}</p>}
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>Relation url: {urlSpouses}<br/>error:{dataError}</p>}
        </main>
    )
        ;
}

export default Relations;