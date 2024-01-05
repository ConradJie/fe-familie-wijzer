import './EventMultimediaForm.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import Button from "../../components/Button.jsx";
import translate from "../../helpers/translate.js";

function EventMultimediaForm({t, pid, eid, id, rid, sid, method, description = "", filename = ""}) {
    const role = localStorage.getItem('role');
    const urlGoBack = `/eventMultimedias/${t}/${pid}/${eid}/${rid}/${sid}`;
    const urlPost = `/events/${eid}/multimedias`;
    const urlPut = `/events/${eid}/multimedias/${id}`;
    const urlPutFile = `/multimedias/${id}/media`;
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState(description);
    const [errorDescription, setErrorDescription] = useState("");
    const [file2Upload, setFile2Upload] = useState(filename);
    const [previewUrl, setPreviewUrl] = useState('');
    const [sendingFile, toggleSendingFile] = useState(false);
    const [errorFile, setErrorFile] = useState("");
    const [disabled, toggleDisabled] = useState(false);
    const [buttonVariant, setButtonVariant] = useState("primary");
    const navigate = useNavigate();
    const controller = new AbortController();

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
        setFile2Upload(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
        if (e.target.files[0].type !== "application/pdf" && e.target.files[0].type !== "audio/mpeg"
            && e.target.files[0].type !== "video/mp4" && !e.target.files[0].type.startsWith("image")) {
            disableSaveButton();
            setErrorFile("Alleen een afbeelding, eeen MP3-, MP4- of PDF-bestand is toegestaan");
        } else if (e.target.files[0].size > Number(import.meta.env.VITE_MAX_FILE_SIZE_BYTES)) {
            disableSaveButton();
            setErrorFile(`Bestand mag max. ${import.meta.env.VITE_MAX_FILE_SIZE_MB}MB groot zijn`);
        } else {
            enableSaveButton();
            setErrorFile("");
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        let processed = true;
        toggleSending(false);
        if (descriptionValue === '') {
            setErrorDescription("Dit veld is verplicht");
            disableSaveButton();
            return;
        }

        try {
            setError("");
            toggleSending(true);
            let response = null;
            switch (method) {
                case "post":
                    response = await axiosAuth.post(urlPost,
                        {
                            eventId: eid,
                            description: descriptionValue,
                            filename: file2Upload
                        },
                        {signal: controller.signal});
                    break;
                case "put":
                    if (description !== descriptionValue) {
                        const fileName = (typeof file2Upload === 'string') ? file2Upload : file2Upload.name;
                        response = await axiosAuth.put(urlPut,
                            {
                                id: id,
                                eventId: eid,
                                description: descriptionValue,
                                filename: fileName
                            },
                            {signal: controller.signal});
                    }
                    break;
            }
        } catch (e) {
            processed = false;
            console.error(method, e);
            if (!axiosAuth.isCancel && e.message !== 'canceled') {
                setError(translate(e.message));
            }
        } finally {
            toggleSending(false);
        }
        if (method === 'put' && error === '') {
            await sendFile();
        }

        if (processed) {
            navigate(urlGoBack);
        }

        return function cleanup() {
            controller.abort();
        }
    }

    async function sendFile() {
        const formData = new FormData();
        formData.append("file", file2Upload);
        try {
            setErrorFile("");
            toggleSendingFile(true);
            await axiosAuth.post(urlPutFile, formData,
                {signal: controller.signal}
            )
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
                    Omschrijving:*
                    <input
                        type=" text"
                        id="description-field"
                        name="description-field"
                        value={descriptionValue}
                        minLength='1'
                        maxLength='128'
                        className={role === 'USER' && method === 'put' ? "field-disabled" : "field-enabled"}
                        disabled={role === 'USER' && method === 'put'}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value.trim() === "") {
                                setErrorDescription("Dit veld is verplicht");
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
                            maxLength="128"
                            onChange={handleChangeFile}
                        />
                    </label>
                }
                {errorFile && <p className="errorFile">{errorFile}</p>}
                {previewUrl && file2Upload.type.startsWith("image") &&
                    <label>
                        Preview:
                        <img src={previewUrl} alt="Preview image" className="image-preview"/>
                    </label>
                }
                {previewUrl && file2Upload.type === ("application/pdf") &&
                    <embed src={previewUrl} className="pdf-preview"/>
                }
                {previewUrl && file2Upload.type === "video/mp4" &&
                    <video controls className="mp4-preview">
                        <source src={previewUrl} type="video/mp4"/>
                    </video>
                }
                {previewUrl && file2Upload.type === "audio/mpeg" &&
                    <audio controls className="audio-preview">
                        <source src={previewUrl} type="audio/mpeg"/>
                    </audio>
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
