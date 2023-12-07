import './Overviews.css';
import {Link} from "react-router-dom";

function Overviews() {
    const role = localStorage.getItem('role');
    return (
        <main className=" section-overview">
            <h2>Overzichten</h2>
            <div className="inner-content-container">
                <Link to="/OverviewEventMonthDay">Feestelijke gebeurtenis van de dag </Link>
                {role === 'ADMIN' &&
                    <Link to="/OverviewRelationsWithoutSpouses">Overzicht van personen met een relatie zonder partner</Link>
                }
            </div>
        </main>
    )
}

export default Overviews;