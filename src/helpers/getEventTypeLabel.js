function getEventTypeLabel(value) {
    return (value === "BIRTH") ? "Geboorte"
        : (value === "DEATH") ? "Gestorven"
            : (value === "MIGRATION") ? "Migratie"
                : (value === "CELEBRATION") ? "Viering"
                    : "Anders";
}

export default getEventTypeLabel;