const translateNL = {
    'The event occurred before the date of birth': 'Deze gebeurtenis vindt plaats voor de geboortedatum',
};

function translate(key) {
    return (key in translateNL) ? translateNL[key] : key;
}
export default translate;