moment = require("moment");

const computeRentBilling = (start_date, end_date, monthly_due) => {
    const bills = []

    const start = moment(start_date, "YYYY-MM-DD")
    const end = moment(end_date, "YYYY-MM-DD")
    const months = end.diff(start, "M")
    for (let i = 0; i < months; i++) {
        let date = start.add(i, "M")
        bills.push([date.format("YYYY-MM-DD"), monthly_due])
    }

    return bills
}

const main = () => {
    console.log(computeRentBilling("2022-12-25", "2023-12-25", 200000))
}

module.exports = { computeRentBilling }