moment = require("moment");

const computeRentBilling = (start_date, end_date, amount) => {
    const bills = []
    console.log(start_date, end_date)
    const start = moment(start_date, "YYYY-MM-DD")
    const end = moment(end_date, "YYYY-MM-DD")
    const months = end.diff(start, "M")

    bills.push({
        date_due: start.format("YYYY-MM-DD"), 
        amount: amount * 3,
        information: `AUTOGENERATED - 3 MONTH DEPOSIT`,
        bill_type: "Rent"
    })

    bills.push({
        date_due: start.format("YYYY-MM-DD"), 
        amount: amount * 2,
        information: `AUTOGENERATED - 2 MONTH ADVANCE`,
        bill_type: "Rent"
    })

    for (let i = 2, date = start.add(2, "M"); i < months; i++) {
        const info = `AUTOGENERATED - MONTHLY RENT FOR ${date.format('MMMM')} - ${date.add(1, 'M').format('MMMM YYYY')}`
        bills.push({
            date_due: date.format("YYYY-MM-DD"), 
            amount,
            information: info,
            bill_type: "Rent"
        })
        date = start.add(1, "M")
    }

    return bills
}

module.exports = { computeRentBilling }