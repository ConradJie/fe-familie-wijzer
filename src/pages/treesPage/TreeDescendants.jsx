import './TreeDescendants.css';
import {ArrowLeft} from "@phosphor-icons/react";
import {Link, useParams} from "react-router-dom";
import useGetData from "../../hooks/useGetData.js";
import descendantsFlat2Nested from "../../helpers/descendantsFlat2Nested.js";
import Descendants from "../../components/Descendants.jsx";

function TreeDescendants() {
    const {pid} = useParams();
    const urlGoBack = "/persons";
    const urlDescendants = `http://localhost:8080/descendants/${pid}`;
    const {data, dataError, dataLoading} = useGetData(urlDescendants);
    const descendantsList = (data) ? descendantsFlat2Nested(data) : [];

    return (
        <main className="section-trees">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            <div className="outer-content-container tree">
                {Object.keys(descendantsList).length > 0 &&
                    <ul>
                        {descendantsList.map((d) => (
                            <Descendants descendant={d} key={d.id}/>
                        ))}
                    </ul>
                }
            </div>
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default TreeDescendants;