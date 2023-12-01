import './Persons.css';
import {useNavigate} from "react-router-dom";
import {BellSimple, Circle, Pencil, PlusCircle, Trash, TreeStructure, UserRectangle} from "@phosphor-icons/react";
import getSexLabel from "../../helpers/getSexLabel.js";
import useGetData from "../../hooks/useGetData.js";
import {useState} from "react";
import Table from "../../components/Table.jsx";

function Persons() {
    const MAXROWS = 10;
    const role = localStorage.getItem('role');
    const [filterGivenNames, setFilterGivenNames] = useState('');
    const [filterSurname, setFilterSurname] = useState('');
    const [queryGivenNames, setQueryGivenNames] = useState('');
    const [querySurname, setQuerySurname] = useState('');
    const urlData = (queryGivenNames && querySurname)
        ? `/persons/contains?${queryGivenNames}&${querySurname}`
        : queryGivenNames ? `/persons/contains?${queryGivenNames}`
            : querySurname ? `/persons/contains?${querySurname}`
                : "/persons";
    const {data, dataError, dataLoading} = useGetData(urlData);
    const navigate = useNavigate();

    return (
        <main className="main-person">
            <h2>Personen</h2>
            <Table
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslacht</th>
                        {role === 'ADMIN' &&
                            <th className="icon" onClick={() => navigate('/personNew')}><PlusCircle width={24}
                                                                                                    height={24}/></th>
                        }
                    </tr>
                }
                filter={
                    <tr>
                        <td><input type="text" id="filterGvenNames" value={filterGivenNames}
                                   onChange={(e) => {
                                       setFilterGivenNames(e.target.value);
                                       if (e.target.value.length > 0) {
                                           setQueryGivenNames("givenNames=" + e.target.value.trim())
                                       } else {
                                           setQueryGivenNames("");
                                       }
                                       console.log(filterGivenNames)
                                   }}/></td>
                        <td><input type="text" id="filterSurname" value={filterSurname}
                                   onChange={(e) => {
                                       setFilterSurname(e.target.value);
                                       if (e.target.value.length > 0) {
                                           setQuerySurname("surname=" + e.target.value.trim())
                                       } else {
                                           setQuerySurname("");
                                       }
                                   }}/></td>
                    </tr>
                }
                row={data &&
                    data.slice(0, (data.length === MAXROWS) ? MAXROWS : MAXROWS - 1).map((p) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.givenNames}</td>
                                <td>{p.surname}</td>
                                <td>{getSexLabel(p.sex)}</td>
                                <td className="icon" onClick={() => navigate(`/personDetail/${p.id}`)}><UserRectangle
                                    width={24}
                                    height={24}/></td>
                                <td className="icon" onClick={() => navigate(`/personEvents/${p.id}`)}><BellSimple
                                    width={24}
                                    height={24}/></td>
                                {role === 'ADMIN' &&
                                    <td className="icon" onClick={() => navigate(`/relations/${p.id}`)}><Circle
                                        width={24}
                                        height={24}/>
                                    </td>
                                }
                                <td className="icon" onClick={() => navigate(`/treeDescendants/${p.id}`)}><TreeStructure
                                    width={24}
                                    height={24}/>
                                </td>
                                {role === 'ADMIN' &&
                                    <td className="icon" onClick={() => navigate(`/personUpdate/${p.id}`)}><Pencil
                                        width={24}
                                        height={24}/></td>
                                }
                                {role === 'ADMIN' &&
                                    <td className="icon" onClick={() => navigate(`/personDelete/${p.id}`)}><Trash
                                        width={24}
                                        height={24}/></td>
                                }
                            </tr>)
                    })
                }
                remainingRows={data.length > MAXROWS &&
                    <tr>
                        <td>+{data.length - (MAXROWS - 1)}...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>}
            />
            {dataLoading && <p>Loading..</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default Persons;
