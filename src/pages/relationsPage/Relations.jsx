import './Relations.css';
import useGetData from "../../hooks/useGetData.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, PlusCircle} from "@phosphor-icons/react";
import useGetPerson from "../../hooks/useGetPerson.js";

function Relations() {
    const {pid} = useParams();
    console.log("pid",pid);
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlRelation = `http://localhost:8080/relations/persons/${pid}`;
    const urlNew=`/relationsNew/${pid}`;
    const navigate = useNavigate();
    const goBack = "/persons";
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {data, dataError, dataLoading} = useGetData(urlRelation);

    console.log("person",urlPerson);
    console.log("relation",urlRelation);
    console.log("new",urlNew);
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
                {data?.id &&
                    data.map((r) => {
                        return (
                            <tr key={r.id}>
                                <td>{r.spouseId}</td>
                            </tr>
                        )
                    })
                }
                {dataLoading && <p>Loading...</p>}
                {dataError && <p>Relation url: {urlRelation}<br/>error:{dataError}</p>}
                </tbody>
            </table>
            {personLoading && <p>Loading person...</p>}
            {personError && <p>Person error:{personError}</p>}
        </main>
    )
        ;
}

export default Relations;