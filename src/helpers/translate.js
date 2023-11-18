const translateNL = {
    'The event occurred before the date of birth': 'Deze gebeurtenis vindt plaats voor de geboortedatum',
    'The event occurrs after the date of death': 'Deze gebeurtenis vindt plaats na de sterfdatum',
};

function translate(key) {
    return (key in translateNL) ? translateNL[key] : key;
}
export default translate;