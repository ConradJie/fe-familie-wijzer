import './PersonNew.css';
import PersonForm from "./PersonForm.jsx";

function PersonNew() {
    return (
        <main>
            <h2>Persoon toevoegen</h2>
            <PersonForm
                method="post"
                id={0}
            />
        </main>
    );
}

export default PersonNew;