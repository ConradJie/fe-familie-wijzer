function localDateString(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
}

export default localDateString;