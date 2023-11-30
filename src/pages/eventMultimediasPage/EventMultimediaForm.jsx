import './EventMultimediaForm.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";

function EventMultimediaForm({t, tid, eid, id, method, description = "", filename = ""}) {
    const role = localStorage.getItem('role');
    const urlGoBack = `/eventMultimedias/${t}/${tid}/${eid}`;
    const urlPost = `http://localhost:8080/events/${eid}/multimedias`;
    const urlPut = `http://localhost:8080/events/${eid}/multimedias/${id}`;
    const urlPutFile = `http://localhost:8080/multimedias/${id}/media`;
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState(description);
    const [errorDescription, setErrorDescription] = useState("");
    const [file, setFile] = useState(filename);
    const [previewUrl, setPreviewUrl] = useState('');
    const [sendingFile, toggleSendingFile] = useState(false);
    const [errorFile, setErrorFile] = useState("");
    const [disabled, toggleDisabled] = useState(false);
    const [buttonVariant, setButtonVariant] = useState("primary");
    const navigate = useNavigate();
    const controller = new AbortController();
    const token = localStorage.getItem('token');

    function disableSaveButton() {
        toggleDisabled(true);
        setButtonVariant("disabled");
    }

    function enableSaveButton() {
        toggleDisabled(false);
        setButtonVariant("primary");
    }

    function handleChangeFile(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
        if (e.target.files[0].type !== "application/pdf" && !e.target.files[0].type.startsWith("image")) {
            disableSaveButton();
            setErrorFile("Alleen een afbeelding of een PDF-bestand is toegestaan");
        } else if (e.target.files[0].size > 20_971_000) {
            disableSaveButton();
            setErrorFile("Bestand mag max. 20MB groot zijn");
        } else {
            enableSaveButton();
            setErrorFile("");
        }
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
                        },
                        {
                            signal: controller.signal,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
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
                            },
                            {
                                signal: controller.signal,
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            });
                    }
                    break;
            }
        } catch
            (e) {
            if (axios.isCancel) {
                console.error("Request is canceled");
                setError(e.message);
                console.error(e);
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

        return function cleanup() {
            controller.abort();
        }
    }

    async function sendFile() {
        const formData = new FormData();
        formData.append("file", file);
        try {
            setErrorFile("");
            toggleSendingFile(true);
            const result = await axios.post(urlPutFile, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                })
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
                        className={role === 'USER' && method==='put'? "field-disabled" : "field-enabled"}
                        disabled={role === 'USER' && method==='put'}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                setErrorDescription("Omschrijving is niet ingevuld");
                                disableSaveButton();
                            } else {
                                setErrorDescription("");
                                enableSaveButton();
                            }
                        }}
                    />
                </label>
                {errorDescription && <p>{errorDescription}</p>}
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
                {errorFile && <p className="errorFile">{errorFile}</p>}
                {previewUrl && file.type.startsWith("image") &&
                    <label>
                        Preview:
                        <img src={previewUrl} alt="Preview image" className="image-preview"/>
                    </label>
                }
                {previewUrl && file.type.startsWith("application/pdf") &&
                    <embed src={previewUrl} className="pdf-preview"/>
                }
                <Button type="submit" disabled={disabled} variant={buttonVariant}>Opslaan</Button>
                <Button type="button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(urlGoBack);
                }}>Annuleren</Button>
            </form>
            {sending && <p>Sending...</p>}
            {sendingFile && <p>Sending file...</p>}
            {error && <p>{error}</p>}
        </main>
    )
}

export default EventMultimediaForm;
