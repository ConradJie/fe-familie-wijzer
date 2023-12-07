import './Overviews.css';
import {Link} from "react-router-dom";

function Overviews() {
    return (
        <main className="section-overview">
            <h2>Overzichten</h2>
            <Link to="/OverviewEventMonthDay">Gebeurtenissen van de dag</Link>
        </main>
    )
}

export default Overviews;