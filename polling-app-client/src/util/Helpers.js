import moment from 'moment-jalaali';

export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + year;
}

export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}

export function compareByAlph(a, b) {
    return a.localeCompare(b)
}

export function compareByNum(a, b) {
    return a - b
}

export function compareDate(a, b) {
    return moment(a || 0,'jYYYY/jMM/jDD').unix() - moment(b || 0,'jYYYY/jMM/jDD').unix()
}