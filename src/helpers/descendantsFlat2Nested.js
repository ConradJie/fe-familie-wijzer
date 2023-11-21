function descendantsFlat2Nested(data) {
    const tree = [];
    const childOf = {};
    data.forEach((d) => {
        const {relationChild, relationParent, level} = d;
        childOf[relationChild] = childOf[relationChild] || [];
        d.children = childOf[relationChild];
        level === 0 ? tree.push(d)
            : (childOf[relationParent] = childOf[relationParent] || []).push(d);
    });
    console.log("descendantsFlat2Nested: data",data)
    console.log("descendantsFlat2Nested: tree",tree)
    return tree;
}

export default descendantsFlat2Nested;