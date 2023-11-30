import './PersonDetail.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Table from "../../components/Table.jsx";
import getEventTypeLabel from "../../helpers/getEventTypeLabel.js";
import getSexLabel from "../../helpers/getSexLabel.js";
import {ArrowLeft, ImagesSquare, UserRectangle} from "@phosphor-icons/react";
import datesToText from "../../helpers/datesToText.js";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetEvents from "../../hooks/useGetEvents.js";
import useGetSpouses from "../../hooks/useGetSpouses.js";
import useGetPersons from "../../hooks/useGetPersons.js";
import useGetRelationsEvents from "../../hooks/useRelationsEvents.js";
import useGetData from "../../hooks/useGetData.js";

function PersonDetail() {
    const {id} = useParams();
    const urlGoBack="/persons";
    const urlPerson = `http://localhost:8080/persons/${id}`;
    const urlEvents = `http://localhost:8080/persons/${id}/events`;
    const urlSpouses = `http://localhost:8080/relations/persons/${id}`;
    const urlRelationEvents = `http://localhost:8080/persons/${id}/relationEvents`;
    const urlChildren = `http://localhost:8080/persons/children/${id}`;
    const urlParents = `http://localhost:8080/persons/parents/${id}`;
    const navigate = useNavigate();
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {events, eventsError, eventsLoading} = useGetEvents(urlEvents);
    const {spouses, spousesError, spousesLoading} = useGetSpouses(urlSpouses);
    const {persons, personsError, personsLoading} = useGetPersons(urlChildren);
    const {relationsEvents, relationsEventsError, relationsEventsLoading} = useGetRelationsEvents(urlRelationEvents);
    const {data, dataError, dataLoading} = useGetData(urlParents);

    return (
        <main className="main-person-detail">
            <Link to={'/persons'}><ArrowLeft width={24} height={24}/></Link>
            <h2>Detail</h2>
            {person?.id &&
                <form className="detail-person-form">
                    <label htmlFor="Voornamen-field">
                        Voornamen:
                        <input
                            type="text"
                            id="givenNames-field"
                            value={person.givenNames}
                            disabled={true}
                        />
                    </label>
                    <label htmlFor="surname-field">
                        Achternaam:
                        <input
                            type="text"
                            id="surname-field"
                            value={person.surname}
                            disabled={true}
                        />
                    </label>
                    <label htmlFor="sex-field">
                        Geslacht:
                        <select
                            id="sex-field"
                            value={person.sex}
                            disabled={true}
                        >
                            <option value="M">Man</option>
                            <option value="F">Vrouw</option>
                            <option value="X">Onbekend</option>
                        </select>
                    </label>
                </form>
            }
            <h3>Persoonlijke gebeurtenissen</h3>
            <Table
                header={
                    <tr>
                        <th>Datum</th>
                        <th>Type</th>
                        <th>Omschrijving</th>
                    </tr>}
                row={Object.keys(events).length > 0 &&
                    events.map((e) => {
                        return (
                            <tr key={e.id}>
                                <td>{datesToText(e.beginDate, e.endDate)}</td>
                                <td>{getEventTypeLabel(e.eventType)}</td>
                                <td>{e.description}</td>
                                <td className="icon" onClick={() => navigate(`/personDetailMedia/${e.id}`)}>
                                    <ImagesSquare width={24} height={24}/>
                                </td>
                            </tr>)
                    })}
            />
            <h3>Ouders</h3>
            <Table
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslacht</th>
                    </tr>}
                row={data &&
                    data.map((p) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.givenNames}</td>
                                <td>{p.surname}</td>
                                <td>{getSexLabel(p.sex)}</td>
                                <td className="icon" onClick={() => navigate(`/personDetail/${p.id}`)}>
                                    <UserRectangle width={24} height={24}/>
                                </td>
                            </tr>)
                    })}
            />
            <h3>Relaties</h3>
            <Table
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                    </tr>}
                row={spouses &&
                    spouses.map((s) => {
                        return (
                            <tr key={s.id}>
                                <td>{s.spouseGivenNames}</td>
                                <td>{s.spouseSurname}</td>
                                <td className="icon" onClick={() => navigate(`/personDetail/${s.spouseId}`)}>
                                    <UserRectangle width={24} height={24}/>
                                </td>
                            </tr>)
                    })}
            />
            <h3>Gezamenlijke gebeurtenissen</h3>
            <Table
                header={
                    <tr>
                        <th>Datum</th>
                        <th>Type</th>
                        <th>Omschrijving</th>
                    </tr>}
                row={relationsEvents &&
                    relationsEvents.map((e) => {
                        return (
                            <tr key={e.id}>
                                <td>{datesToText(e.beginDate, e.endDate)}</td>
                                <td>{getEventTypeLabel(e.eventType)}</td>
                                <td>{e.description}</td>
                            </tr>)
                    })}
            />
            <h3>Kinderen</h3>
            <Table
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                    </tr>}
                row={persons &&
                    persons.map((p) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.givenNames}</td>
                                <td>{p.surname}</td>
                                <td className="icon" onClick={() => navigate(`/personDetail/${p.id}`)}>
                                    <UserRectangle width={24} height={24}/>
                                </td>
                            </tr>)
                    })}
            />
            {(eventsLoading || personLoading || spousesLoading || personsLoading || relationsEventsLoading || dataLoading) &&
                <p>Loading..</p>}
            {personError && <p>{personError}</p>}
            {eventsError && <p>{eventsError}</p>}
            {spousesError && <p>{spousesError}</p>}
            {personsError && <p>{personsError}</p>}
            {relationsEventsError && <p>{relationsEventsError}</p>}
            {dataError && <p>{dataError}</p>}
            <button type="button" onClick={() => navigate(urlGoBack)}>Sluiten</button>
        </main>
    );
}

export default PersonDetail;