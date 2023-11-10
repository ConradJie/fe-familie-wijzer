function localDateString(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default localDateString;