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
            className={descendant.surname === '"'? "couple new-relation" : "couple"}>
            <span>{descendant.givenNames} {descendant.surname} </span>
            {descendant.spouseGivenNames && <span className="tree-couple">-</span>}
            <span>{descendant.spouseGivenNames} {descendant.spouseSurname}</span>
            {childrenTree}
        </li>
    );
}

export default Descendants;