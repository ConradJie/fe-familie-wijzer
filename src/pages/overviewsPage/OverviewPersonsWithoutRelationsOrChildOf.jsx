import './OverviewPersonsWithoutRelationsOrChildOf.css';
import useGetData from "../../hooks/useGetData.js";
import Table from "../../components/Table.jsx";
import getSexLabel from "../../helpers/getSexLabel.js";
function OverviewPersonsWithoutRelationsOrChildOf(){
    const url = '/persons/solo';
    const {data, dataError, dataLoading} = useGetData(url);

    return (
        <main>
            <h2>Overzicht van personen zonder relaties of kinderen</h2>
            <Table
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslscht</th>
                    </tr>
                }
                row={data &&
                    data.map((p) => {
                        return (
                            <tr key={p.id} className="overview-relation-woithout-relation">
                                <td>{p.givenNames}</td>
                                <td>{p.surname}</td>
                                <td>{getSexLabel(p.sex)}</td>
                            </tr>)
                    })
                }
            />
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    );
}
export default OverviewPersonsWithoutRelationsOrChildOf;