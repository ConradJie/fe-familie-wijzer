import './Search.css';
import {useState} from 'react';
import axios from 'axios';

function Search({id, label, className, endpoint, chooseMessage}) {
    const [data, setData] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [input, setInput] = useState("");
    const [inputError, setInputError] = useState("");

    async function getData(value) {
        toggleLoading(true);
        setError("");

        try {
            const {data} = await axios.get(`${endpoint}${value}`, {});
            setData(data);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.error("'Request is canceled...");
            } else {
                console.error(endpoint);
                console.error(e);
                setError(e.message);
            }
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <div className="search-container">
            <label id={`label${id}`} className={`search-field ${className}`}>
                {label}
                <input type="search"
                       id={id}
                       list={`${id}search-result`}
                       value={input}
                       onChange={(e) => {
                           if (e.target.value.includes("\\")) {
                               setInputError("\\");
                           } else if (e.target.value.includes("/")) {
                               setInputError("/");
                           } else if (e.target.value.includes("[")) {
                               setInputError("[");
                           } else if (e.target.value.includes("]")) {
                               setInputError("]");
                           } else {
                               setInputError("");
                               setInput(e.target.value);
                               chooseMessage(e.target.value);
                               e.target.value && getData(e.target.value);
                           }
                       }}
                       onBlur={() => {
                           setInputError("");
                       }}
                />
                {Object.keys(data).length > 0 &&
                    <datalist id={`${id}search-result`} className="search-result ${className}">
                        {data.map((d) => {
                            return (
                                <option key={`${d.id}`} value={`${d.id}`}>{`${d.givenNames} - ${d.surname}`}</option>
                            )
                        })}
                    </datalist>
                }
            </label>
            {loading && <p>Loading...</p>}
            {inputError && <p className="search-input-error">{inputError} not allowed</p>}
            {Object.keys(data).length === 0 && error && <p>{error}</p>}
        </div>
    )
}

export default Search;