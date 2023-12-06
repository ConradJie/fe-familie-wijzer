const translateNL = {
    'The event occurred before the date of birth': 'Deze gebeurtenis vindt plaats voor de geboortedatum',
    'The event occurrs after the date of death': 'Deze gebeurtenis vindt plaats na de sterfdatum',
    'The person and spouse are the same person': 'De persoom en toegevoegde partner zijn dezelfde persoon',
    'The relation already Exists': 'Deze relatie bestaat reeds',
    'There already exists such a person with the same given names and surname and gender': 'Er bestaat reeds een persoon met dezelfde voor- en achternaam',
    'Parent and child are the same person': 'Ouder en kind zijn dezelfde persoon',
    'Such an event (BIRTH) already exists': 'Er bestaat al een geboortegebeurtenis voor deze persoon',
    'Such an event (DEATH) already exists': 'Er bestaat al een overlijdingsgebeurtenis voor deze persoon',
};

function translate(key) {
    return (key in translateNL) ? translateNL[key] : key;
}
export default translate;