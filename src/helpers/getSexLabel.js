function getSexLabel(value) {
    return (value === "M")? "Man" : (value === "F")? "Vrouw" : "Onbekend";
}

export default getSexLabel;