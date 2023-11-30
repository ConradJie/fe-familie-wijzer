import './Relations.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Baby, BellSimple, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetPerson from "../../hooks/useGetPerson.js";
import Table from "../../components/Table.jsx";
import useGetSpouses from "../../hooks/useGetSpouses.js";

function Relations() {
    const {pid} = useParams();
    const role = localStorage.getItem('role');
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouses = `http://localhost:8080/relations/persons/${pid}`;
    const urlNew = `/relationNew/${pid}`;
    const navigate = useNavigate();
    const urlGoBack = "/persons";
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouses, spousesError, spousesLoading} = useGetSpouses(urlSpouses);

    return (
        <main className="main-person-relations">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {person && <h2>Relaties van {person.givenNames} {person.surname}</h2>}
            <Table
                header={
                    <tr>
                        <th>Partner</th>
                        {role === 'ADMIN' &&
                            <th className="icon" onClick={() => navigate(urlNew)}><PlusCircle width={24} height={24}/>
                            </th>
                        }
                    </tr>
                }
                row={Object.keys(spouses).length > 0 &&
                    spouses.map((s) => {
                        return (
                            <tr key={s.id}>
                                <td>{(s.spouseGivenNames !== null) ? s.spouseGivenNames : "-"}</td>
                                <td>{(s.spouseSurname !== null) ? s.spouseSurname : "-"}</td>
                                <td className="icon"
                                    onClick={() => navigate(`/relationevents/${pid}/${s.id}/${s.spouseId}`)}><BellSimple
                                    width={24}
                                    height={24}/></td>
                                <td className="icon" onClick={() => navigate(`/children/${pid}/${s.id}/${s.spouseId}`)}>
                                    <Baby width={24}
                                          height={24}/>
                                </td>
                                {role === 'ADMIN' &&
                                    <td className="icon"
                                        onClick={() => navigate(`/relationUpdate/${pid}/${s.id}/${s.spouseId}`)}><Pencil
                                        width={24}
                                        height={24}/></td>
                                }
                                {role === 'ADMIN' &&
                                    <td className="icon"
                                        onClick={() => navigate(`/relationDelete/${pid}/${s.id}/${s.spouseId}`)}><Trash
                                        width={24}
                                        height={24}/></td>
                                }
                            </tr>
                        )
                    })
                }
            />
            {(personLoading || spousesLoading) && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spousesError && <p>{spousesError}</p>}
        </main>
    )
        ;
}

export default Relations;