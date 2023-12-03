import './ChoosePerson.css';
import {useState} from "react";
import useGetData from "../hooks/useGetData.js";
import getSexLabel from "../helpers/getSexLabel.js";
import Table from "./Table.jsx";

function ChoosePerson({choose}) {
    const MAXROWS = 5;
    const [filterGivenNames, setFilterGivenNames] = useState('');
    const [filterSurname, setFilterSurname] = useState('');
    const [queryGivenNames, setQueryGivenNames] = useState('');
    const [querySurname, setQuerySurname] = useState('');
    const urlData = (queryGivenNames && querySurname)
        ? `/persons/contains?${queryGivenNames}&${querySurname}`
        : queryGivenNames ? `/persons/contains?${queryGivenNames}`
            : querySurname ? `/persons/contains?${querySurname}`
                : "";
    const {data, dataError, dataLoading} = useGetData(urlData);

    return (
        <>
            <Table
                className="choose-person"
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslacht</th>
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
                                       choose("");
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
                            <tr key={p.id}
                                onClick={() => {
                                    choose(`${p.id}`);
                                    setFilterGivenNames(`${p.givenNames}`);
                                    setQueryGivenNames("givenNames=" + `${p.givenNames}`);
                                    setFilterSurname(`${p.surname}`);
                                    setQuerySurname("surname=" + `${p.surname}`);
                                }}
                            >
                                <td>{p.givenNames}</td>
                                <td>{p.surname}</td>
                                <td>{getSexLabel(p.sex)}</td>
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
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>{dataError}</p>}
        </>
    );
}

export default ChoosePerson;