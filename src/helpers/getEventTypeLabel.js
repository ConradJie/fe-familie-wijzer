function getEventTypeLabel(value) {
    return (value === "BIRTH") ? "Geboorte"
        : (value === "DEATH") ? "Gestorven"
            : (value === "MARRIAGE") ? "Huwelijk"
                : (value === "DIVORCE") ? "Scheiding"
                    : (value === "CELEBRATION") ? "Viering"
                        : (value === "MIGRATION") ? "Migratie"
                            : "Anders";
}

export default getEventTypeLabel;