const translateNL = {
    'Parent and child are the same person': 'Ouder en kind zijn dezelfde persoon',
    'Such an event (BIRTH) already exists': 'Deze gebeurtenis (geboorte) bestaat al voor deze persoon',
    'Such an event (DEATH) already exists': 'Deze gebeurtenis (gestorven) bestaat al voor deze persoon',
    'The begin date occurred after the end date': 'De begindatum ligt na de einddatum',
    'The date of birth occurs after previous events': 'De geboortedatum is na een vorige gebeurtenis van deze persoon',
    'The date of death occurs before previous events': 'De datum van overlijden ligt voor eerdere gebeurtenissen',
    'The event occurred before the date of birth': 'Deze gebeurtenis vindt plaats voor de geboortedatum',
    'The event occurs after the date of death': 'Deze gebeurtenis vindt plaats na de datum van overlijden',
    'The event type could not be processed': 'Het gebeurtenistype kan niet worden verwerkt',
    'The person and spouse are the same person': 'De persoon en toegevoegde partner zijn dezelfde persoon',
    'The person does not exists': 'De persoon bestaat niet',
    'The person(s) do not exists': 'De personen bestaat niet',
    'The relation already Exists': 'Deze relatie bestaat reeds',
    'The requested event could not be found': 'De gevraagde gebeurtenis kan niet worden gevonden',
    'The requested multimedia could not be found': 'De gevraagde multimedia kan niet worden gevonden',
    'The requested person could not be found': 'De gevraagde persoon kan niet worden gevonden',
    'The requested relation could not be found': 'De gevraagde relatie kan niet worden gevonden',
    'The sex type could not be processed': 'Het geslachtstype kan niet worden verwerkt',
    'The spouse does not exists': 'De partner bestaat niet',
    'There already exists such a person with the same given names and surname and gender': 'Er bestaat reeds een persoon met dezelfde voor- en achternaam',
    'This child already exists': 'Het kind bestaat al',
    'This event is in the future': 'De gebeurtenis vindt plaats in de toekomst',
};

function translate(key) {
    return (key in translateNL) ? translateNL[key] : key;
}
export default translate;