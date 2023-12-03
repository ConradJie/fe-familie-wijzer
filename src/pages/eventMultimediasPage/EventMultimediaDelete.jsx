import './EventMultimediaDelete.css';
import Button from "../../components/Button.jsx";
import useGetData from "../../hooks/useGetData.js";
import {useNavigate, useParams} from "react-router-dom";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import {useState} from "react";

function EventMultimediaDelete() {
    const {t, tid, eid, id} = useParams();
    const url = (t === 'person') ? `/events/${eid}/multimedias/${id}`
        : `/multimedias/${id}`;
    const urlDelete = `/events/${eid}/multimedias/${id}`;
    const urlGoBack = `/eventMultimedias/${t}/${tid}/${eid}`;
    const {data, dataError, dataLoading} = useGetData(url);
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState([]);
    const navigate = useNavigate();
    const controller = new AbortController();

    async function onSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            const response = await axiosAuth.delete(urlDelete, {
                signal: controller.signal
            });
            setResponseData(response.data);
        } catch (e) {
            setError(e.message);
        }
        navigate(urlGoBack);

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            {data?.id &&
                <main>
                    <form className="event-multimedia-delete-form" onSubmit={onSubmit}>
                        <label htmlFor="description-field">
                            Omschrijving:
                            <input
                                type=" text"
                                id="description-field"
                                disabled
                                value={data.description}
                            />
                        </label>
                        <label htmlFor="filename-field">
                            Bestandsnaam:
                            <input
                                type=" text"
                                id="filename-field"
                                disabled
                                value={data.filename}
                            />
                        </label>
                        <Button type="submit"> Verwijderen </Button>
                        <Button type="button" variant="cancel"
                                onClick={() => navigate(urlGoBack)}> Annuleren
                        < /Button>
                    </form>
                </main>
            }
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>{dataError}</p>}
            {error && <p>{error}</p>}
        </>
    );
}

export default EventMultimediaDelete;