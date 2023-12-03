import './UserNew.css';
import UserForm from "./UserForm.jsx";

function UserNew() {

    return (
        <main>
            <h2>Gebruiker toevoegen</h2>
            <UserForm
                method='post'
                />
        </main>
    );
}

export default UserNew;