function datesToText(beginDate, endDate) {
    const monthText = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'Mei',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    };
    const year = beginDate.substring(0, 4) === endDate.substring(0, 4) ? beginDate.substring(0, 4) : "";
    const month = beginDate.substring(5, 7) === endDate.substring(5, 7) ? beginDate.substring(5, 7) : "";
    const day = beginDate.substring(8, 10) === endDate.substring(8, 10) ? beginDate.substring(8, 10) : "";
    return `${day} ${monthText[month]} ${year}`;
}

export default datesToText;