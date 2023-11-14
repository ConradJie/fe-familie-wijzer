import './Children.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetPersons from "../../hooks/useGetPersons.js";

function Children() {
    const {pid, rid, sid} = useParams();
    const urlGoBack = `/relations/${pid}`;
    const urlNew = `/childNew/${pid}/${rid}/${sid}`;
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouse = `http://localhost:8080/persons/${sid}`;
    const urlChildren = `http://localhost:8080/relations/${rid}/children`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetPerson(urlSpouse);
    const {children, childrenError, childrenLoading} = useGetPersons(urlChildren);
    const navigate = useNavigate();
    return (
        <main className="main-children">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            <p>{urlPerson}</p>
            <p>{urlSpouse}</p>
            <p>{urlChildren}</p>
            {person?.id && < h2> Kinderen van {person.givenNames} {person.surname} </h2>}
            {spouse && < h2> en {spouse.givenNames} {spouse.surname} </h2>}
            <table>
                <thead>
                <tr>
                    <th>Kind</th>
                    <th onClick={() => navigate(urlNew)}><PlusCircle width={24} height={24}/></th>
                </tr>
                </thead>
                <tbody>
                {children?.id &&
                    children.map((c) => {
                        return (
                            <tr key={c.id}>
                                <td>{c.givenNames}</td>
                                <td>{c.surname}</td>
                                <td onClick={() => navigate(`/childDelete/${pid}/${c.id}`)}><Trash width={24}
                                                                                                   height={24}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {(personLoading || spouseLoading || childrenLoading) && <p>Loading...</p>}
            {(personLoading || childrenLoading) && <p>Loading...</p>}
            {personError && <p>Person {pid}: {personError}</p>}
            {spouseError && <p>Spouse: {spouseError}</p>}
            {childrenError && <p>Children: {childrenError}</p>}
        </main>
    )
}

export default Children;