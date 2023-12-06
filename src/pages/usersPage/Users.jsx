import './Users.css';
import Table from "../../components/Table.jsx";
import {PlusCircle, Trash} from "@phosphor-icons/react";
import useGetData from "../../hooks/useGetData.js";
import {useNavigate} from "react-router-dom";

function Users() {
    const urlData = "/users";
    const {data, dataError, dataLoading} = useGetData(urlData);
    const navigate = useNavigate();

    return (
        <main className="section-overview">
            <h2>Gebruikers</h2>
            <Table
                header={
                    <tr>
                        <th>Gebruikersnaam</th>
                        <th>E-mail</th>
                        <th className="icon" onClick={() => navigate('/UserNew')}><PlusCircle width={24} height={24}/></th>
                    </tr>
                }
                row={data &&
                    data.map((u) => {
                        return (
                            <tr key={u.username}>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td className="icon" onClick={() => navigate(`/userDelete/${u.username}`)}><Trash width={24}
                                                                                               height={24}/></td>
                            </tr>)
                    })
                }
            />
            {dataLoading && <p>Loading..</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    );
}

export default Users;