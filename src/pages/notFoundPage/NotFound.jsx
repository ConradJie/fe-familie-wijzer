import './NotFound.css';
import {useNavigate} from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="outer-content-container not-found-section">
            <div className="inner-content-container">
                <h1>404</h1>
                <h2>De pagina waar je naar zoekt bestaat niet</h2>
                <span>
                    <button type="button" onClick={() => navigate('/')}>Terug naar home</button>
                </span>
            </div>
        </main>
    );
}
export default NotFound;