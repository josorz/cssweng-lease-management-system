export const convertDateToString = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}/${month}/${day}`;
}

export const currentDate = () => {
    return convertDateToString(Date.now)
}