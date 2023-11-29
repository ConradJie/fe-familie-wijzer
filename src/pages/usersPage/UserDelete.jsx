import './UserDelete.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import Button from "../../components/Button.jsx";
import {useState} from "react";
import useGetUser from "../../hooks/useGetUser.js";

function UserDelete() {
    const {username} = useParams();
    const urlGoBack = "/users";
    const [response, setResponse] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const controller = new AbortController();
    const token = localStorage.getItem('token');

    const {userData, userError, userLoading} = useGetUser(`http://localhost:8080/users/${username}`);

    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axios.delete(`http://localhost:8080/users/${username}`,
                {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setResponse(response.data);
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
            {userData?.username &&
                <main>
                    <h2>Gebruiker verwijderen</h2>
                    <form className="user-delete-form">
                        <label htmlFor="username-field">
                            Gebruikersnaam:
                            <input
                                type="text"
                                id="username-field"
                                disabled
                                value={userData.username}
                            />
                        </label>
                        <label htmlFor="password-field">
                            Wachtwoord:
                            <input
                                type="text"
                                id="password-field"
                                disabled
                                value={userData.password}
                            />
                        </label>
                        <label htmlFor="email-field">
                            E-mail:
                            <input
                                type="text"
                                id="email-field"
                                disabled
                                value={userData.email}
                            />
                        </label>
                        <Button type="button" onClick={deleteData}>
                            Verwijderen
                        </Button>
                        <Button type="button" variant="cancel"
                                onClick={() => navigate(urlGoBack)}>Annuleren</Button>
                    </form>
                </main>
            }
            {userLoading && <p>Loading...</p>}
            {userError && <p>{userError}</p>}
            {error && <p>{error}</p>}
            {response && <p>{response}</p>}
        </>
    );
}

export default UserDelete;