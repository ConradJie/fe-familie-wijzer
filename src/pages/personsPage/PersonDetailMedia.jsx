import './PersonDetailMedia.css';
import {Link, useParams} from "react-router-dom";
import {ArrowLeft} from "@phosphor-icons/react";
import useGetBlobData from "../../hooks/useGetBlobData.js";
import useGetEvent from "../../hooks/useGetEvent.js";

function PersonDetailMedia() {
    const {pid, id, rid} = useParams();
    const urlGoBack = `/personDetail/${id}`;
    const urlEvent = (rid === 'null') ? `/persons/${pid}/events/${id}` : `/relations/${rid}/events/${id}`;
    const urlEventMultimediablobs = `/events/${id}/multimediablobs`;
    const {event, eventError, eventLoading} = useGetEvent(urlEvent);
    const {blobData, blobDataError, blobDataLoading} = useGetBlobData(urlEventMultimediablobs);

    return (
        <main className="main-person-detail-media">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {event && <h3>{event.description}</h3>}
            {
                Object.keys(blobData).length > 0 &&
                blobData.map((m) => {
                    return (
                        <>
                            {
                                m.contentType === "application/pdf" &&
                                <div key={m.id} className="media-document">
                                    <object data={`data:application/pdf;base64,${m.blob}`} type="application/pdf">
                                    </object>
                                    <p>{m.description}</p>
                                </div>
                            }
                            {
                                m.contentType.startsWith("image") &&
                                <figure key={m.id} className="media-figure">
                                    <img src={`data:${m.contentType};base64,${m.blob}`} alt={m.description}/>
                                    <figcaption>{m.description}</figcaption>
                                </figure>
                            }
                            {
                                m.contentType.startsWith("video/mp4") &&
                                <div key={m.id} className="media-video">
                                    <video controls>
                                        <source src={`data:${m.contentType};base64,${m.blob}`} type="audio/mpeg"/>
                                    </video>
                                    <p>{m.description}</p>
                                </div>
                            }
                            {
                                m.contentType.startsWith("audio/mpeg") &&
                                <div key={m.id} className="media-audio">
                                    <audio controls>
                                        <source src={`data:${m.contentType};base64,${m.blob}`} type="audio/mpeg"/>
                                    </audio>
                                    <p>{m.description}</p>
                                </div>
                            }
                        </>
                    );
                })
            }
            {(blobDataLoading || eventLoading) && <p>Loading...</p>}
            {eventError && <p>{eventError}</p>}
            {blobDataError && <p>{blobDataError}</p>}
        </main>
    );
}

export default PersonDetailMedia;