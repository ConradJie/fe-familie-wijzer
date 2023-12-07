import './OverviewRelationsWithooutSpouses.css';
import Table from "../../components/Table.jsx";
import useGetData from "../../hooks/useGetData.js";
import getSexLabel from "../../helpers/getSexLabel.js";

function OverviewRelationsWithoutSpouses() {
    const url = '/persons/nospouses';
    const {data, dataError, dataLoading} = useGetData(url);

    return (
        <main>
            <h2>Overzicht van personen met een relatie zonder partner</h2>
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
                            <tr key={p.id} className="overview-relation-woithout-spouse">
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

export default OverviewRelationsWithoutSpouses;