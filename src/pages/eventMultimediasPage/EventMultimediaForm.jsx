import './EventMultimediaForm.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";

function EventMultimediaForm({t, tid, eid, id, method, description = "", filename = ""}) {
    const urlGoBack = `/eventMultimedias/${t}/${tid}/${eid}`;
    const urlPost = `http://localhost:8080/events/${eid}/multimedias`;
    const urlPut = `http://localhost:8080/events/${eid}/multimedias/${id}`;
    const urlPutFile = `http://localhost:8080/multimedias/${id}/media`;
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState(description);
    const [file, setFile] = useState(filename);
    const [previewUrl, setPreviewUrl] = useState('');
    const [sendingFile, toggleSendingFile] = useState(false);
    const [errorFile, setErrorFile] = useState("");
    const [disabled, toggleDisabled] = useState(false);
    const [buttonVariant, setButtonVariant] = useState("primary");
    const navigate = useNavigate();

    function handleChangeFile(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
        if (e.target.files[0].size > 20_971_520) {
            toggleDisabled(true);
            setButtonVariant("disabled");
            setErrorFile("Bestand mag max. 20MB groot zijn");
        } else {
            toggleDisabled(false);
            setButtonVariant("primary");
            setErrorFile("");
        }
        console.log(error)
    }

    async function onSubmit(e) {
        e.preventDefault();
        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            let response = null;
            switch (method) {
                case "post":
                    response = await axios.post(urlPost,
                        {
                            eventId: eid,
                            description: descriptionValue,
                            filename: file
                        });
                    break;
                case "put":
                    if (description !== descriptionValue) {
                        response = await axios.post(urlPut,
                            {
                                id: id,
                                eventId: eid,
                                description: descriptionValue,
                                filename: file
                            });
                    }
                    break;
            }
        } catch (e) {
            console.log(e);
            if (axios.isCancel) {
                console.error("Request is canceled");
                setError(e.message);
                console.log(e.message);
            } else {
                setError(e.message);
                console.error(e);
            }
        } finally {
            toggleSending(false);
        }
        if (method === "put") {
            await sendFile();
        }

        navigate(urlGoBack);
    }

    async function sendFile() {
        const formData = new FormData();
        formData.append("file", file);
        try {
            setErrorFile("");
            toggleSendingFile(true);
            const result = await axios.post(urlPutFile, formData,
                {
                    headers: {"Content-Type": "multipart/form-data"},
                })
            console.log(result.data);
        } catch (e) {
            console.error(e);
            setErrorFile(e.message);
        } finally {
            toggleSendingFile(false);
        }
    }


    return (
        <main>
            <form className="event-multimedia-form" onSubmit={onSubmit}>
                <label htmlFor="description-field">
                    Omschrijving:
                    <input
                        type=" text"
                        id="description-field"
                        name="description-field"
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        onBlur={(e) =>
                            (e.target.value === "") ? setError("Omschrijving is niet ingevuld")
                                : setError("")}
                    />
                </label>
                {error && <p>{error}</p>}
                {method === "put" &&
                    <label htmlFor="filename-field">
                        Bestandsnaam:
                        <input
                            type="file"
                            id="filename-field"
                            name="filename-field"
                            onChange={handleChangeFile}
                        />
                    </label>
                }
                {previewUrl && file.type.startsWith("image") &&
                    <label>
                        Preview:
                        <img src={previewUrl} alt="Preview image" className="image-preview"/>
                    </label>
                }
                <Button type="submit" disabled={disabled} variant={buttonVariant}>Opslaan</Button>
                <Button type="button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(urlGoBack);
                }}>Annuleren</Button>
            </form>
            {sending && <p>Sending...</p>}
            {sendingFile && <p>Sendng file...</p>}
            {error && <p>{error}</p>}
            {errorFile && <p>{errorFile}</p>}
        </main>
    )
}

export default EventMultimediaForm;
