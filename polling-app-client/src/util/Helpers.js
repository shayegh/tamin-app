import moment from 'moment-jalaali';
import {toast} from 'react-toastify';

export const formatDate = (dateString) => {
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
};

export const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
};

export const compareByAlph = (a, b) => {
    return a.localeCompare(b)
};

export const compareByNum = (a, b) => {
    return a - b
};

export const compareDate = (a, b) => {
    return moment(a || 0, 'jYYYY/jMM/jDD').unix() - moment(b || 0, 'jYYYY/jMM/jDD').unix()
};

export const showError = (error) => {
    if (error.status === 401) {
        toast.error('You have been logged out. Please login create poll.');
    } else {
        console.log('Error Message :', error);
        toast.error(error.message || 'Sorry! Something went wrong. Please try again!');
    }
};