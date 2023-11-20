import './PersonDetailMedia.css';
import useGetData from "../../hooks/useGetData.js";
import {Link, useParams} from "react-router-dom";
import {ArrowLeft} from "@phosphor-icons/react";

function PersonDetailMedia() {
    const {id} = useParams();
    const urlEventMultimedias = `http://localhost:8080/events/${id}/multimedias`;
    const {data, dataError, dataLoading} = useGetData(urlEventMultimedias);

    return (
        <main className="main-person-detail-media">
            <Link to={`/personDetail/${id}`}><ArrowLeft width={24} height={24}/></Link>
            <h3>Media van event</h3>
            {
                Object.keys(data).length > 0 &&
                data.map((m) => {
                    return (m.media.contentType === "application/pdf") ?
                        <div className="media-document">
                            <object data={m.media.url} type="application/pdf">
                            </object>
                            <p>{m.description}</p>
                        </div>
                        : <figure key={m.id} className="media-figure">
                            <img src={m.media.url} alt={m.description}/>
                            <figcaption>{m.description}</figcaption>
                        </figure>

                })
            }
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    );
}

export default PersonDetailMedia;