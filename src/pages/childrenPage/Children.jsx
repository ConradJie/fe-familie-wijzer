import './Children.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";
import useGetData from "../../hooks/useGetData.js";

function Children() {
    const {pid, rid, sid} = useParams();
    const urlGoBack = `/relations/${pid}`;
    const urlNew = `/childNew/${pid}/${rid}/${sid}`;
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouse = `http://localhost:8080/persons/${sid}`;
    const urlChildren = `http://localhost:8080/relations/${rid}/children`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const {data, dataError, dataLoading} = useGetData(urlChildren);
    const navigate = useNavigate();

    return (
        <main className="main-children">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {person?.id && spouse?.id &&
                <h2>Kinderen van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname}</h2>}
            {person?.id && sid == "null" &&
                <h2>Kinderen van {person.givenNames} {person.surname}</h2>}
            <table>
                <thead>
                <tr>
                    <th>Kind</th>
                    <th onClick={() => navigate(urlNew)}><PlusCircle width={24} height={24}/></th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map((c) => {
                        return (
                            <tr key={c.id}>
                                <td>{c.givenNames}</td>
                                <td>{c.surname}</td>
                                <td onClick={() => navigate(`/childDelete/${pid}/${rid}/${sid}/${c.id}`)}><Trash
                                    width={24}
                                    height={24}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {(personLoading || spouseLoading || dataLoading) && <p>Loading...</p>}
            {(personLoading || dataLoading) && <p>Loading...</p>}
            {personError && <p>Person {pid}: {personError}</p>}
            {spouseError && <p>Spouse: {spouseError}</p>}
            {dataError && <p>Children: {dataError}</p>}
        </main>
    )
}

export default Children;