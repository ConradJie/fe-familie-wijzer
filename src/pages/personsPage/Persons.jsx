import './Persons.css';
import {useNavigate} from "react-router-dom";
import {BellSimple, Circle, Pencil, PlusCircle, Trash, TreeStructure, UserRectangle} from "@phosphor-icons/react";
import getSexLabel from "../../helpers/getSexLabel.js";
import useGetData from "../../hooks/useGetData.js";

function Persons() {
    const {data,dataError} = useGetData("http://localhost:8080/persons");
    const navigate = useNavigate();

    return (
        <main className="main-person">
            <h2>Personen</h2>
            <table>
                <thead>
                <tr>
                    <th>Voornamen</th>
                    <th>Achternaam</th>
                    <th>Geslacht</th>
                    <th onClick={() => navigate('/personNew')}><PlusCircle width={24} height={24}/></th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map((p) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.givenNames}</td>
                                <td>{p.surname}</td>
                                <td>{getSexLabel(p.sex)}</td>
                                <td onClick={() => navigate(`/personDetail/${p.id}`)}><UserRectangle width={24}
                                                                                                height={24}/></td>
                                <td onClick={() => navigate(`/personEvents/${p.id}`)}><BellSimple width={24}
                                                                                                  height={24}/></td>
                                <td onClick={() => navigate(`/relations/${p.id}`)}><Circle width={24}
                                                                                           height={24}/></td>
                                <td onClick={() => navigate(`/trees/${p.id}`)}><TreeStructure width={24}
                                                                                                  height={24}/></td>
                                <td onClick={() => navigate(`/personUpdate/${p.id}`)}><Pencil width={24}
                                                                                              height={24}/></td>
                                <td onClick={() => navigate(`/personDelete/${p.id}`)}><Trash width={24}
                                                                                             height={24}/></td>
                            </tr>)
                    })
                }
                </tbody>
            </table>
            {!data && <p>Loading..</p>}
            {!data && dataError && <p>{dataError}</p>}
        </main>
    )
}

export default Persons;
