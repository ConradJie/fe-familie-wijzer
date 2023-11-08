import './Persons.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {BookOpen, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";

function Persons() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        (async function requestMethod() {
            try {
                setError("");
                const response = await axios.get("http://localhost:8080/persons");
                setData(response.data);
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();

        return function cleanup() {
            controller.abort();
        }

    }, []);

    const navigate = useNavigate();

    return (
            <main className="main-person">
                <h2>Personen</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslacht</th>
                        <th onClick={() => navigate('/personNew')}><PlusCircle width={24} height={24}/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data &&
                        data.map((p) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.givenNames}</td>
                                    <td>{p.surname}</td>
                                    <td>{p.sex}</td>
                                    <td onClick={() => navigate(`/personDetail/${p.id}`)}><BookOpen width={24}
                                                                                                    height={24}/></td>
                                    <td onClick={() => navigate(`/personUpdate/${p.id}`)}><Pencil width={24}
                                                                                                  height={24}/></td>
                                    <td onClick={() => navigate(`/personDelete/${p.id}`)}><Trash width={24}
                                                                                                 height={24}/></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                {loading && <p>Loading..</p>}
                {!data && error && <p>{error}</p>}
            </main>
    )
}

export default Persons;
