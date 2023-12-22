import {Link} from "react-router-dom";

function Descendants({descendant}) {
    let childrenTree = null;
    if (descendant.children && descendant.children.length) {
        childrenTree = (
            <ul>
                {descendant.children.map(d => (
                    <Descendants descendant={d} key={d.id}/>
                ))}
            </ul>
        );
    }
    return (
        <li key={descendant.id}
            className={descendant.surname === '"' ? "couple new-relation" : "couple"}>
            <Link to="#" className="tree-person">{descendant.givenNames} {descendant.surname}
                <span className="tree-person-text">{descendant.lifePeriod}</span>
            </Link>
            {descendant.spouseGivenNames &&
                <>
                    <div className="tree-couple">-<span className="tree-couple-text">{descendant.relationPeriod}</span>
                    </div>
                    <Link to="#" className="tree-spouse">{descendant.spouseGivenNames} {descendant.spouseSurname}
                        <span className="tree-spouse-text">{descendant.spouseLifePeriod}</span>
                    </Link>
                </>}
            {
                childrenTree
            }
        </li>
    );
}

export default Descendants;