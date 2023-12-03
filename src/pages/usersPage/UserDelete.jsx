import './UserDelete.css';
import {useParams} from 'react-router-dom';
import UserForm from "./UserForm.jsx";
import useGetUser from "../../hooks/useGetUser.js";

function UserDelete() {
    const {username} = useParams();
    const {userData, userError, userLoading} = useGetUser(`/users/${username}`);

    return (
        <main>
            <h2>Gebruiker verwijderen</h2>
            {userData?.username &&
                <UserForm
                    method='delete'
                    preloadedValues={userData}
                    username={userData.username}
                />
            }
            {userLoading && <p>Loading...</p>}
            {userError && <p>{userError}</p>}
        </main>
    );
}

export default UserDelete;