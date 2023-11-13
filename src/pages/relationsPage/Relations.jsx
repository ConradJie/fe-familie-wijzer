import './Relations.css';
import useGetData from "../../hooks/useGetData.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetPerson from "../../hooks/useGetPerson.js";

function Relations() {
    const {pid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouses = `http://localhost:8080/persons/spouses/${pid}`;
    const urlNew = `/relationNew/${pid}`;
    const navigate = useNavigate();
    const goBack = "/persons";
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {data, dataError, dataLoading} = useGetData(urlSpouses);

    return (
        <main className="main-person-relations">
            <Link to={goBack}><ArrowLeft width={24} height={24}/></Link>
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
                    data.map((p) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.givenNames}</td>
                                <td>{p.surname}</td>
                                <td onClick={() => navigate(`/relationDelete/${pid}/${p.id}`)}><Trash width={24}
                                                                                                      height={24}/></td>
                            </tr>
                        )
                    })
                }
                {dataLoading && <p>Loading...</p>}
                {dataError && <p>Relation url: {urlSpouses}<br/>error:{dataError}</p>}
                </tbody>
            </table>
            {personLoading && <p>Loading person...</p>}
            {personError && <p>Person error:{personError}</p>}
        </main>
    )
        ;
}

export default Relations;