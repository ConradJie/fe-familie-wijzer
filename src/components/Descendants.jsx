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
    console.log(descendant)
    return (
        <li key={descendant.id} className="couple">
            <span>{descendant.givenNames} {descendant.surname}
                {descendant.lifePeriod ?
                    <article className="tooltip"><span className={descendant.relationPeriod}></span></article>
                    : <span></span>}
            </span>
            <span>{descendant.spouseGivenNames} {descendant.spouseSurname}
                {descendant.spouseLifePeriod ? <span> ({descendant.spouseLifePeriod}) </span> : <p></p>}
            </span>
            {childrenTree}
        </li>
    );
}

export default Descendants;