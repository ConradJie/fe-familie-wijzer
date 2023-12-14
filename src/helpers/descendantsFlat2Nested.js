function descendantsFlat2Nested(data) {
    const tree = [];
    const childOf = {};
    let ids = new Set();
    data.forEach((d) => {
        const {relationChild, relationParent, level} = d;
        childOf[relationChild] = childOf[relationChild] || [];
        d.children = childOf[relationChild];
        if (ids.has(d.personId)) {
            d.surname = '"';
            d.givenNames = '"';
        }
        ids.add(d.personId);
        level === 0 ? tree.push(d)
            : (childOf[relationParent] = childOf[relationParent] || []).push(d);
    });
    return tree;
}

export default descendantsFlat2Nested;