import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";

function RelationForm({pid, id, method, preloadedValues}) {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        defaultValues: preloadedValues
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);

    async function onSubmit(data) {
        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            let response = null;
            switch ({method}) {
                case "post":
                    response = await axios.post(`http://localhost:8080/relations/persons/${pid}`,
                        {
                            personId: data.personId,
                            spouseId: data.spouseId,
                        });
                    break;
                case "put":
                    response = await axios.put(`http://localhost:8080/relations/persons/${pid}/${id}`,
                        {
                            personId: data.personId,
                            spouseId: data.spouseId,
                        });
                    break;
            }
        } catch (e) {
            if (axios.isCancel) {
                console.error("Request is canceled");
                setError(e.message);
            } else {
                setError(e.message);
                console.error(e);
            }
        } finally {
            toggleSending(false);
        }
        navigate("/relations");
    }

    return (
        <>
            <form className="relation-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="spouse-field">
                    Partner:
                    <input
                        type=" text"
                        id="spouse-field"
                        {...register("spouseId", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.spouseId && <p>{errors.spouseId.message}</p>}
                {sending && <p>Sending...</p>}
                <Button type=" submit" onClick={handleSubmit}>Opslaan</Button>
                <Button type=" button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/personEvents/${pid}`)
                }}>Annuleren</Button>
            </form>
            {error && <p>Error: {error}</p>}
        </>
    );
}

export default RelationForm;
