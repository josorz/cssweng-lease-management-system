import moment from "moment";

export const convertDateToString = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${month}/${day}/${year}`;
}

export const compareNowAndDate = (currentDate, deadline) => {
    // TODO
}

export const compareTwoDates = (date, deadline) => {

}

export const currentDate = () => {
    return convertDateToString(Date.now)
}

// Count Months using external library Moment.js
// SRC: https://stackoverflow.com/questions/60755028/exact-month-difference-between-two-dates-momentjs
export const countMonths = () => {
    const getDate = (date) => moment(date, 'YYYY-MM-DD').startOf('month')
    const diff = Math.abs(getDate('19/03/2020').diff(getDate('01/05/2021'), 'months')); 
    return diff
}