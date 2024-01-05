import './Children.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";
import useGetData from "../../hooks/useGetData.js";
import Table from "../../components/Table.jsx";

function Children() {
    const {pid, rid, sid} = useParams();
    const role = localStorage.getItem('role');
    const urlGoBack = `/relations/${pid}`;
    const urlNew = `/childNew/${pid}/${rid}/${sid}`;
    const urlPerson = `/persons/${pid}`;
    const urlSpouse = `/persons/${sid}`;
    const urlChildren = `/relations/${rid}/children`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const {data, dataError, dataLoading} = useGetData(urlChildren);
    const navigate = useNavigate();

    return (
        <main className="main-children">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {person?.id && spouse?.id &&
                <h2>Kinderen van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname}</h2>}
            {person?.id && sid === "null" &&
                <h2>Kinderen van {person.givenNames} {person.surname}</h2>}
            <Table
                header={
                    <tr>
                        <th>Kind</th>
                        {role === 'ADMIN' &&
                            <th className="icon" onClick={() => navigate(urlNew)}><PlusCircle width={24} height={24}/>
                            </th>
                        }
                    </tr>
                }
                row={data &&
                    data.map((c) => {
                        return (
                            <tr key={c.id}>
                                <td>{c.givenNames}</td>
                                <td>{c.surname}</td>
                                {role === 'ADMIN' &&
                                    <td className="icon"
                                        onClick={() => navigate(`/childDelete/${pid}/${rid}/${sid}/${c.personId}/${c.id}`)}><Trash
                                        width={24}
                                        height={24}/></td>
                                }
                            </tr>
                        )
                    })
                }
            />
            {(personLoading || spouseLoading || dataLoading) && <p>Loading...</p>}
            {personError && <p>Person {pid}: {personError}</p>}
            {spouseError && <p>Spouse: {spouseError}</p>}
            {dataError && <p>Children: {dataError}</p>}
        </main>
    )
}

export default Children;