import './OverviewMultimediaWithoutMedia.css';
import Table from "../../components/Table.jsx";
import useGetData from "../../hooks/useGetData.js";
import getSexLabel from "../../helpers/getSexLabel.js";
import getEventTypeLabel from "../../helpers/getEventTypeLabel.js";

function OverviewMultimediaWithoutMedia() {
    const url = '/persons/multimedias/nomedia';
    const {data, dataError, dataLoading} = useGetData(url);

    return (
        <main>
            <h2>Overzicht van foto- en document-omschrijvingen zonder foto of document</h2>
            <Table
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslacht</th>
                        <th>Type gebeurtenis</th>
                        <th>Omschrijving gebeurtenis</th>
                        <th>Omschrijving foto / document</th>
                    </tr>
                }
                row={data &&
                    data.map((m) => {
                        return (
                            <tr key={m.id} className="overview-multimedia-woithout-media">
                                <td>{m.givenNames}</td>
                                <td>{m.surname}</td>
                                <td>{getSexLabel(m.sex)}</td>
                                <td>{getEventTypeLabel(m.eventType)}</td>
                                <td>{m.eventDescription}</td>
                                <td>{m.description}</td>
                            </tr>)
                    })
                }
            />
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    );
}

export default OverviewMultimediaWithoutMedia;